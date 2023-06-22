import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Layout } from "./components/Layout";
import { RegisterPage } from "./pages/Auth/Register";
import { LoginPage } from "./pages/Auth/Login";
import Confirm from "./pages/Auth/Confirm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getToken } from "./store/userSlice";

function App() {
  const { email, loading, error, token, succes } = useSelector(
    (state) => state.userReducer
  );
  let dispatch = useDispatch();

  useEffect(() => {
    console.log("sdsfd", email)

    const storedItem = localStorage.getItem("token");
    if (storedItem) {
      const tokenObj = {
        token: storedItem,
      };
      dispatch(getToken(tokenObj));
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={!succes.message ? <RegisterPage /> : <Layout />}>
        <Route index element={<Chat />} />
        <Route path="/signin" element={<LoginPage />} />
        {/* <Route path="/signup" element={<RegisterPage />} /> */}
      </Route>
     
        <Route path="/confirm" element={<Confirm />} />
     

    </Routes>
  );
}

export default App;
