import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const Login = () => {
  const [adminId, setAdminID] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminCookieLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/login",
        {
          adminId,
          password,
        },
        { withCredentials: true }
      );

      // 서버 응답 데이터
      const apiResponse = response.data;

      if (apiResponse.status === "success") {
        // 로그인 성공 후 쿠키 확인
        const jwtToken = Cookies.get("jwt-token");

        if (jwtToken) {
          console.log(
            "Login successful and jwt-token is present in cookies:",
            jwtToken
          );
        } else {
          console.log("Login successful but jwt-token is not found in cookies");
        }
      } else {
        console.error("Login failed:", apiResponse.data);
      }
    } catch (error: any) {
      if (error.response) {
        // 서버 응답이 있는 경우
        const apiResponse = error.response.data;
        console.error("Login failed:", apiResponse);
      } else {
        // 서버 응답이 없는 경우 (네트워크 오류 등)
        console.error("Login failed:", error.message);
      }
    }
  };

  const handleAdminLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/login",
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
      const response = await axios.get("http://localhost:8080/api/car/all", {
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
      <button onClick={() => console.log(Cookies)}>zz</button>
    </div>
  );
};

export default Login;
