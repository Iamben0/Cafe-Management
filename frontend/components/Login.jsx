'use client';

import {
	Flex,
	Heading,
	Input,
	Button,
	FormControl,
	Text,
	InputGroup,
	InputRightElement,
	Center,
	Select,
} from '@chakra-ui/react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const router = useRouter();

	const handleSubmit = () => {
		// Create a JSON object with the selected values and send it to the backend
		const loginData = {
			username,
			password,
		};

		// Send loginData to your backend controller via an API request
		fetch('http://localhost:8080/api/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData),
		})
			.then(async (response) => {
				if (response.ok) {
					// setMessage('Logged in successfully!');
					// store json in variable
					const credential = await response.json();
					// setMessage('Login successful!');
					// setResponseMessage('Profile type created!');
					// setError(null);

					// for middleware
					// document.cookie = `profileType=${credential}`;
					setTimeout(() => {
						router.push(`/${credential}`);
					}, 300);
				} else {
					// setMessage('Invalid User Account');
					// setResponseMessage(null);
					// setError('Profile type already existed');
				}
			})
			.catch((error) => {
				console.error('Error creating profile type', error);
			});
	};

	return (
		<Flex
			flexDirection="column"
			h="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<h1
				className="mb-4 text-4xl font-extrabold
			leading-none tracking-tight text-gray-900 
			md:text-5xl lg:text-6xl dark:text-white"
			>
				Cafe Management System
			</h1>
			<Flex
				flexDirection="column"
				bg="gray.700"
				borderRadius="8"
				boxShadow="lg"
				p="12"
				mt="8"
			>
				<Heading textColor="white" alignSelf="center" mb="6">
					Log In
				</Heading>

				<form onSubmit={handleSubmit}>
					<FormControl isRequired>
						<Input
							required
							mb="3"
							id="username"
							name="username"
							type="username"
							placeholder="Username"
							bg="white"
							textColor="black"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormControl>

					<FormControl isRequired>
						<InputGroup>
							<Input
								required
								mb="3"
								id="password"
								name="password"
								placeholder="Password"
								type={isPasswordVisible ? 'text' : 'password'}
								bg="white"
								textColor="black"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<InputRightElement h="auto">
								<Button
									textColor="black"
									onClick={() =>
										setIsPasswordVisible((showPassword) => !showPassword)
									}
								>
									{isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>

					{/* <FormControl isRequired>
						<Select
							required
							id="role"
							name="role"
							placeholder="Select Role"
							bg="white"
							color="black"
							onChange={(e) => setRole(e.target.value)}
						>
							<option value="Admin">Admin</option>
							<option value="Owner">Owner</option>
							<option value="Manager">Manager</option>
							<option value="Staff">Staff</option>
						</Select>
						<Text
							pt="2"
							pb="2"
							textAlign="center"
							color={
								message === 'Logged in successfully!' ? 'green.500' : 'red.500'
							}
						>
							{message}
						</Text>
					</FormControl> */}

					<Center>
						<Button mb="4" colorScheme="blue" onClick={handleSubmit}>
							Log In
						</Button>
					</Center>
				</form>

				<FormControl
					display="flex"
					alignItems="center"
					justifyContent="center"
				></FormControl>
			</Flex>
		</Flex>
	);
};

export default Login;
