import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
	title: 'Cafe Management System',
	description: 'Cafe Management System for System Admin/Owner/Manager/Staff',
};

const RootLayout = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
