import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import lupa from '../../../assets/img/pesquisar.png'
import './notificacao.css'
import { notificacoes } from './notificacao'
import { useEffect, useState } from "react";
import { useNotificacao } from "../../../context/notificacaoContext";

interface INotificacao {
    id: number;
    nome: string;
    texto: string;
    dataHora: string;
}

function Notificacao(){
    const [busca, setBusca] = useState("");
    const normalizar = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const filtro = notificacoes
    .filter((item) => {
        const termo = normalizar(busca.trim());
        return (
            normalizar(item.nome).includes(termo) ||
            normalizar(item.texto).includes(termo) ||
            normalizar(item.dataHora).includes(termo) ||
            item.id.toString().includes(termo)
        );
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const { marcarComoLida } = useNotificacao();
    useEffect(() => {
        marcarComoLida();
    }, []);
    // const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);
    // const fetchNotif = async () => {
    //     try {
    //         const response = await axios.get("URL_DO_BACKEND");

    //         console.log(response.data);

    //         setNotificacoes(response.data);
    //     } catch (error) {
    //         console.error(error);
    //         setNotificacoes([]);
    //     }
    // };

    // useEffect(() => {
    //     fetchNotif();
    // }, []);

    return(
        <div className="notificacao">
            <Header></Header>
            <div className="notificacao-container">
                <Sidebar/>
                <div className="notificacao-body">
                    <div className="notificacao-pesquisa">
                        <input type="text" className="notificacao-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                        <button type="button" className="notificacao-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                    </div>
                    <div className="notificacao-modal">
                        <h1 className="notificacao-titulo">Histórico de Atualização</h1>
                        <div className="notificacao-lista">
                            {filtro.length > 0 ? (
                                filtro.map((notificacao) => (
                                    <div className="notificacao-card" key={notificacao.id}>
                                        <span className="notificacao-nome">{notificacao.nome}</span>
                                        <span className="notificacao-texto">{notificacao.texto}</span>
                                        <span className="notificacao-texto">{notificacao.dataHora}</span>
                                    </div>
                                ))
                            ) : (
                                <span>Nenhuma notificação encontrada.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Notificacao