import { store } from "../../../app/store";
import React from "react";
import { usersApiSlice } from "../../../app/api/usersApiSlice";
import { gardensApiSlice } from "../../../app/api/gardensApiSlice";
import { notesApiSlice } from "../../../app/api/notesApiSlice";
import { inventorysApiSlice } from "../../../app/api/inventorysApiSlice";
import { financesApiSlice } from "../../../app/api/financesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
const Prefetch = () => {
  useEffect(() => {
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const gardens = store.dispatch(
      gardensApiSlice.endpoints.getGardens.initiate()
    );
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const inventorys = store.dispatch(
      inventorysApiSlice.endpoints.getInventorys.initiate()
    );
    const finances = store.dispatch(
      financesApiSlice.endpoints.getFinances.initiate()
    );
    return () => {
      users.unsubscribe();
      gardens.unsubscribe();
      notes.unsubscribe();
      inventorys.unsubscribe();
      finances.unsubscribe();
    };
  }, []);
  return <Outlet />;
};
export default Prefetch;
