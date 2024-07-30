import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addEmployeeData } from '../redux/employee/employeeSlice';

const CreateEmployee = () => {
  const { register, handleSubmit, setError, clearErrors, reset, formState: { errors, isSubmitting } } = useForm()
  const [selectedCourse, setSelectedCourse] = useState("");
  const { addEmployeeDataLoading } = useSelector((state) => state.employee);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { name, email, mobile, designation, gender, img } = data
    if (!selectedCourse) {
      setError("course", { type: "manual", message: "* Select course" });
      return;
    }
    await dispatch(addEmployeeData({ name, email, mobile, designation, gender, course: selectedCourse, img: data.img[0] }))
    reset()
    setSelectedCourse("")
  }

  const handleCheckboxChange = (event) => {
    setSelectedCourse(event.target.value);
    clearErrors("course");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size / 1024;
      if (fileSize < 10 || fileSize > 5120) {
        setError("img", { type: "manual", message: "* Invalid file size (10KB - 5MB)" });
      } else if (fileType !== "image/jpeg" && fileType !== "image/png") {
        setError("img", { type: "manual", message: "* Only jpg/png files are allowed" });
      } else {
        clearErrors("img");
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <h1 className='bg-[#FFFF00] py-1' >Create Employee</h1>
      <div className=' w-[420px] mx-auto my-3' >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='bg-red-0 p-5 text-base flex flex-col gap-6' >
          {/* Name */}
          <div className='flex justify-between items-baseline'>
            <label>Name</label>
            <div>
              <input {...register("name", {
                required: { value: true, message: "* This field is required" },
                pattern: {
                  value: /^(?! )[A-Za-z]+(?: [A-Za-z]+)*$/,
                  message: "* invalid name"
                }
              })} className='rounded-md px-2 py-1 mb-2 bg-slate-200' />
              {errors.name && <span className='text-sm flex items-end text-red-500'>{errors.name.message}</span>}
            </div>
          </div>

          {/* Email */}
          <div className='flex justify-between items-baseline'>
            <label>Email</label>
            <div>
              <input {...register("email", {
                required: { value: true, message: "* This field is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "* invalid email"
                }
              })} className='rounded-md px-2 py-1 mb-2 bg-slate-200' />
              {errors.email && <span className='text-sm flex items-end text-red-500'>{errors.email.message}</span>}
            </div>
          </div>

          {/* Mobile Number */}
          <div className='flex justify-between items-baseline'>
            <label>Mobile No</label>
            <div>
              <input {...register("mobile", {
                required: { value: true, message: "* This field is required" },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "* invalid mobile no"
                }
              })} className='rounded-md px-2 py-1 mb-2 bg-slate-200' maxLength={10} />
              {errors.mobile && <span className='text-sm flex items-end text-red-500'>{errors.mobile.message}</span>}
            </div>
          </div>

          {/* Designation */}
          <div className='flex justify-between items-baseline'>
            <label>Designation</label>
            <div className='w-[195px]'>
              <select {...register("designation", {
                required: { value: true, message: "* Select designation" }
              })}
                className='rounded-md px-2 py-1 mb-2 bg-slate-200 w-full' >
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
              {errors.designation && <span className='text-sm flex items-end text-red-500'>{errors.designation.message}</span>}
            </div>
          </div>

          {/* Gender */}
          <div className='flex justify-between items-baseline'>
            <label >Gender</label>
            <div className='w-[195px]'>
              <div>
                <label className="inline-flex items-center mr-4">
                  <input type="radio" value="Male"
                    {...register("gender", { required: { value: true, message: "* Select gender" } })}
                    className="mr-1" /> M </label>

                <label className="inline-flex items-center mr-4">
                  <input type="radio" value="Female"
                    {...register("gender")}
                    className="mr-1" /> F </label>
              </div>
              {errors.gender && <span className='text-sm flex items-end text-red-500'>{errors.gender.message}</span>}
            </div>
          </div>

          {/* Course */}
          <div className='flex justify-between' >
            <label >Course</label>
            <div className=' w-[195px]'>
              <div className='flex justify-start' >
                <label className='mr-4' > <input type="checkbox" value="MCA" {...register("course")}
                  checked={selectedCourse === "MCA"} onChange={handleCheckboxChange} /> MCA</label>

                <label className='mr-4'> <input type="checkbox" value="BCA" {...register("course")}
                  checked={selectedCourse === "BCA"} onChange={handleCheckboxChange} /> BCA</label>

                <label className='mr-4'> <input type="checkbox" value="BSC" {...register("course")}
                  checked={selectedCourse === "BSC"} onChange={handleCheckboxChange} /> BSC</label>
              </div>
              {errors.course && <span className='text-sm flex items-end text-red-500'>{errors.course.message}</span>}
            </div>
          </div>

          {/* Image Upload */}
          <div className='flex justify-between' >
            <label >Img Upload</label>
            <div className=' w-[195px] text-sm'>
              <input type="file" accept=".jpg, .png" onChange={handleImageChange}
                {...register("img", { required: { value: true, message: "* Upload image" } })} 
                />
              {errors.img && <span className='text-sm flex items-end text-red-500'>{errors.img.message}</span>}
            </div>


          </div>

          {/* Submit */}
          <div className="flex justify-end" >
            {!addEmployeeDataLoading ?
              <input disabled={isSubmitting} type="submit" value='Submit' className='bg-green-500 w-[195px] text-white px-4 py-1 rounded-lg cursor-pointer mt-2' />
              :
              <p className='bg-green-500 w-[195px] text-white px-4 py-1 rounded-lg mt-2 '> <span className='animate-pulse flex justify-center'>O</span></p>
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateEmployee
