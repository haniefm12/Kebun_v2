import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Home;
