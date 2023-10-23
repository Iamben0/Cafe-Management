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

const UserProfiles = () => {
	const [userProfile, setUserProfile] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		const viewProfile = async () => {
			try {
				const response = await fetch(
					'http://localhost:8080/api/system-admin/view/'
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
		viewProfile();
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

					<Flex justifyContent='space-evenly' align='center' maxW='600'>
						<Input
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

				{userProfile.length > 0 && (
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
							{userProfile.map((user) => (
								<Tr key={user.id}>
									<Td>{user.profileType}</Td>
									<Td>{user.jobTitle}</Td>
									<Td>
										<Link href={`userprofiles/update/${user.jobTitle}`}>
											<Button
												size='sm'
												onClick={() =>
													localStorage.setItem('jobTitle', user.jobTitle)
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

export default UserProfiles;
