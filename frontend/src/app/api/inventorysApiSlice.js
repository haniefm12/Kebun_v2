import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { API_URLS } from "../../config/urls";

const inventorysAdapter = createEntityAdapter();

const initialState = inventorysAdapter.getInitialState();

export const inventorysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventorys: builder.query({
      query: () => ({
        url: API_URLS.INVENTORY,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedInventorys = responseData.map((inventory) => {
          inventory.id = inventory._id;
          return inventory;
        });
        return inventorysAdapter.setAll(initialState, loadedInventorys);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Inventory", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Inventory", id })),
          ];
        } else return [{ type: "Inventory", id: "LIST" }];
      },
    }),
    addNewInventory: builder.mutation({
      query: (initialInventory) => ({
        url: API_URLS.INVENTORY,
        method: "POST",
        body: {
          ...initialInventory,
        },
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),
    updateInventory: builder.mutation({
      query: (initialInventory) => ({
        url: API_URLS.INVENTORY,
        method: "PATCH",
        body: {
          ...initialInventory,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Inventory", id: arg.id },
      ],
    }),
    deleteInventory: builder.mutation({
      query: ({ id }) => ({
        url: API_URLS.INVENTORY,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Inventory", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetInventorysQuery,
  useAddNewInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = inventorysApiSlice;

// returns the query result object
export const selectInventorysResult =
  inventorysApiSlice.endpoints.getInventorys.select();

// creates memoized selector
const selectInventorysData = createSelector(
  selectInventorysResult,
  (inventorysResult) => inventorysResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllInventorys,
  selectById: selectInventoryById,
  selectIds: selectInventoryIds,
  // Pass in a selector that returns the inventorys slice of state
} = inventorysAdapter.getSelectors(
  (state) => selectInventorysData(state) ?? initialState
);
