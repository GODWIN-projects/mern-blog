import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser : null,
    error : null,
    loading : false
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers : {
            SigninStart : (state) => {
                state.loading = true,
                state.error = null
            },

            SigninSuccess : (state,action) =>{
                state.loading = false,
                state.error = null,
                state.currentUser = action.payload 
            },

            SigninFailure : (state,actiom) =>{
                state.loading = false,
                state.error = actiom.payload
            }
        }
    }
)


export const { SigninFailure, SigninStart, SigninSuccess} =  userSlice.actions 

export default userSlice.reducer

