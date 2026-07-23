import { useEffect, useState } from "react";
import faixa from "../../assets/img/faixa.png";
import logo from "../../assets/img/logo.png";
import './header.css'

interface Usuario {
    edv: number;
    nome: string;
    user: string;
    email: string;
}

function Header(){
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");
        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }
    }, []);
    return(
        <div className="header-body">
            <img src={faixa} alt="faixa" className="header-faixa"/>

            <div className="header-content">
                <div className="header-user">
                    {usuario && (
                        <span>Olá, {usuario.nome}</span>
                    )}
                </div>

                <div className="header-position">
                    <img src={logo} alt="logo" className="header-logo"/>
                </div>
            </div>

            <div className="header-final"></div>
        </div>
    );
}

export default Header;

