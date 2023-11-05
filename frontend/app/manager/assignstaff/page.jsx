'use client';
import {
	Center,
	Container,
	Heading,
	Box,
	Button,
	FormControl,
	FormLabel,
	Select,
	Input,
	Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const AssignStaffWorkSlot = () => {
	const [workSlotId, setWorkSlotId] = useState('');
	const [staffId, setStaffId] = useState('');
	const [message, setMessage] = useState('');
	const [availableStaff, setAvailableStaff] = useState([]);

	const assignStaff = async () => {
		try {
			const assignStaffData = {
				workSlotId: workSlotId,
				staffId: staffId,
			};

			const response = await fetch(
				'http://localhost:8080/api/manager/view/work-slots/assign/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(assignStaffData),
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
			console.error('Error assigning staff', error);
		}
	};

	const viewStaff = async () => {
		try {
			const response = await fetch(
				'http://localhost:8080/api/system-admin/view/user-accounts/'
			);
			if (response.ok) {
				const data = await response.json();
				setAvailableStaff(data);
			} else {
				console.error('Failed to fetch staff');
			}
		} catch (error) {
			console.error('Error fetching staff', error);
		}
	};

	useEffect(() => {
		viewStaff();
	}, []);

	return (
		<Center>
			<Container maxW='container.xl'>
				<Heading as='h1' size='xl' mt={8} mb={4}>
					Assign Staff to Work Slot
				</Heading>
				<Box w='300px'>
					<FormControl mt={4}>
						<FormLabel>Staff</FormLabel>
						<Select
							value={staffId}
							placeholder='Select Staff'
							bg='white'
							color='black'
							onChange={(e) => setStaffId(e.target.value)}
						>
							{availableStaff
								.filter(
									(staff) =>
										staff.role === 'chef' ||
										staff.role === 'waiter' ||
										staff.role === 'cashier'
								)
								.map((staff) => (
									<option key={staff.id} value={staff.id}>
										{staff.name}
									</option>
								))}
						</Select>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Work Slot</FormLabel>
						<Input
							placeholder='Work Slot ID'
							bg='white'
							color='black'
							type='text'
							value={workSlotId}
							onChange={(e) => setWorkSlotId(e.target.value)}
						/>
					</FormControl>

					<Button mt={4} onClick={assignStaff}>
						Assign
					</Button>
					<Text
						pt='2'
						pb='2'
						textAlign='center'
						color={message === 'Work Slot Assigned!' ? 'green.500' : 'red.500'}
					>
						{message}
					</Text>
				</Box>
			</Container>
		</Center>
	);
};

export default AssignStaffWorkSlot;
