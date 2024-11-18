import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import MyRoutes from "./routes";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? error?.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? error?.message);
    },
  }),
});

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster richColors position="top-right" />
          <MyRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
