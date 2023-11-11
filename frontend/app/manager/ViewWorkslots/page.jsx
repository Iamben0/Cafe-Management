// VIEW WORK SLOTS LEFT PAGE

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
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

const WorkSlotLeftTable = ({ workSlots }) => {
	return (
		workSlots.length > 0 && (
			<Box overflowY="auto">
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th color="white">ID</Th>
							<Th color="white">Date (YYYY-MM-DD)</Th>
							<Th color="white">Shift (Morning/Afternoon)</Th>
							<Th color="white">Role</Th>
						</Tr>
					</Thead>

					<Tbody>
						{workSlots.map((workslot) => (
							<Tr key={workslot.id}>
								<Td>{workslot.workSlotId}</Td>
								<Td>{workslot.date}</Td>
								<Td>{workslot.shift}</Td>
								<Td>{workslot.role}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		)
	);
};

const WorkSlotLeft = () => {
	const [dayWorkSlot, setDayWorkSlot] = useState([]);
	const [weekWorkSlot, setWeekWorkSlot] = useState([]);
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

	const viewDayWorkSlot = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/manager/view/day-work-slots/${date}/`
			);
			if (response.ok) {
				const data = await response.json();
				setDayWorkSlot(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		viewDayWorkSlot();
	}, []);

	const viewWeekWorkSlot = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/manager/view/week-work-slots/${date}/`
			);
			if (response.ok) {
				const data = await response.json();
				setWeekWorkSlot(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		viewWeekWorkSlot();
	}, []);

	return (
		<Center>
			<Container maxW="container.xl">
				<Flex justifyContent="space-between" align="center">
					<Heading as="h1" size="lg" mt={8} mb={4}>
						Work Slots left for the Day/Week
					</Heading>

					<Flex
						direction="column"
						justifyContent="space-evenly"
						align="center"
						maxW="600"
						pt="5"
					>
						<InputGroup>
							<Input
								id="search"
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</InputGroup>
						<Flex pt="2" pb="2">
							<Button onClick={viewDayWorkSlot} value={date}>
								Search for Day
							</Button>
							<Button ml="2" onClick={viewWeekWorkSlot} value={date}>
								Search for Week
							</Button>
						</Flex>
					</Flex>
				</Flex>
				<Tabs isFitted variant="soft-rounded" colorScheme="cyan">
					<TabList>
						<Tab>
							<Heading size="md" color="black">
								Day
							</Heading>
						</Tab>
						<Tab>
							<Heading size="md" color="black">
								Week
							</Heading>
						</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<WorkSlotLeftTable workSlots={dayWorkSlot} />
						</TabPanel>
						<TabPanel>
							<WorkSlotLeftTable workSlots={weekWorkSlot} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Center>
	);
};

export default WorkSlotLeft;
