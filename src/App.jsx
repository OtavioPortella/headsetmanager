import Header from "./components/header";
import Page from "./components/page";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <Page />
    </div>
  );
}

export default App;
