import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleNavigate = (route) => {
    const encodedRoute = route.replace(/\s+/g, "-");
    navigate(`/${encodedRoute}`);
    setActive(encodedRoute);
  };

  return { active, handleNavigate };
};

export default useSidebar;
