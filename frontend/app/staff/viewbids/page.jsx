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
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';

const ViewBidResult = () => {
	const [bidResult, setBidResult] = useState([]);
	// const [searchTerm, setSearchTerm] = useState('');
	// const [message, setMessage] = useState('');

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

	// // Filter the bid result based on the search term
	// const handleSearchBidResult = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			searchTerm === ''
	// 				? `http://localhost:8080/api/system-admin/search/user-account/ /`
	// 				: `http://localhost:8080/api/system-admin/search/user-account/${searchTerm}/`
	// 		);
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			console.log(data);
	// 			setBidResult(data);
	// 		} else {
	// 			console.error(
	// 				`Failed to fetch user data. Status: ${
	// 					response.status
	// 				}, Response: ${await response.text()}`
	// 			);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching user data', error);
	// 	}
	// };

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						My Bid Result
					</Heading>
					{/* 
					<Flex
						direction="column"
						align="center"
						justifyContent="space-betwen"
						pt="8"
					>
						<Text
							pt="2"
							pb="2"
							textAlign="center"
							color={message === 'Account Suspended!' ? 'green.500' : 'red.500'}
						>
							{message}
						</Text>
					</Flex> */}

					{/* <Flex justifyContent='space-evenly' align='center' maxW='600' pt='5'>
						<InputGroup>
							<Input
								id='search'
								w='50'
								type='text'
								placeholder='Search by Name'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<InputRightElement h='auto'>
								<Button size='md' onClick={() => setSearchTerm('')}>
									{<CloseIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>

						<Button ml='2' onClick={handleSearchBidResult} value={searchTerm}>
							Search
						</Button>
					</Flex> */}
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
