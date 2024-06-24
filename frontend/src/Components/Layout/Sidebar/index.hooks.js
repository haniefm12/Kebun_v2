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
    navigate(`/${route}`);
    setActive(route);
  };

  return { active, handleNavigate };
};

export default useSidebar;
