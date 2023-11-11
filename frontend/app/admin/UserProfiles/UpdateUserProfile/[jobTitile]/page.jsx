'use client';

import { useState } from 'react';

import {
	Box,
	Heading,
	Input,
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Flex,
	Text,
} from '@chakra-ui/react';

const UpdateUserProfile = () => {
	const [newJobTitle, setNewJobTitle] = useState('');
	const [message, setMessage] = useState('');

	// Retrieve the jobTitle from localStorage
	const jobTitle = localStorage.getItem('oldJobTitle');

	const handleUpdateProfile = async () => {
		// Create a JSON object with the selected values and send it to the backend
		try {
			const updatedJobTitle = {
				newJobTitle: newJobTitle, // The new job title value
			};

			// Make an API request to update the job title
			const response = await fetch(
				`http://localhost:8080/api/system-admin/update/user-profile/${jobTitle}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedJobTitle),
				}
			);
			if (response.ok) {
				console.log('Job title updated successfully');
				const msg = await response.text();
				setMessage(msg);
			} else {
				const msg = await response.text();
				setMessage(msg);
			}
		} catch (error) {
			console.error('Error updating job title:', error);
		}
	};

	const handleGoBack = () => {
		window.history.back(); // This will navigate back to the previous page in the browser's history.
		localStorage.removeItem('oldJobTitle');
	};

	return (
		<Center>
			<Container maxW="container.xl">
				<Heading as="h1" size="xl" mt={8} mb={4}>
					Update User Profile
				</Heading>
				<Box w="300px">
					<FormControl mt={4}>
						<FormLabel>Job Title</FormLabel>
						<Input
							bg="white"
							color="black"
							type="text"
							value={newJobTitle}
							onChange={(e) => setNewJobTitle(e.target.value)}
							mb={4}
						/>
						<Flex>
							<Button colorScheme="blue" mr={4} onClick={handleUpdateProfile}>
								Update
							</Button>
							<Button colorScheme="red" onClick={handleGoBack}>
								Cancel
							</Button>
						</Flex>
						<Text
							pt="2"
							pb="2"
							textAlign="center"
							color={message === 'Profile Updated!' ? 'green.500' : 'red.500'}
						>
							{message}
						</Text>
					</FormControl>
				</Box>
			</Container>
		</Center>
	);
};

export default UpdateUserProfile;
