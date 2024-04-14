import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";

 const initialState:userReducerInitialState = {
    user:null,
    isLoading:true
 };
export const userReducer = createSlice({
    name:"userReducer",
    initialState,
    reducers:{
     isUserExist:(state,action:PayloadAction<User>)=>{
      state.isLoading = false,
      state.user = action.payload
     },
    isUserNotExist:(state)=>{
       state.isLoading = false,
       state.user = null
    }
    }
})

export const {isUserExist,isUserNotExist} = userReducer.actions;