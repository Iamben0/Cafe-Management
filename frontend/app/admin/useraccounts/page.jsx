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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const UserAccounts = () => {
	const [userAccount, setUserAccount] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

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

	const handleSuspendProfile = async (userJobTitle) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/system-admin/suspend/${userJobTitle}`,
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
		setUserProfile((prevUsers) =>
			prevUsers.filter((user) => user.jobTitle !== userJobTitle)
		);
	};

	// Filter the profiles based on the search term
	const handleSearchProfile = (e) => {
		if (searchTerm.trim() === '') {
			// If the search term is empty, show all profiles
			viewProfile();
		} else {
			const filteredProfiles = userAccount.filter((user) =>
				user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
			);

			// Set the filtered profiles to the state
			setUserProfile(filteredProfiles);
		}
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						User Profiles
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

					<Flex justifyContent='space-evenly' align='center' maxW='600'>
						<Input
							id='search'
							w='50'
							type='text'
							placeholder='Search by Job Title'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button ml='2' onClick={handleSearchProfile} value={searchTerm}>
							Search
						</Button>
					</Flex>
				</Flex>

				{userAccount.length > 0 && (
					<Table variant='simple'>
						<Thead>
							<Tr>
								<Th color='white'>Profile Type</Th>
								<Th color='white'>Job Title</Th>
								<Th color='white'>Update</Th>
								<Th color='white'>Suspend</Th>
							</Tr>
						</Thead>
						<Tbody>
							{/* // set up if active == false */}
							{userAccount
								.filter((user) => user.active === true)
								.map((user) => (
									<Tr key={user.id}>
										<Td>{user.username}</Td>
										<Td>{user.name}</Td>
										<Td>{user.email}</Td>
										<Td>
											<Link href={`useraccount/update/${user.email}`}>
												<Button
													size='sm'
													onClick={() =>
														localStorage.setItem('oldJobTitle', user.jobTitle)
													}
												>
													Update
												</Button>
											</Link>
										</Td>
										<Td>
											<Button
												size='sm'
												colorScheme='red'
												onClick={() => handleSuspendProfile(user.jobTitle)}
											>
												Suspend
											</Button>
										</Td>
									</Tr>
								))}
						</Tbody>
					</Table>
				)}
			</Container>
		</Center>
	);
};

export default UserAccounts;
