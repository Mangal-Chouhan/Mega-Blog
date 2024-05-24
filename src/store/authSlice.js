import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    status: false,
    userData: null

}

const authSlicice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        login: (state , action ) => {
            state.status = true;
            state.userData = action.payload.userData 
        },

        logout: (state,action) => {
            state.status = false;
            state.userData = null;
        }
    }

  

})


export const {login,logout} = createSlice;
export default authSlicice;