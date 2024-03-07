import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  credentials: 'include',
  // credentials: "same-origin",
  mode: 'cors',
  // headers: { "Content-Type": "application/json" },
});

export const apiSlice = createApi({
  // reducerPath:"travelApi",
  // reducerPath: 'apiOne',
  baseQuery,
  tagTypes: ['User'],
  //@ts-ignore
  endpoints: (builder) => ({}),
});
