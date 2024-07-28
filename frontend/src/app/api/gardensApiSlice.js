import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { API_URLS } from "../../config/urls";

const gardensAdapter = createEntityAdapter({});

const initialState = gardensAdapter.getInitialState();

export const gardensApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGardens: builder.query({
      query: () => API_URLS.GARDEN,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedGardens = responseData.map((garden) => {
          garden.id = garden._id;
          return garden;
        });
        return gardensAdapter.setAll(initialState, loadedGardens);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Garden", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Garden", id })),
          ];
        } else return [{ type: "Garden", id: "LIST" }];
      },
    }),
    addNewGarden: builder.mutation({
      query: (initialGardenData) => ({
        url: API_URLS.GARDEN,
        method: "POST",
        body: {
          ...initialGardenData,
        },
      }),
      invalidatesTags: [{ type: "Garden", id: "LIST" }],
    }),
    updateGarden: builder.mutation({
      query: (initialGardenData) => ({
        url: API_URLS.GARDEN,
        method: "PATCH",
        body: {
          ...initialGardenData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Garden", id: arg.id }],
    }),
    deleteGarden: builder.mutation({
      query: ({ id }) => ({
        url: API_URLS.GARDEN,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Garden", id: arg.id }],
    }),
    addNewGardenNote: builder.mutation({
      query: (initialGardenData) => ({
        url: `/garden/${initialGardenData.id}/notes`,
        method: "POST",
        body: { ...initialGardenData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Garden", id: arg.id }],
    }),
  }),
});

export const {
  useGetGardensQuery,
  useAddNewGardenMutation,
  useUpdateGardenMutation,
  useDeleteGardenMutation,
  useAddNewGardenNoteMutation,
} = gardensApiSlice;

// returns the query result object
export const selectGardensResult =
  gardensApiSlice.endpoints.getGardens.select();

// creates memoized selector
const selectGardensData = createSelector(
  selectGardensResult,
  (gardensResult) => gardensResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllGardens,
  selectById: selectGardenById,
  selectIds: selectGardenIds,
  // Pass in a selector that returns the gardens slice of state
} = gardensAdapter.getSelectors(
  (state) => selectGardensData(state) ?? initialState
);
