
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserAuth } from '@/src/context/UserAuthContext';
import { Logo } from '@/src/components/icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useUserAuth();

  const from = router.query.from || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      router.replace(from as string);
    } else {
      setError('Invalid email or password.');
      setPassword('');
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col">
        <header className="bg-gray-900 shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" aria-label="Back to homepage">
                    <Logo />
                </Link>
                <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-colors duration-300">
                    &larr; Back to Site
                </Link>
            </nav>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Customer Login</h2>
                    <p className="mt-2 text-gray-400">Welcome back! Sign in to your account.</p>
                </div>
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm rounded-md"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none block w-full px-3 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm rounded-md"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 transition-all duration-300"
                        >
                        Sign in
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-amber-500 hover:text-amber-400">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    </div>
  );
};

export default LoginPage;
