import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Teste1 from "./pages/teste1";
import Teste2 from "./pages/teste2";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teste1" element={<Teste1 />} />
        <Route path="/teste2" element={<Teste2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
