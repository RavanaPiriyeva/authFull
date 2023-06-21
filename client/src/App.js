import './App.css';
import { Routes, Route } from "react-router-dom";
import { Chat } from './pages/Chat';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/Auth/Register';
import { LoginPage } from './pages/Auth/Login';
import Confirm from './pages/Auth/Confirm';
import { useSelector } from 'react-redux';



function App() {
  const { email, loading, error, token, succes } = useSelector(state => state.userReducer);

  return (
    <Routes>
      <Route path="/confirm" element={<Confirm />} />

      <Route path="/" element={succes.message ? <Layout /> : <RegisterPage />}>
        <Route index element={<Chat />} />
        <Route path="/signin" element={<LoginPage />} />
        {/* <Route path="/signup" element={<RegisterPage />} /> */}

      </Route>
    </Routes>
  );
}

export default App;
