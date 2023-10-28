import ManagerNavbar from '@/components/ManagerNavbar';

export default function Layout({ children }) {
	return (
		<>
			<ManagerNavbar />
			<main>{children}</main>
		</>
	);
}
