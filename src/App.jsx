import "./index.css";
import MyRoutes from "./routes";
import Header from "./components/header";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <MyRoutes />
    </div>
  );
}

export default App;
