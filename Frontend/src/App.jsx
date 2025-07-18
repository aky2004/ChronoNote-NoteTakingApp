import React, { useState, createContext, useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from './routes/ProtectedRoutes';

export const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => {
      const newTheme = curr === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
  <div className="App"> {/* Removed id={theme} here */}
  <BrowserRouter>
  <Toaster/>
  <Routes>
    <Route path='/' element={<ProtectedRoutes/>}>
        <Route index element={<Home/>}></Route>
    
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>
  
  </BrowserRouter>
  
  
  </div>
  </ThemeContext.Provider>
  )
}
