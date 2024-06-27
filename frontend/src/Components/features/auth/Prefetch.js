import { store } from "../../../app/store";

import { usersApiSlice } from "../../../app/api/usersApiSlice";
import { gardensApiSlice } from "../../../app/api/gardensApiSlice";
import { notesApiSlice } from "../../../app/api/notesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");

    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const gardens = store.dispatch(
      gardensApiSlice.endpoints.getGardens.initiate()
    );
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    return () => {
      console.log("unsubscribing");

      users.unsubscribe();
      gardens.unsubscribe();
      notes.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
