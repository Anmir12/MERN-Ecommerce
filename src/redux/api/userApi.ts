import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { DeleteUserRequest, allUsersResponse, messageResponse, singleUserResponse, userResponse } from "../../types/api-types";
import axios from "axios";


export const userApi = createApi({
    reducerPath:"userApi" ,
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`}),
    tagTypes:["users"],
    endpoints:(builder)=>({
        login:builder.mutation<messageResponse,User>({
            query:(user)=>({
                url:"new",
                method:"POST",
                body:user
            }),
            invalidatesTags:["users"]
        }),
        deleteUser:builder.mutation<messageResponse,DeleteUserRequest>({
            query:({userId,adminId})=>({
                url:`${userId}?id=${adminId}`,
                method:"DELETE",
            }),
            invalidatesTags:["users"]
        }),
        allUsers:builder.query<allUsersResponse,string>({
            query:(id)=> `all?id=${id}`,
            providesTags:["users"]
        }),
        userDetails:builder.query<singleUserResponse,string>({
            query:(id)=>id,
            providesTags:["users"]
        })
    })
})

export const getUser = async(id:string)=>{
   try {
       
       const {data}:{ data:userResponse} = await axios.get( `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);

      return data;

   } catch (error) {
    throw error;
   }
}
export const {useLoginMutation,useAllUsersQuery,useDeleteUserMutation,useUserDetailsQuery} =userApi;