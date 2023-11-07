const Logout = () => {
  const handleLogout = () => {
    localStorage.clear();
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <a
      onClick={handleLogout}
      href="/"
      className={classNames(
        true
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover-bg-gray-700 hover-text-white',
        'rounded-md px-3 py-2 text-sm font-medium'
      )}
    >
      Log Out
    </a>
  );
};

export default Logout;
