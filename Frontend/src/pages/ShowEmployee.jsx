import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEmployeeData, deleteEmployeeData, sortEmployeeList } from '../redux/employee/employeeSlice';

const ShowEmployee = () => {

  const { employeeList, employeeCount } = useSelector((state) => state.employee);
  const [search, setSearch] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const empPerPage = 3;

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCurrentPage(1)
  }
  const searchFilter = employeeList.filter(emp => {
    return search.toLowerCase() === "" ? emp :
      (emp.f_Id.toLowerCase().includes(search) ||
        emp.f_Name.toLowerCase().includes(search) ||
        emp.f_Email.toLowerCase().includes(search) ||
        emp.f_Designation.toLowerCase().includes(search) ||
        emp.f_gender.toLowerCase().includes(search) ||
        emp.f_Course.toLowerCase().includes(search))
  })

  const totalPages = Math.ceil(searchFilter.length / empPerPage);

  const indexOfLastEmp = currentPage * empPerPage;
  const indexOfFirstEmp = indexOfLastEmp - empPerPage;
  const currentEmpPage = employeeList.slice(indexOfFirstEmp, indexOfLastEmp);

  const fetchEmployees = async () => {
    await dispatch(fetchEmployeeData())
  }

  const handleEditEmployee = async (emp) => {
    navigate('/edit-employee', { state: { emp } });
  }

  const handleDeleteEmployee = async (f_Id) => {
    await dispatch(deleteEmployeeData({ f_Id }))
  }

  const handleSort = async (columnName) => {
    await dispatch(sortEmployeeList(columnName))
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    } else {
      fetchEmployees();
    }
  }, [])

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB');
  }

  return (
    <>
      <h1 className='bg-[#FFFF00] py-1' >Show Employee</h1>

      <div className='flex justify-end mx-16'>
        {employeeCount > 0 && <span className='mr-12 py-1' >Total Count: {employeeCount}</span>}
        <Link to='/create-employee' className='bg-green-400 px-5 py-1' >Create Employee</Link>
      </div>
      <hr />

      <div className='bg-blue-100 flex justify-end ' >
        <button className='hover:text-gray-500'>Search</button>
        <input type="text" onChange={handleSearch} className=' border border-black w-64 ml-10 text-center placeholder:text-black' placeholder='Enter Search Keyword' />
      </div>

      <div className='bg-violet-4000' >
        {!employeeList ?
          <div className='flex justify-center items-center h-[75vh] text-3xl ' >No employee data available</div> :
          <>
            <table className="employee-table w-full" >
              <thead className='bg-blue-100 '>
                <tr>
                  <th className='py-1' ><button onClick={() => handleSort("id")}>Unique Id</button></th>
                  <th className='py-1' >Image</th>
                  <th className='py-1' ><button onClick={() => handleSort("name")}>Name</button></th>
                  <th className='py-1' ><button onClick={() => handleSort("email")}>Email</button></th>
                  <th className='py-1' >Mobile No</th>
                  <th className='py-1' >Designation</th>
                  <th className='py-1' >Gender</th>
                  <th className='py-1' >Course</th>
                  <th className='py-1' ><button onClick={() => handleSort("date")}>Create date</button></th>
                  <th className='py-1' >Action</th>
                </tr>
              </thead>
              {/* <tbody>
                  {employeeList.filter(emp => {
                    return search.toLowerCase() === "" ? emp :
                      (emp.f_Id.toLowerCase().includes(search) ||
                        emp.f_Name.toLowerCase().includes(search) ||
                        emp.f_Email.toLowerCase().includes(search) ||
                        emp.f_Designation.toLowerCase().includes(search) ||
                        emp.f_gender.toLowerCase().includes(search) ||
                        emp.f_Course.toLowerCase().includes(search))
                  }).map(emp => (
                    <tr key={emp.f_Id}>
                      <td className='px-5 text-center' >{emp.f_Id}</td>
                      <td className='px-7 text-center flex justify-center' ><img className='bg-red-300 rounded-full my-3 w-14 h-14 object-cover' src={`http://localhost:3000/${emp.f_Image}`} alt="Employee img" width="50" height="50" /></td>
                      <td className='px-7 text-center' >{emp.f_Name}</td>
                      <td className='px-7 text-center' >{emp.f_Email}</td>
                      <td className='px-6 text-center' >{emp.f_Mobile}</td>
                      <td className='px-7 text-center' >{emp.f_Designation}</td>
                      <td className='px-6 text-center' >{emp.f_gender}</td>
                      <td className='px-5 text-center' >{emp.f_Course}</td>
                      <td className='px-7 text-center' >{formatDate(emp.f_Createdate)}</td>
                      <td className='px-7 text-center' ><button onClick={() => handleEditEmployee(emp)} >Edit</button> - <button onClick={() => handleDeleteEmployee(emp.f_Id)} >Delete</button></td>
                    </tr>
                  ))}
                </tbody> */}
              <tbody>
                {currentEmpPage.filter(emp => {
                  return search.toLowerCase() === "" ? emp :
                    (emp.f_Id.toLowerCase().includes(search) ||
                      emp.f_Name.toLowerCase().includes(search) ||
                      emp.f_Email.toLowerCase().includes(search) ||
                      emp.f_Designation.toLowerCase().includes(search) ||
                      emp.f_gender.toLowerCase().includes(search) ||
                      emp.f_Course.toLowerCase().includes(search))
                }).map(emp => (
                  <tr key={emp.f_Id}>
                    <td className='px-5 text-center' >{emp.f_Id}</td>
                    <td className='px-7 text-center flex justify-center' ><img className='bg-red-300 rounded-full my-3 w-14 h-14 object-cover' src={`http://localhost:3000/${emp.f_Image}`} alt="Employee img" width="50" height="50" /></td>
                    <td className='px-7 text-center' >{emp.f_Name}</td>
                    <td className='px-7 text-center' >{emp.f_Email}</td>
                    <td className='px-6 text-center' >{emp.f_Mobile}</td>
                    <td className='px-7 text-center' >{emp.f_Designation}</td>
                    <td className='px-6 text-center' >{emp.f_gender}</td>
                    <td className='px-5 text-center' >{emp.f_Course}</td>
                    <td className='px-7 text-center' >{formatDate(emp.f_Createdate)}</td>
                    <td className='px-7 text-center' ><button onClick={() => handleEditEmployee(emp)} >Edit</button> - <button onClick={() => handleDeleteEmployee(emp.f_Id)} >Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>}
      </div>

      {/* Pagination */}
      {employeeCount > 3 &&
        <div className=' flex gap-5 justify-center items-center mb-10 select-none' >
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className='text-3xl hover:shadow-xl rounded-full px-1 ring-[#414141] hover:ring-2' >&#11207;</button>
          <span className='text-xl' >{currentPage}</span>
          <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className='text-3xl hover:shadow-xl rounded-full px-1 ring-[#414141] hover:ring-2' >&#11208;</button>
        </div>}
    </>
  )
}

export default ShowEmployee
