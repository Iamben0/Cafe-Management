'use client';
import Login from '@/components/Login';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Home = () => {
	const username = localStorage.getItem('username');
	const profileType = localStorage.getItem('profileType');

	const router = useRouter();

	if (username !== null) {
		if (profileType === 'admin') {
			router.push('/admin');
		} else if (profileType === 'manager') {
			router.push('/manager');
		} else if (profileType === 'owner') {
			router.push('/owner');
		} else if (profileType === 'staff') {
			router.push('/staff');
		}
	}

	const Login = dynamic(() => import('@/components/Login'));

	return <Login />;
};

export default Home;
