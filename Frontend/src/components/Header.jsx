import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { emptyFrontendEmployeeData } from '../redux/employee/employeeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    await dispatch(emptyFrontendEmployeeData())
    navigate('/login')
    toast.success(`Logout Successfully`)
  }

  return (
    <>
      <h1 className='text-2xl mb-1' >Logo</h1>
      { localStorage.getItem('token') && 
        <div className='bg-slate-500 flex justify-between px-16 py-2 text-lg text-white select-none' >
          <ul className='flex gap-16' >
            <li><Link to='/' >Home</Link></li>
            <li><Link to='/show-employee' >Employee List</Link></li>
          </ul>

          <div className='select-none' >
            <span>{localStorage.getItem('userName')}</span>
            <span className='mr-24' > -</span>
            <button onClick={handleLogout} >Logout</button>
          </div>
        </div>
      }
    </>
  )
}

export default Header
