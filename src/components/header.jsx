import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./button";

function Header() {
  const navigate = useNavigate();

  const { signed, logout, user } = useAuth();

  console.log(user);

  if (!signed) return null;

  console.log(user);

  return (
    <header className="bg-azul-toledo text-white h-16">
      <div className="flex justify-between p-4 container mx-auto">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#0000"
            width={24}
            height={24}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                fill="#ffffff"
              ></path>{" "}
              <path
                d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
          <span className="text-white font-semibold text-xl">
            {user?.nome} - {user?.carteira?.nome} -{" "}
            {user?.carteira?.filial?.nome}
          </span>
        </div>
        {signed && (
          <div>
            {user?.perfil?.admin && (
              <>
                <Link to="/packages">
                  <Button>Malotes</Button>
                </Link>
                <Link to="/sections">
                  <Button>Carteiras</Button>
                </Link>
                <Link to="/companies">
                  <Button>Filiais</Button>
                </Link>
              </>
            )}
            <Link to="/users">
              <Button>Usuários</Button>
            </Link>
            <Link to="/orders">
              <Button>Pedidos</Button>
            </Link>
            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Sair
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
