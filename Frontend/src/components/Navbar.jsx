import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndPoint'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/AuthSlice'
import { ThemeContext } from '../App';
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      const request = await post('/auth/logout');
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };
  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container-fluid p-2 d-flex justify-content-between align-items-center">
        <h1 className='navbar-brand fs-4 fw-bold mb-0 text-primary'>NoteHub</h1>
        <div className='d-flex align-items-center'>
          <button type="button" className="btn btn-secondary me-2" onClick={toggleTheme}>
            {theme === 'light' ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
          </button>
          <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
