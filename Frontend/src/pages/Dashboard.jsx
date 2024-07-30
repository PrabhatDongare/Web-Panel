import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])


  return (
    <>
      <h1 className='bg-[#FFFF00] py-1' >Dashboard</h1>
      <div className=' flex justify-center items-center h-[80vh] text-4xl'>Welcome Admin Panel</div>
    </>
  )
}

export default Dashboard
