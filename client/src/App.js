import './App.css';
import {Routes, Route } from "react-router-dom";
import { Chat } from './pages/Chat';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/Auth/Register';
import { LoginPage } from './pages/Auth/Login';



function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Chat />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
    </Route>
  </Routes>
  );
}

export default App;
