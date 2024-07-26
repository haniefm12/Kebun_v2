// api.js
import { useGetGardensQuery } from "./gardensApiSlice";
import { useGetFinancesQuery } from "./financesApiSlice";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetInventorysQuery } from "./inventorysApiSlice";
import { useGetUsersQuery } from "./usersApiSlice";

export const useGardens = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetGardensQuery(
    "gardenList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  return { data, isSuccess, isLoading, isError, error };
};

export const useFinances = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetFinancesQuery(
    "financeList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  return { data, isSuccess, isLoading, isError, error };
};

export const useNotes = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetNotesQuery(
    "noteList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  return { data, isSuccess, isLoading, isError, error };
};

export const useInventorys = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetInventorysQuery(
    "inventoryList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  return { data, isSuccess, isLoading, isError, error };
};
export const useUsers = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetUsersQuery(
    "userList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  return { data, isSuccess, isLoading, isError, error };
};
