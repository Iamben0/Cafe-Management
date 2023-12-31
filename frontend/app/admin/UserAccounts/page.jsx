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
	Text,
	Th,
	Thead,
	Tr,
	Box,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CloseIcon } from '@chakra-ui/icons';

const UserAccounts = () => {
	const [userAccount, setUserAccount] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

	const username = localStorage.getItem('username');

	const viewAccounts = async () => {
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
		viewAccounts();
	}, []);

	const handleSuspendAccount = async (username) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/system-admin/suspend/user-account/${username}/`,
				{
					method: 'DELETE', // Assuming you're using HTTP DELETE for suspension
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
			console.error('Error suspending user', error);
		}

		// After a successful response
		setUserAccount((prevUsers) =>
			prevUsers.filter((user) => user.username !== username)
		);
	};

	// Filter the account based on the search term
	const handleSearchAccount = async () => {
		try {
			const response = await fetch(
				searchTerm === ''
					? `http://localhost:8080/api/system-admin/search/user-account/ /`
					: `http://localhost:8080/api/system-admin/search/user-account/${searchTerm}/`
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setUserAccount(data);
			} else {
				console.error(
					`Failed to fetch user data. Status: ${
						response.status
					}, Response: ${await response.text()}`
				);
			}
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						User Accounts
					</Heading>

					<Flex
						direction='column'
						align='center'
						justifyContent='space-betwen'
						pt='8'
					>
						<Text
							pt='2'
							pb='2'
							textAlign='center'
							color={message === 'Account Suspended!' ? 'green.500' : 'red.500'}
						>
							{message}
						</Text>
					</Flex>

					<Flex justifyContent='space-evenly' align='center' maxW='600' pt='5'>
						<InputGroup>
							<Input
								id='search'
								w='50'
								type='text'
								placeholder='Search by Name'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<InputRightElement h='auto'>
								<Button size='md' onClick={() => setSearchTerm('')}>
									{<CloseIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>

						<Button ml='2' onClick={handleSearchAccount} value={searchTerm}>
							Search
						</Button>
					</Flex>
				</Flex>

				{userAccount.length > 0 && (
					<Box overflowY='auto'>
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th color='white'>Username</Th>
									<Th color='white'>Name</Th>
									<Th color='white'>Email</Th>
									<Th color='white'>Job Title</Th>
									<Th color='white'>Update</Th>
									<Th color='white'>Suspend</Th>
								</Tr>
							</Thead>
							<Tbody>
								{userAccount
									.filter(
										(user) => user.active === true && user.username !== username
									)
									.map((user) => (
										<Tr key={user.id}>
											<Td>{user.username}</Td>
											<Td>{user.name}</Td>
											<Td>{user.email}</Td>
											<Td>{user.userProfile.jobTitle}</Td>
											<Td>
												<Link
													href={`UserAccounts/UpdateUserAccount/${user.username}`}
												>
													<Button
														size='sm'
														onClick={() => (
															localStorage.setItem(
																'oldUsername',
																user.username
															),
															localStorage.setItem('oldName', user.name),
															localStorage.setItem('oldEmail', user.email),
															localStorage.setItem(
																'oldPassword',
																user.password
															),
															localStorage.setItem(
																'oldJobTitle',
																user.userProfile.jobTitle
															)
														)}
													>
														Update
													</Button>
												</Link>
											</Td>
											<Td>
												<Button
													size='sm'
													colorScheme='red'
													onClick={() => handleSuspendAccount(user.username)}
												>
													Suspend
												</Button>
											</Td>
										</Tr>
									))}
							</Tbody>
						</Table>
					</Box>
				)}
			</Container>
		</Center>
	);
};

export default UserAccounts;
