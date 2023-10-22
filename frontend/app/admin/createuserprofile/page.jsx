'use client';
import React from 'react';
import {
	Center,
	Container,
	Heading,
	Box,
	Button,
	FormControl,
	FormLabel,
	Select,
	Input,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';

const CreateUserProfile = () => {
	const [profileType, setProfileType] = useState(''); // To store the selected profile type
	const [jobTitle, setJobTitle] = useState(''); // To store the job title input
	const [responseMessage, setResponseMessage] = useState('');
	const [error, setError] = useState(null);

	const handleSubmit = () => {
		// Create a JSON object with the selected values and send it to the backend
		const userProfileData = {
			profileType,
			jobTitle,
		};

		// Send userProfileData to your backend controller via an API request
		fetch('http://localhost:8080/system-admin/create/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userProfileData),
		})
			.then((response) => {
				if (response.ok) {
					setResponseMessage('Profile type created!');
					setError(null);
				} else {
					setResponseMessage(null);
					setError('Profile type already existed');
				}
			})
			.catch((error) => {
				console.error('Error creating profile type', error);
			});
	};

	return (
		<Center>
			<Container maxW='container.xl'>
				<Heading as='h1' size='xl' mt={8} mb={4}>
					Create User Profile
				</Heading>
				<Box w='300px'>
					<FormControl mt={4}>
						<FormLabel>Profile Type</FormLabel>
						<Select
							value={profileType}
							placeholder='Select Profile Type'
							bg='white'
							color='black'
							onChange={(e) => setProfileType(e.target.value)}
						>
							<option value='Staff'>Staff</option>
							<option value='Owner'>Owner</option>
							<option value='Manager'>Manager</option>
							<option value='System Admin'>System Admin</option>
						</Select>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Job Title</FormLabel>
						<Input
							placeholder='Job Ttile'
							bg='white'
							color='black'
							type='text'
							value={jobTitle}
							onChange={(e) => setJobTitle(e.target.value)}
						/>
					</FormControl>

					<Button mt={4} onClick={handleSubmit}>
						Create User Profile
					</Button>
					{responseMessage && <Text color='green'>{responseMessage}</Text>}
					{error && <Text color='red'>{error}</Text>}
				</Box>
			</Container>
		</Center>
	);
};

export default CreateUserProfile;
