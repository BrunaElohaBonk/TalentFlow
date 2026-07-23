import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

function PublicRoute({children}: PrivateRouteProps) {
    const { usuario } = useAuth();
    if(usuario){
        if(usuario.tipo === "instrutor"){
            return <Navigate to="/Home" replace />;
        }
        if(usuario.tipo === "aprendiz"){
            return <Navigate to="/Perfil" replace />;
        }
    }
    return children;
}

export default PublicRoute;