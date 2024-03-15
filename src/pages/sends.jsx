import Button from "../components/button";
import Header from "../components/header";
import Background from "../components/background";

function Enviados() {
  return (
    <>
      <Header />
      <Background>
        <div className="flex-1 flex justify-center pt-8 pb-8 bg-hero-pattern bg-cover bg-no-repeat">
          <div className="rounded-lg flex items-center flex-col bg-white/55 shadow-2xl ">
            <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
              Heads Enviados
            </h1>
            <div className="flex flex-col p-12 gap-6 text-lg ">
              <div className="flex items-center justify-between gap-2 ">
                <h1>Data de Enviados:</h1>
                <input
                  className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                  type="date"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <h1>Heads Simples:</h1>
                <input
                  className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                  type="number"
                  placeholder="Quantidade"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <h1>Heads Duplos:</h1>
                <input
                  className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                  type="number"
                  placeholder="Quantidade"
                />
              </div>
            </div>
            <Button>Confirmar Envio</Button>
          </div>
        </div>
      </Background>
    </>
  );
}

export default Enviados;
