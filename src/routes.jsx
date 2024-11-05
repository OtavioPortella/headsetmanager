import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import PackageList from "./pages/package/list";
import NewPackage from "./pages/package/new";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Header from "./components/header";
import Background from "./components/background";
import EditPackage from "./pages/package/edit";
import Sections from "./pages/sections/list";
import CreateSection from "./pages/sections/create";

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
            path="/sections"
            element={
              <ProtectedRoute>
                <Sections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sections/new"
            element={
              <ProtectedRoute>
                <CreateSection />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Background>
    </BrowserRouter>
  );
}

export default MyRoutes;
