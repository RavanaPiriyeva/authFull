import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: true,
    error: {},
    email: {},
    token:{},
    succes:{},
}


//middleware
export const register = createAsyncThunk(
    "api/register",
    async (userData, { rejectWithValue }) => {
        try {
            let res = await axios.post('http://localhost:3000/api/webuser/register', userData);
            console.log("data", res.data.email)
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
            console.log("data", res.data)
         //   localStorage.setItem('token', res.data.token);
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
            console.log("data", res.data)
           localStorage.setItem('token', res.data.token);
            return res.data;
        } catch (error) {
            console.log(error)
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
            state.email = {}
            state.error = null
        },
        [register.rejected]: (state, { payload }) => {
            state.loading = false
            state.email = {}
            state.error = payload;
        },
        [register.fulfilled]: (state, { payload }) => {
            state.email = payload;
            state.loading = false
            state.error = null
        },
        [confrim.pending]: (state) => {
            state.loading = true
            state.token = {}
            state.error = null
        },
        [confrim.rejected]: (state, { payload }) => {
            state.loading = false
            state.token = {}
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
        },


    }
})


export default userSlice.reducer