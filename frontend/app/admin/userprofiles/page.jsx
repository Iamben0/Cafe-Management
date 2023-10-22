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
	const [responseMessage, setResponseMessage] = useState('');
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

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

	const handleSuspendProfile = async (userJobTitle) => {
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

		// After a successful response
		setUserProfile((prevUsers) =>
			prevUsers.filter((user) => user.jobTitle !== userJobTitle)
		);
	};

	const handleSearch = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/system-admin/view?jobTitle=${searchTerm}`
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

	// Filter the profiles based on the search term
	const filteredProfiles = userProfile.filter((user) =>
		user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
						{responseMessage && <Text color='green'>{responseMessage}</Text>}
						{error && <Text color='red'>{error}</Text>}
					</Flex>

					<Flex justifyContent='space-evenly' align='center' maxW='600'>
						<Input
							w='50'
							type='text'
							placeholder='Search by Job Title'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button ml='2' onClick={handleSearch}>
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
