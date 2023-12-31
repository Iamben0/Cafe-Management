'use client';
import Logout from '@/components/Logout/Logout';
import { Disclosure } from '@headlessui/react';

const navigation = [
	{ name: 'Home', href: '/admin', current: true },
	{
		name: 'Create User Profile',
		href: '/admin/CreateUserProfile',
		current: false,
	},
	{
		name: 'Create User Account',
		href: '/admin/CreateUserAccount',
		current: false,
	},
	{ name: 'View User Profiles', href: '/admin/UserProfiles', current: false },
	{ name: 'View User Accounts', href: '/admin/UserAccounts', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const AdminNavbar = () => {
	return (
		<Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'></div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<Logout />
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
};

export default AdminNavbar;
