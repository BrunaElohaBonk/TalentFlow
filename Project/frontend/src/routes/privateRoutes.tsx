import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PrivateRoute({children, tipo}){
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