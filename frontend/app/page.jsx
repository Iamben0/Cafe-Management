'use client';
import Login from '@/components/Login';

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<Login />
			{<Admin />}
		</section>
	);
};

export default Home;
