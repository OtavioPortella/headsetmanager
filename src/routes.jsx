import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Recebidos from "./pages/received";
import Enviados from "./pages/sends";
import Dashboard from "./pages/dashboard";
import Delivered from "./pages/delivered";
import { ProtectedRoute } from "./components/ProtectedRoute";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/received"
          element={
            <ProtectedRoute>
              <Recebidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <Enviados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivered"
          element={
            <ProtectedRoute>
              <Delivered />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
