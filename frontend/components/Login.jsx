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

	const handleLogin = async () => {
		try {
			const loginData = {
				username,
				password,
			};

			const response = await fetch('http://localhost:8080/api/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			});

			if (response.ok) {
				const credential = await response.json();
				setMessage('Logged in successfully!');
				router.push(`/${credential}`);
			} else {
				const errorMessage = await response.text();
				setMessage(errorMessage);
			}
		} catch (error) {
			console.error('Error creating profile type', error);
		}
	};

	return (
		<Flex
			flexDirection='column'
			h='100vh'
			alignItems='center'
			justifyContent='center'
		>
			<h1
				className='mb-4 text-4xl font-extrabold
			leading-none tracking-tight text-gray-900 
			md:text-5xl lg:text-6xl dark:text-white'
			>
				Cafe Management System
			</h1>
			<Flex
				flexDirection='column'
				bg='gray.700'
				borderRadius='8'
				boxShadow='lg'
				p='12'
				mt='8'
			>
				<Heading textColor='white' alignSelf='center' mb='6'>
					Log In
				</Heading>

				<FormControl isRequired>
					<Input
						required
						mb='3'
						id='username'
						name='username'
						type='username'
						placeholder='Username'
						bg='white'
						textColor='black'
						onChange={(e) => setUsername(e.target.value)}
					/>
				</FormControl>

				<FormControl isRequired>
					<InputGroup>
						<Input
							required
							id='password'
							name='password'
							placeholder='Password'
							type={isPasswordVisible ? 'text' : 'password'}
							bg='white'
							textColor='black'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<InputRightElement h='auto'>
							<Button
								textColor='black'
								onClick={() =>
									setIsPasswordVisible((showPassword) => !showPassword)
								}
							>
								{isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
							</Button>
						</InputRightElement>
					</InputGroup>
					<Text
						pt='2'
						pb='2'
						textAlign='center'
						color={
							message === 'Logged in successfully!' ? 'green.500' : 'red.500'
						}
					>
						{message}
					</Text>
				</FormControl>

				<Center>
					<Button mb='4' colorScheme='blue' onClick={handleLogin}>
						Log In
					</Button>
				</Center>

				<FormControl
					display='flex'
					alignItems='center'
					justifyContent='center'
				></FormControl>
			</Flex>
		</Flex>
	);
};

export default Login;
