import StaffNavbar from '@/components/StaffNavbar';

export default function Layout({ children }) {
	return (
		<>
			<StaffNavbar />
			<main>{children}</main>
		</>
	);
}
