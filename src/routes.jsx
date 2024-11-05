import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import PackageList from "./pages/package/list";
import NewPackage from "./pages/package/new";
import Enviados from "./pages/sends";
import Dashboard from "./pages/dashboard";
import Delivered from "./pages/delivered";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Header from "./components/header";
import Background from "./components/background";
import EditPackage from "./pages/package/edit";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Background>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/packages"
            element={
              <ProtectedRoute>
                <PackageList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packages/edit/:id"
            element={
              <ProtectedRoute>
                <EditPackage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packages/new"
            element={
              <ProtectedRoute>
                <NewPackage />
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
      </Background>
    </BrowserRouter>
  );
}

export default MyRoutes;
