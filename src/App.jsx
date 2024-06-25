import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Register from './Register';
import Login from './Login';
import Greeting from './Greeting';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  const [activeTab, setActiveTab] = useState('register');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const backgroundColor = 'bg-teal-400';
  return (
    <>
    <Router>
      <div className={`App ${backgroundColor} min-h-screen overflow-x-hidden flex flex-col`}>
        <header className="App-header">
          <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800">
            <Link to="/register" className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600 ${activeTab === 'register' ? 'border-violet-600' : ''}`} onClick={() => handleTabChange('register')}>Register</Link>
            <Link to="/login" className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600 ${activeTab === 'login' ? 'border-violet-600' : ''}`} onClick={() => handleTabChange('login')}>Login</Link>
          </div>
        </header>

        <div className="flex-grow flex justify-center items-center">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/greeting" element={<Greeting />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
