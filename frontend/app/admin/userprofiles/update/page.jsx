import { useState } from 'react';

const UpdateProfile = () => {
	const [newJobTitle, setNewJobTitle] = useState('');

	const handleUpdate = () => {
		// Create the request body
		const requestBody = {
			jobTitle: newJobTitle, // The new job title value
		};

		// Make an API request to update the job title
		fetch(`http://localhost:8080/update-job-title`, {
			method: 'PUT',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		})
			.then((response) => {
				if (response.ok) {
					// Handle a successful response (e.g., show a success message)
					console.log('Job title updated successfully');
				} else {
					// Handle errors (e.g., show an error message)
					console.error('Failed to update job title');
				}
			})
			.catch((error) => {
				// Handle network or other errors
				console.error('Error updating job title:', error);
			});
	};
	return (
		<div>
			<h1>Update Job Title</h1>
			<input
				type='text'
				value={newJobTitle}
				onChange={(e) => setNewJobTitle(e.target.value)}
			/>
			<button onClick={handleUpdate}>Update</button>
		</div>
	);
};

export default UpdateProfile;
