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
import { useState, useEffect } from 'react';

const SelectStaffRole = () => {
	const [role, setRole] = useState('');
	const [message, setMessage] = useState('');
	const [userAccount, setUserAccount] = useState([]);
	const username = localStorage.getItem('username');

	const viewAccount = async () => {
		try {
			const response = await fetch(
				'http://localhost:8080/api/system-admin/view/user-accounts/'
			);
			if (response.ok) {
				const data = await response.json();
				setUserAccount(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		viewAccount();
	}, []);
	
	const handleUpdateAccount = async () => {
		// Create a JSON object with the selected values and send it to the backend
		try {
			const updatedUserAccount = {
				role: role,
			};
			const response = await fetch(
				`http://localhost:8080/api/system-admin/update/user-account-role/${username}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedUserAccount),
				}
			);
			if (response.ok) {
				console.log('Account Updated!');
				const msg = await response.text();
				setMessage(msg);
			} else {
				console.error('Error updating account');
				const msg = await response.text();
				setMessage(msg);
			}
		} catch (error) {
			console.error('Error updating account:', error);
		}
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Heading as='h1' size='xl' mt={8} mb={4}>
					Select Role to Book Work Slot
				</Heading>
				<Box w='300px'>
					<FormControl mt={4}>
						<FormLabel>Role</FormLabel>
						<Select
							placeholder='Select Role'
							bg='white'
							color='black'
							onChange={(e) => setRole(e.target.value)}
						>
							<option value='waiter'>waiter</option>
							<option value='cashier'>cashier</option>
							<option value='chef'>chef</option>
						</Select>
					</FormControl>

					<Button mt={4} onClick={handleUpdateAccount}>
						Select
					</Button>
					<Text
						pt='2'
						pb='2'
						textAlign='center'
						color={message === 'Role Selected!' ? 'green.500' : 'red.500'}
					>
						{message}
					</Text>
				</Box>
			</Container>
		</Center>
	);
};

export default SelectStaffRole;
