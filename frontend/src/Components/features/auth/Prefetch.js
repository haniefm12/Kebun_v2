import { store } from "../../../app/store";

import { usersApiSlice } from "../../../app/api/usersApiSlice";
import { gardensApiSlice } from "../../../app/api/gardensApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");

    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const gardens = store.dispatch(
      gardensApiSlice.endpoints.getGardens.initiate()
    );

    return () => {
      console.log("unsubscribing");

      users.unsubscribe();
      gardens.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
