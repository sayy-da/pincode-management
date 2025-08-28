import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
        count:0,
        username:null,
        email:null,
        role:'user',
        auth:false,
        id:null,
        lastname:null,
        token:null
    },
    reducers:{
        loggin:(state,action)=>{
            console.log(action.payload.username,'safa')
            state.username = action.payload.user.name
            state.email = action.payload.user.email
            state.role = action.payload.user.role
            state.id = action.payload.user._id
            state.auth = true
            state.lastname = action.payload.user.lastname
            state.token = action.payload.token
        },
        logout:(state,action)=>{
            state.username = null
            state.email=null
            state.auth = false
            state.id = null
            state.lastname = null
        } 
    }
})

export const {loggin,logout,inc,dec} =userSlice.actions
export default userSlice.reducer