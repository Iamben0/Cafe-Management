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
	TableCaption,
	Container,
	Heading,
} from '@chakra-ui/react';

const UserProfiles = () => {
	const [userProfile, setUserProfile] = useState([]);

	// fetch API from backend
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

	return (
		<Center>
			<Container maxW='container.xl'>
				<Heading as='h1' size='xl' mt={8} mb={4}>
					User Profiles
				</Heading>
				{userProfile.length > 0 && (
					<Table variant='simple'>
						<Thead>
							<Tr>
								<Th color='white'>ID</Th>
								<Th color='white'>Profile Type</Th>
								<Th color='white'>Job Title</Th>
							</Tr>
						</Thead>
						<Tbody>
							{userProfile.map((user) => (
								<Tr key={user.id}>
									<Td>{user.id}</Td>
									<Td>{user.profileType}</Td>
									<Td>{user.jobTitle}</Td>
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
