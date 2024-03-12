import Button from "./button";

function LoginPage() {
  return (
    <div>
      <div className="flex-1 flex justify-between">
        <div className=" flex-1 flex flex-col justify-center items-center gap-4">
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
  );
}

export default LoginPage;
