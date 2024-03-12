import Header from "./components/header";
import Login from "./pages/login";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <Login />
    </div>
  );
}

export default App;
