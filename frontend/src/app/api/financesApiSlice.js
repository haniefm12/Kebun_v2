import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const financesAdapter = createEntityAdapter();

const initialState = financesAdapter.getInitialState();

export const financesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinances: builder.query({
      query: () => ({
        url: "/finances",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedFinances = responseData.map((finance) => {
          finance.id = finance._id;
          return finance;
        });
        return financesAdapter.setAll(initialState, loadedFinances);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Finance", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Finance", id })),
          ];
        } else return [{ type: "Finance", id: "LIST" }];
      },
    }),
    addNewFinance: builder.mutation({
      query: (initialFinance) => ({
        url: "/finances",
        method: "POST",
        body: {
          ...initialFinance,
        },
      }),
      invalidatesTags: [{ type: "Finance", id: "LIST" }],
    }),
    updateFinance: builder.mutation({
      query: (initialFinance) => ({
        url: "/finances",
        method: "PATCH",
        body: {
          ...initialFinance,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Finance", id: arg.id },
      ],
    }),
    deleteFinance: builder.mutation({
      query: ({ id }) => ({
        url: `/finances`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Finance", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetFinancesQuery,
  useAddNewFinanceMutation,
  useUpdateFinanceMutation,
  useDeleteFinanceMutation,
} = financesApiSlice;

// returns the query result object
export const selectFinancesResult =
  financesApiSlice.endpoints.getFinances.select();

// creates memoized selector
const selectFinancesData = createSelector(
  selectFinancesResult,
  (financesResult) => financesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllFinances,
  selectById: selectFinanceById,
  selectIds: selectFinanceIds,
  // Pass in a selector that returns the finances slice of state
} = financesAdapter.getSelectors(
  (state) => selectFinancesData(state) ?? initialState
);
