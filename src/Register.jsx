import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/register/', {
        username,
        password,
        email,
      });
      setMessage('User registered successfully');
    } catch (error) {
      console.log(error)
      setMessage('Error registering user');
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder="Username" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">Password</label>
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-white dark:text-gray-50">Register</button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">Don't have an account yet?
            <a rel="noopener noreferrer" href="/register" className="hover:underline dark:text-violet-600">Sign up</a>.
          </p>
        </div>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </Card>
  );
};

export default Register;
