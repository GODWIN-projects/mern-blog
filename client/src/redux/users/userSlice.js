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
            },
            updateStart : (state) => {
                state.loading = true,
                state.error = false
            },
            updateSuccess : (state,action) => {
                state.loading = false,
                state.error = false,
                state.currentUser = action.payload
            },
            updateFailure : (state,action) =>{
                state.loading = false,
                state.error = action.payload
            }
        }
    }
)


export const { SigninFailure,
                SigninStart,
                SigninSuccess,
                updateFailure,
                updateStart,
                updateSuccess} =  userSlice.actions 

export default userSlice.reducer

