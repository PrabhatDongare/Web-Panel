import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:3000/";
// Add Employee Data
export const addEmployeeData = createAsyncThunk("addEmployeeData", async ({ name, email, mobile, designation, gender, course, img }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'authToken': localStorage.getItem('token'),
        };

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course);
        formData.append('img', img);

        const response = await axios.post(`${baseUrl}api/employee/add`, formData, { headers });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete Employee Data
export const deleteEmployeeData = createAsyncThunk("deleteEmployeeData", async ({ f_Id }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.delete(`${baseUrl}api/employee/delete/${f_Id}`, { headers });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get Employee Data
export const fetchEmployeeData = createAsyncThunk("fetchEmployeeData", async (_, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/employee/get`, {}, { headers });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Edit Employee Data
export const editEmployeeData = createAsyncThunk("editEmployeeData", async ({ f_Id, name, email, mobile, designation, gender, course, img, prevImg }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'authToken': localStorage.getItem('token'),
        };

        const formData = new FormData();
        formData.append('f_Id', f_Id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course);
        formData.append('img', img);
        formData.append('prevImg', prevImg);

        const response = await axios.put(`${baseUrl}api/employee/edit`, formData, { headers });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employeeList: [],
        employeeCount: 0,
        addEmployeeDataLoading: false,
        fetchEmployeeDataLoading: false,
        editEmployeeDataLoading: false,
    },
    reducers: {
        emptyFrontendEmployeeData: (state) => {
            state.employeeList = []
            state.employeeCount = 0
        },

        sortEmployeeList: (state, action) => {
            if (action.payload === "id") {
                state.employeeList = state.employeeList.sort((a, b) => a.f_Id.localeCompare(b.f_Id))
            } else if (action.payload === "name") {
                state.employeeList = state.employeeList.sort((a, b) => a.f_Name.localeCompare(b.f_Name))
            }
            else if (action.payload === "email") {
                state.employeeList = state.employeeList.sort((a, b) => a.f_Email.localeCompare(b.f_Email))
            }
            else if (action.payload === "date") {
                state.employeeList = state.employeeList.sort((a, b) => a.f_Createdate.localeCompare(b.f_Createdate))
            }
        },
    },

    extraReducers: (builder) => {
        builder
            // Add Extra Reducer
            .addCase(addEmployeeData.pending, (state) => {
                state.addEmployeeDataLoading = true;
            })
            .addCase(addEmployeeData.fulfilled, (state, action) => {
                state.addEmployeeDataLoading = false;
                const { success, newEmployee, message } = action.payload
                if (success) {
                    console.log(typeof(state.employeeList), "Checking emp list at redux before adding at frontend?")
                    state.employeeList = [
                        ...state.employeeList,
                        {
                            "_id": newEmployee._id,
                            "f_Id": newEmployee.f_Id,
                            "f_Image": newEmployee.f_Image,
                            "f_Name": newEmployee.f_Name,
                            "f_Email": newEmployee.f_Email,
                            "f_Mobile": newEmployee.f_Mobile,
                            "f_Designation": newEmployee.f_Designation,
                            "f_gender": newEmployee.f_gender,
                            "f_Course": newEmployee.f_Course,
                            "f_Createdate": newEmployee.f_Createdate
                        }
                    ];
                    state.employeeCount += 1
                    toast.success(message)
                    console.log(typeof(state.employeeList), "Checking emp list at redux?")
                }
            })
            .addCase(addEmployeeData.rejected, (state, action) => {
                state.addEmployeeDataLoading = false;
                toast.error(action.payload)
            })

            // Delete Extra Reducer
            .addCase(deleteEmployeeData.fulfilled, (state, action) => {
                const { success, f_Id, message } = action.payload
                if (success) {
                    toast.success(message)
                    state.employeeList = state.employeeList.filter(emp => emp.f_Id != f_Id)
                    state.employeeCount -= 1
                }
            })
            .addCase(deleteEmployeeData.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // Fetch Extra Reducer
            .addCase(fetchEmployeeData.pending, (state) => {
                state.fetchEmployeeDataLoading = true;
            })
            .addCase(fetchEmployeeData.fulfilled, (state, action) => {
                state.fetchEmployeeDataLoading = false;
                const { success, employees } = action.payload
                if (success) {
                    state.employeeList = employees.map(emp => {
                        return {
                            "_id": emp._id,
                            "f_Id": emp.f_Id,
                            "f_Image": emp.f_Image,
                            "f_Name": emp.f_Name,
                            "f_Email": emp.f_Email,
                            "f_Mobile": emp.f_Mobile,
                            "f_Designation": emp.f_Designation,
                            "f_gender": emp.f_gender,
                            "f_Course": emp.f_Course,
                            "f_Createdate": emp.f_Createdate
                        }
                    })

                    state.employeeCount = state.employeeList.length
                }
            })
            .addCase(fetchEmployeeData.rejected, (state) => {
                state.fetchEmployeeDataLoading = false;
            })

            // Edit Extra Reducer
            .addCase(editEmployeeData.pending, (state) => {
                state.editEmployeeDataLoading = true;
            })
            .addCase(editEmployeeData.fulfilled, (state, action) => {
                state.editEmployeeDataLoading = false;
                const { success, updatedEmployee, message } = action.payload;
                if (success) {
                    const index = state.employeeList.findIndex(emp => emp.f_Id === updatedEmployee.f_Id);
                    if (index !== -1) {
                        state.employeeList[index] = {
                            ...state.employeeList[index],
                            f_Image: updatedEmployee.f_Image,
                            f_Name: updatedEmployee.f_Name,
                            f_Email: updatedEmployee.f_Email,
                            f_Mobile: updatedEmployee.f_Mobile,
                            f_Designation: updatedEmployee.f_Designation,
                            f_gender: updatedEmployee.f_gender,
                            f_Course: updatedEmployee.f_Course,
                        };
                    }
                    toast.success(message);
                }
            })

            .addCase(editEmployeeData.rejected, (state, action) => {
                state.editEmployeeDataLoading = false;
                toast.error(action.payload)
            })
    },
})

export const { emptyFrontendEmployeeData, sortEmployeeList } = employeeSlice.actions
export default employeeSlice.reducer



