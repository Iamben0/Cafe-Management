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

const UpdateUserAccount = () => {
	const [newUsername, setNewUsername] = useState('');
	const [message, setMessage] = useState('');
	const [newName, setNewName] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newEmail, setNewEmail] = useState('');

	const oldUsername = localStorage.getItem('oldUsername');

	useEffect(() => {
		// Retrieve the username, name, password, email, jobTitle from localStorage
		const username = localStorage.getItem('oldUsername');
		const name = localStorage.getItem('oldName');
		const password = localStorage.getItem('oldPassword');
		const email = localStorage.getItem('oldEmail');

		// Set the username, name, password, email, jobTitle to the state
		setNewUsername(username);
		setNewName(name);
		setNewPassword(password);
		setNewEmail(email);
	}, []);

	const handleUpdateAccount = async () => {
		// Create a JSON object with the selected values and send it to the backend
		try {
			const updatedUserAccount = {
				newUsername: newUsername,
				newName: newName,
				newPassword: newPassword,
				newEmail: newEmail,
			};
			const response = await fetch(
				`http://localhost:8080/api/system-admin/update/user-account/${oldUsername}/`,
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

	const handleGoBack = () => {
		window.history.back(); // This will navigate back to the previous page in the browser's history.
		localStorage.removeItem('oldUsername');
		localStorage.removeItem('oldName');
		localStorage.removeItem('oldEmail');
		localStorage.removeItem('oldPassword');
	};

	return (
		<Center>
			<Container maxW="container.xl">
				<Heading as="h1" size="xl" mt={8} mb={4}>
					Update User Account
				</Heading>
				<Box w="300px">
					<FormControl mt={4}>
						<FormLabel>Username</FormLabel>
						<Input
							placeholder="Username"
							bg="white"
							color="black"
							type="text"
							value={newUsername}
							onChange={(e) => setNewUsername(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder="Name"
							bg="white"
							color="black"
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder="Password"
							bg="white"
							color="black"
							type="text"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Email</FormLabel>
						<Input
							placeholder="Email"
							bg="white"
							color="black"
							type="text"
							value={newEmail}
							onChange={(e) => setNewEmail(e.target.value)}
						/>
						<Flex>
							<Button
								colorScheme="blue"
								mt={4}
								mr={4}
								onClick={handleUpdateAccount}
							>
								Update
							</Button>
							<Button colorScheme="red" mt={4} mr={4} onClick={handleGoBack}>
								Cancel
							</Button>
						</Flex>

						<Text
							pt="2"
							pb="2"
							textAlign="center"
							color={message === 'Account Updated!' ? 'green.500' : 'red.500'}
						>
							{message}
						</Text>
					</FormControl>
				</Box>
			</Container>
		</Center>
	);
};

export default UpdateUserAccount;
