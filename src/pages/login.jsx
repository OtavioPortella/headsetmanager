import Button from "../components/button";
import Input from "../components/Input";
import { Navigate, useNavigate } from "react-router-dom";
import { http } from "../services/http";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Container from "../components/Container";

function Login() {
  const navigate = useNavigate();

  const { login, signed } = useAuth();

  const { mutate: authenticate } = useMutation({
    mutationFn: async ({ matricula, senha }) => {
      const response = await http.post("/login", {
        matricula,
        senha,
      });

      const { token, user } = response.data;

      return {
        token,
        user,
      };
    },
    onSuccess: ({ token, user }) => {
      login(token);
      if (user?.perfil?.admin) {
        navigate("/dashboard");
      } else {
        navigate("/orders");
      }
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    const matricula = form.get("matricula");
    const senha = form.get("senha");

    authenticate({
      matricula,
      senha,
    });
  }

  if (signed) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container className="max-w-md shadow px-8">
      <form
        className="flex-1 justify-center flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-azul-toledo text-center text-[46px]">Login</h1>
        <Input placeholder="Matrícula" name="matricula" />
        <Input type="password" placeholder="Senha" name="senha" />
        <Button type="submit">Entrar</Button>
      </form>
    </Container>
  );
}

export default Login;
