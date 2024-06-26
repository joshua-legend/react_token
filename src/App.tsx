import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import Login from "./Login";

function App() {
  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default App;
