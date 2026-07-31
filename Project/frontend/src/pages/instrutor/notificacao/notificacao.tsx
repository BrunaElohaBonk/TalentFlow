import { useEffect, useState } from "react";
import { useNotificacao } from "../../../context/notificacaoContext";
import api from "../../../services/api";

function VerificadorNotificacao(){
    const { novaNotificacao } = useNotificacao();
    const [quantidade, setQuantidade] = useState(0);
    useEffect(() => {
        const buscar = async () => {
            try {
                const response = await api.get("/historico/verHistorico");
                const total = response.data.length;
                if(total > quantidade){
                    novaNotificacao();
                }
                setQuantidade(total);
            } 
            catch(error){
                console.error(error);
            }
        };
        buscar();
        const intervalo = setInterval(buscar, 1000); 
        return () => clearInterval(intervalo);
    }, [quantidade]);
    return null;
}

export default VerificadorNotificacao;