import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PrivateRoute({children, tipo} : any){
    const {usuario} = useAuth();

    console.log(usuario)
    if(!usuario){
        return <Navigate to="/" replace />;
    }
    if(tipo && usuario.tipo !== tipo){
        return <Navigate to="/Home" />;
    }
    return children;
}

export default PrivateRoute;