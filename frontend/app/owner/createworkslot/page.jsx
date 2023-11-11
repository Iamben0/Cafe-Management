// CREATE WORK SLOT PAGE

'use client';
import React from 'react';
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
import { useState } from 'react';

const CreateWorkSlot = () => {
	const [shift, setShift] = useState('');
	const [role, setRole] = useState('');
	const [date, setDate] = useState('');
	const [message, setMessage] = useState('');

	const handleCreateWorkSlot = async () => {
		// create a JSON object with the selected values and send it to the backend
		try {
			const workSlotData = {
				shift: shift,
				role: role,
				date: date,
			};

			// send wokrSlotData to your backend controller via an API request
			const response = await fetch(
				'http://localhost:8080/api/owner/create/work-slot/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(workSlotData),
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
			console.error('Error creating work slot', error);
		}
	};

	return (
		<Center>
			<Container maxW="container.xl">
				<Heading as="h1" size="xl" mt={8} mb={4}>
					Create Work Slot
				</Heading>
				<Box w="300px">
					<FormControl mt={4}>
						<FormLabel>Shift</FormLabel>
						<Select
							placeholder="Select Shift"
							bg="white"
							color="black"
							value={shift}
							onChange={(e) => setShift(e.target.value)}
						>
							<option value="morning">morning</option>
							<option value="afternoon">afternoon</option>
						</Select>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Role</FormLabel>
						<Select
							placeholder="Select Role"
							bg="white"
							color="black"
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<option value="waiter">waiter</option>
							<option value="cashier">cashier</option>
							<option value="chef">chef</option>
						</Select>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Date</FormLabel>
						<Input
							bg="white"
							color="black"
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</FormControl>

					<Button mt={4} onClick={handleCreateWorkSlot}>
						Create Work Slot
					</Button>
					<Text
						pt="2"
						pb="2"
						textAlign="center"
						color={message === 'Work Slot created!' ? 'green.500' : 'red.500'}
					>
						{message}
					</Text>
				</Box>
			</Container>
		</Center>
	);
};

export default CreateWorkSlot;
