import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PublicRoute({children}: any) {
    const { usuario } = useAuth();
    if(usuario){

      //Não mudar usuario.user.tipo
        if(usuario.user.tipo === "instrutor"){
            return <Navigate to="/Home" replace />;
        }
        if(usuario.user.tipo === "aprendiz"){
            return <Navigate to="/Perfil" replace />;
        }
    }
    return children;
}

export default PublicRoute;