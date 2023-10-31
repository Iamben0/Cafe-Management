// HOME PAGE

'use client';

import { useState, useEffect } from 'react';
import { Flex, Center, Container, Heading, FormLabel } from '@chakra-ui/react';

// after login, will appear as localhost:3000/staff
const Staff = () => {
	const [userAccount, setUserAccount] = useState([]);
	const username = localStorage.getItem('username');
	const [role, setRole] = useState('');
	const [staffId, setStaffId] = useState('');

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

	useEffect(() => {
		// filter the userAccount to find the user with matching username
		const user = userAccount.find((user) => user.username === username);

		if (user) {
			// if a matching user is found, extract the user's role
			setRole(user.role);
			setStaffId(user.id);
		}
	}, [userAccount, username]);

	localStorage.setItem('role', role);
	localStorage.setItem('staffId', staffId);

	return (
		<Center h='100vh' flexDirection='column' justifyContent='flex-start'>
			{userAccount
				.filter((user) => user.username === username)
				.map((user) => (
					<>
						<Heading m='5'>Hello, {user.username}</Heading>
						<Container
							maxW='container.sm'
							p='4'
							borderWidth='1px'
							borderRadius='lg'
							boxShadow='lg'
						>
							<Flex
								justifyContent='space-around'
								flexDir='column'
								align='center'
							>
								<FormLabel>User Name: {user.username}</FormLabel>
								<FormLabel>Name: {user.name}</FormLabel>
								<FormLabel>Email: {user.email}</FormLabel>
								<FormLabel>
									Profile Type: {user.userProfile.profileType}
								</FormLabel>
								<FormLabel>Job Title: {user.userProfile.jobTitle}</FormLabel>
							</Flex>
						</Container>
					</>
				))}
		</Center>
	);
};

export default Staff;
