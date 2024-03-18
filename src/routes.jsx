import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Recebidos from "./pages/received";
import Enviados from "./pages/sends";
import Dashboard from "./pages/dashboard";
import Delivered from "./pages/delivered";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/received" element={<Recebidos />} />
        <Route path="/send" element={<Enviados />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delivered" element={<Delivered />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
