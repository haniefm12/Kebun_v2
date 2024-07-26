import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  endpoints: (builder) => ({
    getSignature: builder.query({
      query: () => "get-signature",
      providesTags: ["Signature"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `https://api.cloudinary.com/v1_1/kebunv2/auto/upload`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: ["Signature"], // Add this line
    }),
    doSomethingWithPhoto: builder.mutation({
      query: (photoData) => ({
        url: "do-something-with-photo",
        method: "POST",
        body: photoData,
      }),
      invalidatesTags: ["Signature"], // Add this line
    }),
  }),
});

export const {
  useGetSignatureQuery,
  useUploadImageMutation,
  useDoSomethingWithPhotoMutation,
} = api;
