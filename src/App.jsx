import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import MyRoutes from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MyRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
