'use client';

import {
	Button,
	Center,
	Container,
	Flex,
	Heading,
	Input,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ViewBidResult = () => {
	const [bidResult, setBidResult] = useState([]);

	const staffId = localStorage.getItem('staffId');

	const handleViewBidResult = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/staff/view/bid-result/${staffId}/`
			);
			if (response.ok) {
				const data = await response.json();
				setBidResult(data);
			} else {
				console.error('Failed to fetch bid result');
			}
		} catch (error) {
			console.error('Error fetching bid result', error);
		}
	};

	useEffect(() => {
		handleViewBidResult();
	}, []);

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						My Bid Result
					</Heading>
				</Flex>

				{bidResult.length > 0 && (
					<Box overflowY='auto'>
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th color='white'>Role</Th>
									<Th color='white'>Date</Th>
									<Th color='white'>Shift</Th>
									<Th color='white'>Status</Th>
								</Tr>
							</Thead>
							<Tbody>
								{bidResult.map((bid) => (
									<Tr key={bid.id}>
										<Td>{bid.role}</Td>
										<Td>{bid.date}</Td>
										<Td>{bid.shift}</Td>
										<Td
											color={
												bid.status === 'approved'
													? 'green.500'
													: bid.status === 'rejected'
													? 'red.500'
													: 'white'
											}
										>
											{bid.status}
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				)}
			</Container>
		</Center>
	);
};

export default ViewBidResult;
