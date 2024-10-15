import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import MyRoutes from "./routes";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
