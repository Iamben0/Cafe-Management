// VIEW BID WORK SLOTS PAGE

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
import { CloseIcon } from '@chakra-ui/icons';

const BidWorkSlotTable = ({ workSlots, handleBidWorkSlot }) => {
	return (
		workSlots.length > 0 && (
			<Box overflowY="auto">
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th color="white">Date (YYYY-MM-DD)</Th>
							<Th color="white">Shift (Morning/Afternoon)</Th>
							<Th color="white">Bid</Th>
						</Tr>
					</Thead>
					<Tbody>
						{workSlots
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
							})
							.map((workslot) => (
								<Tr key={workslot.id}>
									<Td>{workslot.date}</Td>
									<Td>{workslot.shift}</Td>
									<Td>
										<Button
											size="sm"
											colorScheme="blue"
											onClick={() => handleBidWorkSlot(workslot.id)}
										>
											Bid
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

const BidWorkSlots = () => {
	const [workSlots, setWorkSlot] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

	const staffId = localStorage.getItem('staffId');
	const role = localStorage.getItem('role');

	const viewWorkSlotToBid = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/staff/view/available-work-slots/${role}/`
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
		viewWorkSlotToBid();
	}, []);

	const handleBidWorkSlot = async (workslotId) => {
		try {
			const bidWorkSlot = {
				staff_id: staffId,
			};
			const response = await fetch(
				`http://localhost:8080/api/staff/view/available-work-slots/bid/${workslotId}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(bidWorkSlot),
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
			console.error('Error bidding workslot', error);
		}
	};

	const handleSearchBidWorkSlot = async () => {
		try {
			const response = await fetch(
				searchTerm === ''
					? `http://localhost:8080/api/staff/view/available-work-slots/search/${role}/ /`
					: `http://localhost:8080/api/staff/view/available-work-slots/search/${role}/${searchTerm}/`
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
			<Container maxW="container.xl">
				<Flex justifyContent="space-between">
					<Heading as="h1" size="xl" mt={8} mb={4}>
						Available Work Slots
					</Heading>

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
							color={message === 'Bid Work Slot!' ? 'green.500' : 'red.500'}
						>
							{message}
						</Text>
					</Flex>

					<Flex justifyContent="space-evenly" align="center" maxW="600" pt="5">
						<InputGroup>
							<Input
								id="search"
								type="text"
								placeholder="Search by Shift"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<InputRightElement h="auto">
								<Button size="md" onClick={() => setSearchTerm('')}>
									{<CloseIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>

						<Button ml="2" onClick={handleSearchBidWorkSlot} value={searchTerm}>
							Search
						</Button>
					</Flex>
				</Flex>
				<Tabs isFitted variant="soft-rounded" colorScheme="cyan">
					<TabList>
						<Tab>
							<Heading size="md" color="black">
								{role === 'un-assign'
									? 'Role unassign, please select a role first!'
									: role}
							</Heading>
						</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<BidWorkSlotTable
								workSlots={workSlots}
								role={role}
								handleBidWorkSlot={handleBidWorkSlot}
							/>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Center>
	);
};

export default BidWorkSlots;
