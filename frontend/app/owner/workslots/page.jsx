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
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const WorkSlotTable = ({ workSlots, role, handleSuspendWorkSlot }) => {
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
							.filter((workslot) => workslot.role === role && workslot.active)
							.map((workslot) => (
								<Tr key={workslot.id}>
									<Td>{workslot.date}</Td>
									<Td>{workslot.shift}</Td>
									<Td>{workslot.staff}</Td>
									<Td>
										<Link href={`workslots/update/${workslot.id}`}>
											<Button
												size='sm'
												onClick={() => (
													localStorage.setItem(
														'oldUsername',
														workslot.username
													),
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
											onClick={() => handleSuspendWorkSlot(workslot.id)}
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

	const handleSuspendWorkSlot = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/owner/suspend/${id}/`,
				{
					method: 'DELETE', // Assuming you're using HTTP DELETE for deletion
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

		// After a successful response
		setWorkSlot((prevWorkSlots) =>
			prevWorkSlots.filter((workSlots) => workSlots.id !== id)
		);
	};

	// Filter the work slots based on the search term
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
						<Input
							id='search'
							w='50'
							type='text'
							placeholder='Search by Shift'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
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
								handleSuspendWorkSlot={handleSuspendWorkSlot}
							/>
						</TabPanel>
						<TabPanel>
							<WorkSlotTable
								workSlots={workSlots}
								role='waiter'
								handleSuspendWorkSlot={handleSuspendWorkSlot}
							/>
						</TabPanel>
						<TabPanel>
							<WorkSlotTable
								workSlots={workSlots}
								role='cashier'
								handleSuspendWorkSlot={handleSuspendWorkSlot}
							/>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Center>
	);
};

export default WorkSlots;
