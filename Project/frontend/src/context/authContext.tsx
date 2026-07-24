import { createContext, useContext, useState } from "react";

interface Usuario {
        EDV: number
        tipo: string
        token: string
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
        setUsuario(usuario);
        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
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
        <AuthContext.Provider 
            value={{
                usuario,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
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