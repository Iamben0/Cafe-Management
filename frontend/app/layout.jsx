import './globals.css';

export const metadata = {
	title: 'Cafe Management System',
	description: 'Cafe Management System for System Admin/Owner/Manager/Staff',
};

const RootLayout = ({ children }) => {
	return (
		<html lang='en'>
			{/* Navbar here */}
			<body>{children}</body>
			{/* Footer here */}
		</html>
	);
};

export default RootLayout;
