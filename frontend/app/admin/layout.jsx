import AdminNavbar from '@/components/AdminNavBar';

export default function Layout({ children }) {
	return (
		<>
			<AdminNavbar />
			<main>{children}</main>
		</>
	);
}
