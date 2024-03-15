import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Recebidos from "./pages/received";
import Enviados from "./pages/sends";
import Dashboard from "./pages/dashboard";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/received" element={<Recebidos />} />
        <Route path="/send" element={<Enviados />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
