import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const Login = () => {
  const [adminId, setAdminID] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8082/api/admin/login",
        {
          adminId,
          password,
        }
      );

      const apiResponse = response.data;
      console.log(response.headers["authorization"]);
      if (apiResponse.status === "success") {
        const jwtToken = response.headers["authorization"].split(" ")[1];
        localStorage.setItem("jwt-token", jwtToken);
        console.log(
          "Login successful and jwt-token is stored in local storage:",
          jwtToken
        );
      } else {
        console.error("Login failed:", apiResponse.data);
      }
    } catch (error: any) {
      if (error.response) {
        const apiResponse = error.response.data;
        console.error("Login failed:", apiResponse);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt", { path: "/" });
    console.log("Logged out, JWT token removed from cookies.");
  };

  const handleCar = async (e: any) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwt-token");

    try {
      const response = await axios.get("http://localhost:8082/api/v1/coffees", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });
      const data1 = await response.data;
      console.log(data1);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();

    const admin = {
      adminId: adminId,
      password: password,
      nickname: "umm",
    };

    try {
      const response = await axios.post(
        "http://localhost:8082/api/admin/register",
        admin,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error adding admin");
    }
  };

  return (
    <div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminID(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleAdminLogin}>어드민 로그인하기</button>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleCar}>자동차</button>
      <button onClick={handleRegister}>어드민 등록</button>
    </div>
  );
};

export default Login;
