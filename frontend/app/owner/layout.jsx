import OwnerNavbar from '@/components/OwnerNavBar';

export default function Layout({ children }) {
	return (
		<>
			<OwnerNavbar />
			<main>{children}</main>
		</>
	);
}
