import Button from "../components/button";
import Header from "../components/header";
import Background from "../components/background";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target)
    
    const matricula = form.get('matricula')
    const senha = form.get('senha');
  
    const response = await axios.post('http://localhost:3000/login', {
      matricula,
      senha
    });

    const { user, token } = response.data;


    console.log({
      user,
      token
    });

    navigate('/dashboard')
    
  }

  return (
    <>
      <Header />
      <Background>
        <form className="rounded-lg flex flex-col bg-white/35 shadow-2xl" onSubmit={handleSubmit}>
          <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
            Login
          </h1>
          <div className="flex-1 flex justify-between">
            <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4">
              <h1>Selecione a sua Filial:</h1>
              <input
                className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                type="text"
                placeholder="Matrícula"
                name="matricula"
              />
              <input
                className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                type="password"
                placeholder="Senha"
                name="senha"
              />
              <Button type="submit">Entrar</Button>
            </div>
            <div className="flex-1 w-[700px] bg-forgot-password bg-contain bg-no-repeat" />
          </div>
        </form>
      </Background>
    </>
  );
}

export default Login;
