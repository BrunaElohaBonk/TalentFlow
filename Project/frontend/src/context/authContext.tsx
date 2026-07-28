import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

interface Usuario {
    token: string
    user: {
        EDV: number
        tipo: string
        ativo:boolean
    }
}

interface AuthContextType {
    usuario: Usuario | null;
    login: (usuario: Usuario) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const salvo = localStorage.getItem("usuario");
        return salvo ? JSON.parse(salvo) : null;
    });
    function login(usuario: Usuario){
        if (!usuario.user.ativo) {
            Swal.fire({
                icon: "error",
                title: "Usuário inativo",
                text: "Sua conta está desativada.",
                confirmButtonColor: "#2B83D5",
                confirmButtonText: "OK"
            });
    
            return;
        }
        setUsuario(usuario);
        console.log("User "+ usuario.user)
        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario.user)
        );
        localStorage.setItem(
            "token",
            JSON.stringify(usuario.token)
        );
       
    }
    function logout(){
        setUsuario(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    }
    return (
        <AuthContext.Provider value={{usuario, login, logout}}>{children}</AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error(
            "useAuth deve estar dentro do AuthProvider"
        );
    }
    return context;

}