// VIEW AVAILABLE CAFE STAFF PAGE

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

const AvailableStaffTable = ({ availableStaff }) => {
	return (
		availableStaff.length > 0 && (
			<Box overflowY='auto'>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th color='white'>Date (YYYY-MM-DD)</Th>
							<Th color='white'>Name</Th>
							<Th color='white'>Username</Th>
							<Th color='white'>Role</Th>
						</Tr>
					</Thead>

					<Tbody>
						{availableStaff.map((staff) => (
							<Tr key={staff.id}>
								<Td>{staff.date}</Td>
								<Td>{staff.name}</Td>
								<Td>{staff.username}</Td>
								<Td>{staff.role}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		)
	);
};

const AvailableStaff = () => {
	const [dayAvailableStaff, setDayAvailableStaff] = useState([]);
	const [weekAvailableStaff, setWeekAvailableStaff] = useState([]);
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

	const viewDayAvailableStaff = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/manager/view/day-available-staff/${date}/`
			);
			if (response.ok) {
				const data = await response.json();
				setDayAvailableStaff(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		viewDayAvailableStaff();
	}, []);

	const viewWeekAvailableStaff = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/manager/view/week-available-staff/${date}/`
			);
			if (response.ok) {
				const data = await response.json();
				setWeekAvailableStaff(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		viewWeekAvailableStaff();
	}, []);

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between' align='center'>
					<Heading as='h1' size='lg' mt={8} mb={4}>
						Available Cafe Staff for the Day/Week
					</Heading>

					<Flex
						direction='column'
						justifyContent='space-evenly'
						align='center'
						maxW='600'
						pt='5'
					>
						<InputGroup>
							<Input
								id='search'
								type='date'
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</InputGroup>
						<Flex pt='2' pb='2'>
							<Button onClick={viewDayAvailableStaff} value={date}>
								Search for Day
							</Button>
							<Button ml='2' onClick={viewWeekAvailableStaff} value={date}>
								Search for Week
							</Button>
						</Flex>
					</Flex>
				</Flex>
				<Tabs isFitted variant='soft-rounded' colorScheme='cyan'>
					<TabList>
						<Tab>
							<Heading size='md' color='black'>
								Day
							</Heading>
						</Tab>
						<Tab>
							<Heading size='md' color='black'>
								Week
							</Heading>
						</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<AvailableStaffTable availableStaff={dayAvailableStaff} />
						</TabPanel>
						<TabPanel>
							<AvailableStaffTable availableStaff={weekAvailableStaff} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Center>
	);
};

export default AvailableStaff;
