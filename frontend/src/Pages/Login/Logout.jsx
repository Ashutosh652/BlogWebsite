import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { axiosInstance } from "../../axios";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("account/logout", {
          withCredentials: true,
        });
        console.log(response.data);
        setUser(null);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
