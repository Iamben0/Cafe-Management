// VIEW WORK SLOTS PAGE

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
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CloseIcon } from '@chakra-ui/icons';

const WorkSlotTable = ({ workSlots, role, handleDeleteWorkSlot }) => {
	return (
		workSlots.length > 0 && (
			<Box overflowY='auto'>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th color='white'>Date (YYYY-MM-DD)</Th>
							<Th color='white'>Shift (Morning/Afternoon)</Th>
							<Th color='white'>Staff</Th>
							<Th color='white'>Update</Th>
							<Th color='white'>Delete</Th>
						</Tr>
					</Thead>
					<Tbody>
						{workSlots
							.filter((workslot) => workslot.role === role)
							.sort((a, b) => {
								const dateComparison = new Date(a.date) - new Date(b.date);
								if (dateComparison !== 0) {
									return dateComparison; // sort by date in ascending order
								}

								// if dates are the same, compare by shift
								const shiftComparison = b.shift.localeCompare(a.shift); // compare shifts as strings

								if (shiftComparison !== 0) {
									return shiftComparison; // sort by shift
								}

								// if dates and shifts are the same, sort "Not assigned" staff last
								if (a.staff === 'Not assigned' && b.staff !== 'Not assigned') {
									return 1; // "Not assigned" comes after other staff
								} else if (
									a.staff !== 'Not assigned' &&
									b.staff === 'Not assigned'
								) {
									return -1; // "Not assigned" comes before other staff
								} else {
									return 0; // they have the same date, shift, and staff
								}
							})
							.map((workslot) => (
								<Tr key={workslot.id}>
									<Td>{workslot.date}</Td>
									<Td>{workslot.shift}</Td>
									<Td
										color={
											workslot.staff === 'Not assigned' ? 'red.500' : 'white'
										}
									>
										{workslot.staff}
									</Td>

									<Td>
										<Link href={`workslots/update/${workslot.id}`}>
											<Button
												size='sm'
												onClick={() => (
													localStorage.setItem('workSlotId', workslot.id),
													localStorage.setItem('oldShift', workslot.shift),
													localStorage.setItem('oldRole', workslot.role),
													localStorage.setItem('oldDate', workslot.date)
												)}
											>
												Update
											</Button>
										</Link>
									</Td>
									<Td>
										<Button
											size='sm'
											colorScheme='red'
											onClick={() => handleDeleteWorkSlot(workslot.id)}
										>
											Delete
										</Button>
									</Td>
								</Tr>
							))}
					</Tbody>
				</Table>
			</Box>
		)
	);
};

const WorkSlots = () => {
	const [workSlots, setWorkSlot] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

	const viewWorkSlots = async () => {
		try {
			const response = await fetch(
				'http://localhost:8080/api/owner/view/work-slots/'
			);
			if (response.ok) {
				const data = await response.json();
				setWorkSlot(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		viewWorkSlots();
	}, []);

	const handleDeleteWorkSlot = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/owner/delete/${id}/`,
				{
					method: 'DELETE', // assuming you're using HTTP DELETE for deletion
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
			console.error('Error deleting workslot', error);
		}

		// after a successful response
		setWorkSlot((prevWorkSlots) =>
			prevWorkSlots.filter((workSlots) => workSlots.id !== id)
		);
	};

	// filter the work slots based on the search term
	const handleSearchWorkSlot = async () => {
		try {
			const response = await fetch(
				searchTerm === ''
					? `http://localhost:8080/api/owner/search/ /`
					: `http://localhost:8080/api/owner/search/${searchTerm}/`
			);
			if (response.ok) {
				const data = await response.json();
				setWorkSlot(data);
			} else {
				console.error(
					`Failed to fetch work slot. Status: ${
						response.status
					}, Response: ${await response.text()}`
				);
			}
		} catch (error) {
			console.error('Error fetching work slot', error);
		}
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						Work Slots
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
							color={message === 'Work Slot Deleted!' ? 'green.500' : 'red.500'}
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

						<Button ml='2' onClick={handleSearchWorkSlot} value={searchTerm}>
							Search
						</Button>
					</Flex>
				</Flex>
				<Tabs isFitted variant='soft-rounded' colorScheme='cyan'>
					<TabList>
						<Tab>
							<Heading size='md' color='black'>
								Chef
							</Heading>
						</Tab>
						<Tab>
							<Heading size='md' color='black'>
								Waiter
							</Heading>
						</Tab>
						<Tab>
							<Heading size='md' color='black'>
								Cashier
							</Heading>
						</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<WorkSlotTable
								workSlots={workSlots}
								role='chef'
								handleDeleteWorkSlot={handleDeleteWorkSlot}
							/>
						</TabPanel>
						<TabPanel>
							<WorkSlotTable
								workSlots={workSlots}
								role='waiter'
								handleDeleteWorkSlot={handleDeleteWorkSlot}
							/>
						</TabPanel>
						<TabPanel>
							<WorkSlotTable
								workSlots={workSlots}
								role='cashier'
								handleDeleteWorkSlot={handleDeleteWorkSlot}
							/>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Center>
	);
};

export default WorkSlots;
