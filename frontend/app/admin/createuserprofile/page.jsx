'use client';
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
	const [message, setMessage] = useState('');

	const handleCreateProfile = async () => {
		// Create a JSON object with the selected values and send it to the backend
		try {
			const userProfileData = {
				profileType,
				jobTitle,
			};

			// Send userProfileData to your backend controller via an API request
			const response = await fetch(
				'http://localhost:8080/api/system-admin/create/user-profile/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userProfileData),
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
			console.error('Error creating profile type', error);
		}
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
							<option value='staff'>staff</option>
							<option value='owner'>owner</option>
							<option value='manager'>manager</option>
							<option value='admin'>admin</option>
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

					<Button mt={4} onClick={handleCreateProfile}>
						Create User Profile
					</Button>
					<Text
						pt='2'
						pb='2'
						textAlign='center'
						color={
							message === 'User Profile created!' ? 'green.500' : 'red.500'
						}
					>
						{message}
					</Text>
				</Box>
			</Container>
		</Center>
	);
};

export default CreateUserProfile;
