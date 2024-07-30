import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
      <>
        <div className="flex flex-col min-h-screen justify-center items-center">
          <div className="text-7xl pb-4">404</div>
          <div className="text-3xl ">Page Not Found</div>
          <Link to="/" className="bg-black text-white py-3 px-8 my-8 rounded-full hover:bg-[#2c2c2c] transition-all ease-in-out duration-200">Return to Dashboard</Link>
        </div>
      </>
    )
  }
  
  export default ErrorPage