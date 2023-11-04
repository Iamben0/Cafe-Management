// VIEW CAFE STAFF BID PAGE

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

const viewStaffBid = () => {
	const [staffBid, setStaffBid] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

	const staffId = localStorage.getItem('staffId');

	const handleViewStaffBid = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/manager/view/staff-bid/`
			);
			if (response.ok) {
				const data = await response.json();
				setStaffBid(data);
			} else {
				console.error('Failed to fetch staff bids');
			}
		} catch (error) {
			console.error('Error fetching staff bids', error);
		}
	};

	useEffect(() => {
		handleViewStaffBid();
	}, []);

	const handleApprovedStaffBid = async (bidId) => {
		try {
			const approvedBid = {
				status: 'approved',
			};
			const response = await fetch(
				`http://localhost:8080/api/manager/view/staff-bid/approve/${bidId}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(approvedBid),
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
			console.error('Error Approving', error);
		}

		setStaffBid((prevStaffBid) =>
			prevStaffBid.filter((bid) => bid.bidId !== bidId)
		);
	};

	const handleRejectStaffBid = async (bidId) => {
		try {
			const approvedBid = {
				status: 'rejected',
			};
			const response = await fetch(
				`http://localhost:8080/api/manager/view/staff-bid/reject/${bidId}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(approvedBid),
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
			console.error('Error Approving', error);
		}

		setStaffBid((prevStaffBid) =>
			prevStaffBid.filter((bid) => bid.bidId !== bidId)
		);
	};

	const handleSearchStaffBid = async () => {
		try {
			const response = await fetch(
				searchTerm === ''
					? `http://localhost:8080/api/manager/view/staff-bid/search/ /`
					: `http://localhost:8080/api/manager/view/staff-bid/search/${searchTerm}/`
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setStaffBid(data);
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

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						Cafe Staff Bid
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
								message === 'Bid Approved!'
									? 'green.500'
									: message === 'Bid Rejected!'
									? 'green.500'
									: 'red.500'
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

						<Button ml='2' onClick={handleSearchStaffBid} value={searchTerm}>
							Search
						</Button>
					</Flex>
				</Flex>

				{staffBid.length > 0 && (
					<Box overflowY='auto'>
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th color='white'>Staff Name</Th>
									<Th color='white'>Role</Th>
									<Th color='white'>Date</Th>
									<Th color='white'>Shift</Th>
									<Th color='white'>Approve</Th>
									<Th color='white'>Reject</Th>
								</Tr>
							</Thead>
							<Tbody>
								{staffBid.map((bid) => (
									<Tr key={bid.id}>
										<Td>{bid.name}</Td>
										<Td>{bid.role}</Td>
										<Td>{bid.date}</Td>
										<Td>{bid.shift}</Td>
										<Td>
											<Button
												size='sm'
												colorScheme='blue'
												onClick={() => handleApprovedStaffBid(bid.bidId)}
											>
												Approve
											</Button>
										</Td>
										<Td>
											<Button
												size='sm'
												colorScheme='red'
												onClick={() => handleRejectStaffBid(bid.bidId)}
											>
												Reject
											</Button>
										</Td>
										{/* <Td
											color={
												bid.status === 'approved'
													? 'green.500'
													: bid.status === 'rejected'
													? 'red.500'
													: 'white'
											}
										>
											{bid.status}
										</Td> */}
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

export default viewStaffBid;
