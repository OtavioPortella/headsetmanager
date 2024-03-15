import Button from "../components/button";
import Header from "../components/header";
import Background from "../components/background";

function Login() {
  return (
    <>
      <Header />
      <Background>
        <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl">
          <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
            Login
          </h1>
          <div className="flex-1 flex justify-between">
            <div className=" flex-1 flex flex-col justify-center items-center gap-4">
              <h1>Selecione a sua Filial:</h1>
              <select
                className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                type="password"
                placeholder="Filial"
              >
                <option value="matriz">Matriz</option>
                <option value="aguapei">Aguapeí</option>
                <option value="aviacao">Aviação</option>
                <option value="marechal">Marechal</option>
                <option value="saverio">Savério</option>
              </select>
              <input
                className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                type="text"
                placeholder="Usuário"
              />
              <input
                className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                type="password"
                placeholder="Senha"
              />
              <Button>Entrar</Button>
            </div>
            <div className="flex-1 w-[700px] bg-forgot-password bg-contain bg-no-repeat" />
          </div>
        </div>
      </Background>
    </>
  );
}

export default Login;
