import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, statsResponse } from "../../types/api-types";


export const dashBoardApi = createApi({
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/dashboard/`}),
    endpoints:(builder)=>({
        stats:builder.query<statsResponse,string>({
            query:(id)=>`stats?id=${id}`,
            keepUnusedDataFor:0,
        }),
        pie:builder.query<PieResponse,string>({
            query:(id)=>`pie?id=${id}`,
            keepUnusedDataFor:0,

        }),
        bar:builder.query<BarResponse,string>({
            query:(id)=>`bar?id=${id}`,
            keepUnusedDataFor:0,

        }),
        line:builder.query<LineResponse,string>({
            query:(id)=>`line?id=${id}`,
            keepUnusedDataFor:0,

        }),
    })
})


export const{useStatsQuery,usePieQuery,useBarQuery,useLineQuery} = dashBoardApi