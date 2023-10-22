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
} from '@chakra-ui/react';

const UpdateUserProfile = () => {
	const [newJobTitle, setNewJobTitle] = useState('');

	// Retrieve the jobTitle from localStorage
	const jobTitle = localStorage.getItem('jobTitle');

	const handleUpdateProfile = () => {
		// Create a JSON object with the selected values and send it to the backend
		const updatedJobTitle = {
			jobTitle: newJobTitle, // The new job title value
		};

		// Make an API request to update the job title
		fetch(`http://localhost:8080/system-admin/update/${jobTitle}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedJobTitle),
		})
			.then((response) => {
				if (response.ok) {
					console.log('Job title updated successfully');
				} else {
					console.error('Failed to update job title');
				}
			})
			.catch((error) => {
				console.error('Error updating job title:', error);
			});

		// Clear the item from localStorage once it's no longer needed
		localStorage.removeItem('jobTitle');
	};

	const handleGoBack = () => {
		window.history.back(); // This will navigate back to the previous page in the browser's history.
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Heading as='h1' size='xl' mt={8} mb={4}>
					Update User Profile
				</Heading>
				<Box w='300px'>
					<FormControl mt={4}>
						<FormLabel>Job Title</FormLabel>
						<Input
							bg='white'
							color='black'
							type='text'
							value={newJobTitle}
							onChange={(e) => setNewJobTitle(e.target.value)}
							mb={4}
						/>
						<Flex>
							<Button colorScheme='blue' mr={4} onClick={handleUpdateProfile}>
								Update
							</Button>
							<Button colorScheme='red' onClick={handleGoBack}>
								Cancel
							</Button>
						</Flex>
					</FormControl>
				</Box>
			</Container>
		</Center>
	);
};

export default UpdateUserProfile;
