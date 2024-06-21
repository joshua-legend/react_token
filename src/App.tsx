import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

type Student = {};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["jwt"]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login/jwt", {
        username,
        password,
      });

      // Assuming the JWT token is in the response data
      const jwt = response.data;
      // Setting the JWT token in cookies
      setCookie("jwt", jwt, { path: "/" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/major?major=철학",
        {
          method: "GET",
          credentials: "include", // 쿠키를 포함하도록 설정
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleLogout = () => {
    // 쿠키에서 JWT 토큰 삭제
    Cookies.remove("jwt", { path: "/" });
    console.log("Logged out, JWT token removed from cookies.");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Login</button>
      </form>

      <button onClick={handleClick}>버튼</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default App;
