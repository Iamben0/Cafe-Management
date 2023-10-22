import React from 'react';
import {
	Flex,
	Text,
	Center,
	Container,
	Heading,
	FormLabel,
} from '@chakra-ui/react';

const user = {
	userName: 'admin1',
	name: 'Robert Downey',
	email: 'ironman@gmail.com',
	profileType: 'System Admin',
	jobTitle: 'Senior System Admin',
};

// After login, will appear as localhost:3000/admin
const Admin = () => {
	return (
		<Center h='100vh' flexDirection='column' justifyContent='flex-start'>
			<Heading m='5'>User Profile</Heading>
			<Container
				maxW='container.sm'
				p='4'
				borderWidth='1px'
				borderRadius='lg'
				boxShadow='lg'
			>
				<Flex justifyContent='space-around' flexDir='column' align='center'>
					<FormLabel>User Name: {user.userName}</FormLabel>
					<FormLabel>Name:{user.name}</FormLabel>
					<FormLabel>Email: {user.email}</FormLabel>
					<FormLabel>Profile Type: {user.profileType}</FormLabel>
					<FormLabel>Job Title:{user.jobTitle}</FormLabel>
				</Flex>
			</Container>
		</Center>
	);
};

export default Admin;
