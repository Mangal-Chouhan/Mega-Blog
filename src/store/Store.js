import { configureStore } from "@reduxjs/toolkit";
import authSlicice from "./authSlice";


const store = configureStore({

    reducer: {
        auth: authSlicice, 
    }
    
});

export default store;