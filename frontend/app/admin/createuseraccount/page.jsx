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

const CreateUserAccount = () => {
	const [jobTitle, setJobTitle] = useState('');
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [userProfile, setUserProfile] = useState([]);

	const viewProfiles = async () => {
		try {
			const response = await fetch(
				'http://localhost:8080/api/system-admin/view/user-profiles/'
			);
			if (response.ok) {
				const data = await response.json();
				setUserProfile(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		viewProfiles();
	}, []);

	const handleCreateAccount = async () => {
		// Create a JSON object with the selected values and send it to the backend
		try {
			const userAccountData = {
				username,
				name,
				password,
				email,
				jobTitle,
			};

			// Send userAccountData to your backend controller via an API request
			const response = await fetch(
				'http://localhost:8080/api/system-admin/create/user-account/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userAccountData),
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
			console.error('Error creating account', error);
		}
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Heading as='h1' size='xl' mt={8} mb={4}>
					Create User Account
				</Heading>
				<Box w='300px'>
					<FormControl mt={4}>
						<FormLabel>Username</FormLabel>
						<Input
							placeholder='Username'
							bg='white'
							color='black'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder='Name'
							bg='white'
							color='black'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder='Password'
							bg='white'
							color='black'
							type='text'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Email</FormLabel>
						<Input
							placeholder='Email'
							bg='white'
							color='black'
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Job Title</FormLabel>
						<Select
							value={jobTitle}
							placeholder='Select Job Title'
							bg='white'
							color='black'
							onChange={(e) => setJobTitle(e.target.value)}
						>
							{userProfile
								.filter((user) => user.active === true)
								.map((user) => (
									<option key={user.id} value={user.jobTitle}>
										{user.jobTitle}
									</option>
								))}
						</Select>
					</FormControl>

					<Button mt={4} onClick={handleCreateAccount}>
						Create User Account
					</Button>
					<Text
						pt='2'
						pb='2'
						textAlign='center'
						color={
							message === 'User Account created!' ? 'green.500' : 'red.500'
						}
					>
						{message}
					</Text>
				</Box>
			</Container>
		</Center>
	);
};

export default CreateUserAccount;
