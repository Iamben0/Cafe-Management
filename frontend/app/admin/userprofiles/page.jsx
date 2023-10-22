'use client';

import React, { useEffect, useState } from 'react';
import {
	Center,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Container,
	Heading,
	Button,
	Flex,
	Text,
} from '@chakra-ui/react';

const UserProfiles = () => {
	const [userProfile, setUserProfile] = useState([]);
	const [responseMessage, setResponseMessage] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'http://localhost:8080/system-admin/view/'
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
		fetchData();
	}, []);

	const handleSuspendUser = async (userJobTitle) => {
		try {
			const response = await fetch(
				`http://localhost:8080/system-admin/suspend/${userJobTitle}`,
				{
					method: 'DELETE', // Assuming you're using HTTP DELETE for suspension
				}
			);

			if (response.ok) {
				setResponseMessage('Profile Suspended!');
				setError(null);
			} else {
				setResponseMessage(null);
				setError('Profile not found');
			}
		} catch (error) {
			console.error('Error suspending user', error);
		}

		// after a successful response
		setUserProfile((prevUsers) =>
			prevUsers.filter((user) => user.jobTitle !== userJobTitle)
		);
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between'>
					<Heading as='h1' size='xl' mt={8} mb={4}>
						User Profiles
					</Heading>
					{responseMessage && <Text color='green'>{responseMessage}</Text>}
					{error && <Text color='red'>{error}</Text>}
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
										<Button
											size='sm'
										>
											Update
										</Button>
									</Td>
									<Td>
										<Button
											size='sm'
											colorScheme='red'
											onClick={() => handleSuspendUser(user.jobTitle)}
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
