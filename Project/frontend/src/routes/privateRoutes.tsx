import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
    tipo?: string;
}

function PrivateRoute({children, tipo} : PrivateRouteProps){
    const {usuario} = useAuth();
    if(!usuario){
        return <Navigate to="/" replace />;
    }
    if(tipo && usuario.tipo !== tipo){
        return <Navigate to="/Home" />;
    }
    return children;
}

export default PrivateRoute;