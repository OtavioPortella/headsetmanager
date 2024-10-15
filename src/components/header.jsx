import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./button";

function Header() {
  const navigate = useNavigate();

  const { signed, logout } = useAuth();

  return (
    <header className="bg-azul-toledo text-white h-16">
      <div className="flex justify-between p-4">
        <div className="flex justify-center h-8">
          <img src="../src/assets/toledo.png" alt="" />
        </div>
        <div>
          {signed && (
            <>
              <Link to="/received">
                <Button>Recebidos</Button>
              </Link>
              <Link to="/send">
                <Button>Enviados</Button>
              </Link>
              <Link to="/dashboard">
                <Button>Relatórios</Button>
              </Link>
              <Link to="/delivered">
                <Button>Entrega de Heads</Button>
              </Link>
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
