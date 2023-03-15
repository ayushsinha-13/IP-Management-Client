import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080';

export const api = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : baseURI}),
    endpoints : builder => ({
        // get ip
        getIp : builder.query({
            // get: 'http://localhost:8080/api/categories'
            query: () => '/api/ip',
            providesTags: ['ip']
        }),

        // post Ip
        postIp : builder.mutation({
            query: () => ({
                url: 'api/ip',
                method: 'POST'
            })
        }),

        // update Ip
        updateIp: builder.mutation({
            query : recordId => ({
                // update: 'http://localhost:8080/api/ip'
                url : '/api/ip',
                method : "UPDATE",
                body : recordId
            }),
        }),


        // delete record
        deleteTransaction : builder.mutation({
            query : recordId => ({
                // delete: 'http://localhost:8080/api/ip'
                url : '/api/ip',
                method : "DELETE",
                body : recordId
            }),
            invalidatesTags: ['ip']
        })

    })
})

export default api;