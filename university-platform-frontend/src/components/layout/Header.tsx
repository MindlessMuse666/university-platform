import Link from 'next/link';
import { useAuth } from '../../lib/hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold text-primary-dark">UniPlatform</a>
        </Link>
        
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/dashboard">
                <a className="hover:text-primary">Dashboard</a>
              </Link>
              <button 
                onClick={logout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <a className="hover:text-primary">Login</a>
              </Link>
              <Link href="/auth/register">
                <a className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                  Sign Up
                </a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;