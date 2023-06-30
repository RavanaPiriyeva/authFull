import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: true,
    error: {},
    email: null,
    token: null,
    succes: {},
    isLoggedIn: false,
}


//middleware
export const register = createAsyncThunk(
    "api/register",
    async (userData, { rejectWithValue }) => {
        try {
            let res = await axios.post('http://localhost:3000/api/webuser/register', userData);
            //  console.log("data email", res.data.email)
            return res.data.email;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const confrim = createAsyncThunk(
    "api/confrim ",
    async (userData, { rejectWithValue }) => {
        try {
            let res = await axios.post('http://localhost:3000/api/webuser/confirm', userData);
            //  console.log("data", res.data)
            localStorage.setItem('token', res.data.token);
            return res.data.token;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const getToken = createAsyncThunk(
    "api/token ",
    async (userData, { rejectWithValue }) => {
        try {
            let res = await axios.post('http://localhost:3000/api/webuser/token', userData);
            //  localStorage.setItem('token',token);
            //  console.log(res.data)
            return res.data;
        } catch (error) {
            // console.log(error)
            return rejectWithValue(error);
        }
    }
);
export const logout = createAsyncThunk(
    "api/logout", async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
            return true;
        } catch (error) {
            return rejectWithValue(error);
        }
    });


export const login = createAsyncThunk(
    "api/login ",
    async (userData, { rejectWithValue }) => {
        try {
            let res = await axios.post('http://localhost:3000/api/webuser/login', userData);
            //  localStorage.setItem('token',token);
            // console.log("login",res.data)
            if (res.data.email) {
                return res.data.email
            }
            else if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                return res.data;
            }

            //console.log("fgggggg",res.data)

        } catch (error) {
            //  console.log(error)
            //console.log("fgggggghhh",error)

            throw error;  
            return rejectWithValue(error);
  
        }
    }
);
const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    extraReducers: {
        [register.pending]: (state) => {
            state.loading = true
            state.email = null
            state.error = null
        },
        [register.rejected]: (state, { payload }) => {
            state.loading = false
            state.email = null
            state.error = payload;
        },
        [register.fulfilled]: (state, { payload }) => {
            state.email = payload;
            state.loading = false
            state.error = null
        },
        [confrim.pending]: (state) => {
            state.loading = true
            state.token = null
            state.error = null
        },
        [confrim.rejected]: (state, { payload }) => {
            state.loading = false
            state.token = null
            state.error = payload;
        },
        [confrim.fulfilled]: (state, { payload }) => {
            state.token = payload;
            state.loading = false
            state.error = null
        },
        [getToken.pending]: (state) => {
            state.loading = true
            state.succes = {}
            state.error = null
        },
        [getToken.rejected]: (state, { payload }) => {
            state.loading = false
            state.succes = {}
            state.error = payload;
        },
        [getToken.fulfilled]: (state, { payload }) => {
            state.succes = payload;
            state.loading = false
            state.error = null
            state.isLoggedIn = true;
        },
        [logout.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [logout.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [logout.fulfilled]: (state) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.error = null;
            state.email = null;
            state.token = null;


        },
        [login.pending]: (state) => {
            state.loading = true;
            state.email = null;
            state.error = null;
        },
        [login.rejected]: (state, { payload }) => {
            state.loading = false;
            state.email = null;
            state.error = payload.response.data.message;
        },
        [login.fulfilled]: (state, { payload }) => {
            if (typeof payload === 'string') {
                state.email = payload;
            } else if (typeof payload === 'object' && payload.hasOwnProperty('token')) {
                state.token = payload.token;
            }
            state.loading = false;
            state.error = null;
        },


    }
})


export default userSlice.reducer