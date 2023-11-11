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

const UserProfiles = () => {
	const [userProfile, setUserProfile] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

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

	const handleSuspendProfile = async (jobTitle) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/system-admin/suspend/user-profile/${jobTitle}/`,
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
			prevUsers.filter((user) => user.jobTitle !== jobTitle)
		);
	};

	const handleSearchProfile = async () => {
		try {
			const response = await fetch(
				searchTerm === ''
					? `http://localhost:8080/api/system-admin/search/user-profile/ /`
					: `http://localhost:8080/api/system-admin/search/user-profile/${searchTerm}/`
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setUserProfile(data);
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
							color={message === 'Profile Suspended!' ? 'green.500' : 'red.500'}
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
								placeholder='Search by Job Title'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<InputRightElement h='auto'>
								<Button size='md' onClick={() => setSearchTerm('')}>
									{<CloseIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
						<Button ml='2' onClick={handleSearchProfile} value={searchTerm}>
							Search
						</Button>
					</Flex>
				</Flex>

				{userProfile.length > 0 && (
					<Box overflowY='auto'>
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
								{userProfile
									.filter((user) => user.active === true)
									.map((user) => (
										<Tr key={user.id}>
											<Td>{user.profileType}</Td>
											<Td>{user.jobTitle}</Td>
											<Td>
												<Link
													href={`UserProfiles/UpdateUserProfile/${user.jobTitle}`}
												>
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
					</Box>
				)}
			</Container>
		</Center>
	);
};

export default UserProfiles;
