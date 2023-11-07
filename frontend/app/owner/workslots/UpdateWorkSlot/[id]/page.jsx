// UPDATE WORK SLOT PAGE

'use client';

import { useState, useEffect } from 'react';

import {
	Box,
	Heading,
	Input,
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Flex,
	Text,
	Select,
} from '@chakra-ui/react';

const UpdateWorkSlot = () => {
	const [message, setMessage] = useState('');
	const [newRole, setNewRole] = useState('');
	const [newDate, setNewDate] = useState('');
	const [newShift, setNewShift] = useState('');

	const workSlotId = localStorage.getItem('workSlotId');

	useEffect(() => {
		// retrieve the id, role, shift, date from localStorage
		const role = localStorage.getItem('oldRole');
		const shift = localStorage.getItem('oldShift');
		const date = localStorage.getItem('oldDate');

		// set the role, shift, date to the state
		setNewRole(role);
		setNewShift(shift);
		setNewDate(date);
	}, []);

	const handleUpdateWorkSlot = async () => {
		// create a JSON object with the selected values and send it to the backend
		try {
			const updatedWorkSlot = {
				role: newRole,
				shift: newShift,
				date: newDate,
			};
			console.log(updatedWorkSlot);
			const response = await fetch(
				`http://localhost:8080/api/owner/update/${workSlotId}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedWorkSlot),
				}
			);
			if (response.ok) {
				console.log('Work Slot Updated!');
				const msg = await response.text();
				setMessage(msg);
			} else {
				console.error('Error updating work slot');
				const msg = await response.text();
				setMessage(msg);
			}
		} catch (error) {
			console.error('Error updating work slot:', error);
		}
	};

	const handleGoBack = () => {
		window.history.back(); // this will navigate back to the previous page in the browser's history
		localStorage.removeItem('workSlotId');
		localStorage.removeItem('oldRole');
		localStorage.removeItem('oldShift');
		localStorage.removeItem('oldDate');
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Heading as='h1' size='xl' mt={8} mb={4}>
					Update Work Slot
				</Heading>
				<Box w='300px'>
					<FormControl mt={4}>
						<FormLabel>Date</FormLabel>
						<Input
							placeholder='dd/mm/yyyy'
							bg='white'
							color='black'
							type='date'
							value={newDate}
							onChange={(e) => setNewDate(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Shift</FormLabel>
						<Select
							bg='white'
							color='black'
							value={newShift}
							onChange={(e) => setNewShift(e.target.value)}
						>
							<option value='morning'>morning</option>
							<option value='afternoon'>afternoon</option>
						</Select>
						<Flex>
							<Button
								colorScheme='blue'
								mt={4}
								mr={4}
								onClick={handleUpdateWorkSlot}
							>
								Update
							</Button>
							<Button colorScheme='red' mt={4} mr={4} onClick={handleGoBack}>
								Cancel
							</Button>
						</Flex>

						<Text
							pt='2'
							pb='2'
							textAlign='center'
							color={message === 'Work Slot Updated!' ? 'green.500' : 'red.500'}
						>
							{message}
						</Text>
					</FormControl>
				</Box>
			</Container>
		</Center>
	);
};

export default UpdateWorkSlot;
