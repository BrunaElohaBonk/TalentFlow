import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PublicRoute({children}) {
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