'use client';

import {
	Flex,
	Link,
	Heading,
	Input,
	Button,
	FormControl,
	Text,
	useColorMode,
	useColorModeValue,
	IconButton,
	InputGroup,
	InputRightElement,
	Center,
	Select,
} from '@chakra-ui/react';

import { SunIcon, MoonIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Testing - to be integrated with backend later
const usersDetails = [
	{ email: 'admin@gmail.com', password: 'password1', role: 'Admin' },
	{ email: 'owner@gmail.com', password: 'password2', role: 'Owner' },
	{ email: 'manager@gmail.com', password: 'password3', role: 'Manager' },
	{ email: 'staff@gmail.com', password: 'password4', role: 'Staff' },
];

const Login = () => {
	// const formBackground = useColorModeValue('gray.200', 'gray.700');
	// const { colorMode, toggleColorMode } = useColorMode();
	// const isDark = colorMode === 'dark';

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [message, setMessage] = useState('');

	const router = useRouter();

	const handleSubmit = (event) => {
		event.preventDefault();
		const eachUser = usersDetails.find(
			(user) =>
				user.email === email && user.password === password && user.role === role
		);
		if (eachUser) {
			setMessage('Logged in successfully!');
			setTimeout(() => {
				router.push('/account');
			}, 300);
		} else {
			setMessage('Invalid User Account');
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

				<form onSubmit={handleSubmit}>
					<FormControl isRequired>
						<Input
							required
							mb='3'
							id='email'
							name='email'
							type='email'
							placeholder='Email'
							variant='filled'
							borderColor='silver'
							bg='gray.700'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>

					<FormControl isRequired>
						<InputGroup>
							<Input
								required
								mb='3'
								id='password'
								name='password'
								placeholder='Password'
								type={isPasswordVisible ? 'text' : 'password'}
								variant='filled'
								borderColor='silver'
								bg='gray.700'
								onChange={(e) => setPassword(e.target.value)}
							/>
							<InputRightElement h='auto'>
								<Button
									variant='unstyled'
									onClick={() =>
										setIsPasswordVisible((showPassword) => !showPassword)
									}
								>
									{isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>

					<FormControl isRequired>
						<Select
							required
							id='role'
							name='role'
							placeholder='Select Role'
							variant='filled'
							borderColor='silver'
							bg='gray.700'
							onChange={(e) => setRole(e.target.value)}
						>
							<option value='Admin'>Admin</option>
							<option value='Owner'>Owner</option>
							<option value='Manager'>Manager</option>
							<option value='Staff'>Staff</option>
						</Select>
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
						<Button mb='4' colorScheme='blue' onClick={handleSubmit}>
							Log In
						</Button>
					</Center>
				</form>

				{/* 
				<Link mb='2' fontSize='sm' textAlign='center'>
					Forgot Password
				</Link> */}

				<FormControl display='flex' alignItems='center' justifyContent='center'>
					{/* <IconButton
						isRound
						icon={isDark ? <SunIcon /> : <MoonIcon />}
						onClick={toggleColorMode}
					/> */}
				</FormControl>
			</Flex>
		</Flex>
	);
};

export default Login;
