import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const { userName, password } = data
      const response = await axios.post('http://localhost:3000/api/user/login', { userName, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.authToken)
        localStorage.setItem('userName', response.data.userName)
        navigate('/')
        toast.success("Login Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <h1 className='bg-[#FFFF00] py-1' >Login Page</h1>
      <div className='flex justify-center items-center h-[80vh]'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='bg-red-0 p-5 w-[420px] text-xl flex flex-col gap-6' >
          {/* User Name */}
          <div className='flex justify-between items-baseline'>
            <label>User Name</label>
            <div>
              <input {...register("userName", {
                required: { value: true, message: "* This field is required" },
                pattern: {
                  value: /^(?! )[A-Za-z]+(?: [A-Za-z]+)*$/,
                  message: "* invalid user name"
                }
              })} className='rounded-md px-2 py-1 mb-2 bg-slate-200' />
              {errors.userName && <span className='text-sm flex items-end text-red-500'>{errors.userName.message}</span>}
            </div>
          </div>

          {/* Password */}
          <div className='flex justify-between items-baseline' >
            <label>Password</label>
            <div>
              <input type="password"  {...register("password", {
                required: { value: true, message: "* This field is required" }
              })} className='rounded-md px-2 py-1 mb-2 bg-slate-200' />
              {errors.password && <span className='text-sm flex items-end text-red-500'>{errors.password.message}</span>}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end" >
          <input disabled={isSubmitting} type="submit" value='Login' className='bg-green-500 w-60 text-white px-4 py-1 rounded-lg cursor-pointer mt-2' />
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
