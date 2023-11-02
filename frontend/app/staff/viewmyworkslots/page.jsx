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

const ViewApprovedBidWorkSlot = () => {
	const [approvedBidWS, setApprovedBidWS] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

	const staffId = localStorage.getItem('staffId');

	const handleViewApprovedBidWS = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/staff/view/approved-bid-work-slots/${staffId}/`
			);
			if (response.ok) {
				const data = await response.json();
				setApprovedBidWS(data);
			} else {
				console.error('Failed to fetch bid result');
			}
		} catch (error) {
			console.error('Error fetching bid result', error);
		}
	};

	useEffect(() => {
		handleViewApprovedBidWS();
	}, []);

	const handleSearchApprovedBidWS = async () => {
		try {
			const response = await fetch(
				searchTerm === ''
					? `http://localhost:8080/api/staff/view/approved-bid-work-slots/search/${staffId}/ /`
					: `http://localhost:8080/api/staff/view/approved-bid-work-slots/search/${staffId}/${searchTerm}/`
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setApprovedBidWS(data);
			} else {
				console.error(
					`Failed to fetch user data. Status: ${
						response.status
					}, Response: ${await response.text()}`
				);
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	const handleCancelApprovedBidWS = async (bidId) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/staff/cancel/approved-bid-work-slots/${bidId}/`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				const msg = await response.text();
				setMessage(msg);
			} else {
				const errorMessage = await response.text();
				setMessage(errorMessage);
			}
		} catch (error) {
			console.error('Error cancelling', error);
		}

		// after a successful response
		setApprovedBidWS((prevApprovedBidWS) =>
			prevApprovedBidWS.filter((approvedBidWS) => approvedBidWS.bidId !== bidId)
		);
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						My Work Slots
					</Heading>

					<Flex
						direction='column'
						align='center'
						justifyContent='space-betwen'
						pt='8'
					>
						<Text
							pt='2'
							pb='2'
							textAlign='center'
							color={
								message === 'Cancelled Successfully!' ? 'green.500' : 'red.500'
							}
						>
							{message}
						</Text>
					</Flex>

					<Flex justifyContent='space-evenly' align='center' maxW='600' pt='5'>
						<InputGroup>
							<Input
								id='search'
								w='50'
								type='text'
								placeholder='Search by Shift'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<InputRightElement h='auto'>
								<Button size='md' onClick={() => setSearchTerm('')}>
									{<CloseIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>

						<Button
							ml='2'
							onClick={handleSearchApprovedBidWS}
							value={searchTerm}
						>
							Search
						</Button>
					</Flex>
				</Flex>

				{approvedBidWS.length > 0 && (
					<Box overflowY='auto'>
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th color='white'>Role</Th>
									<Th color='white'>Date</Th>
									<Th color='white'>Shift</Th>
									<Th color='white'>Cancel</Th>
								</Tr>
							</Thead>
							<Tbody>
								{approvedBidWS.map((bid) => (
									<Tr key={bid.id}>
										<Td>{bid.role}</Td>
										<Td>{bid.date}</Td>
										<Td>{bid.shift}</Td>
										<Td>
											<Button
												size='sm'
												colorScheme='red'
												onClick={() => handleCancelApprovedBidWS(bid.bidId)}
											>
												Cancel
											</Button>
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

export default ViewApprovedBidWorkSlot;
