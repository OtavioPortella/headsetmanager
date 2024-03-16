import Background from "../components/background";
import Header from "../components/header";

function Dashboard() {
  return (
    <>
      <Header />
      <Background>
        <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl">
          <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
            Relatórios
          </h1>
          <div className="flex-1 flex justify-between">
            <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4"></div>
          </div>
        </div>
      </Background>
    </>
  );
}
export default Dashboard;
