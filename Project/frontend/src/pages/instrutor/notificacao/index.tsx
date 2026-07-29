import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import lupa from '../../../assets/img/pesquisar.png'
import './notificacao.css'
import { useEffect, useState } from "react";
import { useNotificacao } from "../../../context/notificacaoContext";
import api from "../../../services/api";

interface INotificacao {
    id: number;
    nome: string;
    texto: string;
    dataHora: string;
}

function Notificacao() {
    const [busca, setBusca] = useState("");
    const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);
    const { marcarComoLida } = useNotificacao();
    const normalizar = (texto: string) =>
        texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    const formatarHistorico = (notificacao: INotificacao) => {
        if (notificacao.texto === "CREATE") {
            return `${notificacao.nome} cadastrou um novo registro`;
        }
        if (notificacao.texto === "UPDATE") {
            return `${notificacao.nome} atualizou as informações`;
        }
        if (notificacao.texto === "DELETE") {
            return `${notificacao.nome} removeu um registro`;
        }
        return `${notificacao.nome} realizou uma alteração`;
    };
    const formatarData = (data: string) => {
        return new Date(data).toLocaleString("pt-BR");
    };
    const fetchNotificacoes = async () => {
        try {
            const response = await api.get("/historico/verHistorico");
            setNotificacoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            setNotificacoes([]);
        }
    };
    useEffect(() => {
        marcarComoLida();
        fetchNotificacoes();
    }, []);

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
        .sort((a, b) =>
            new Date(b.dataHora).getTime() -
            new Date(a.dataHora).getTime()
        );
    return (
        <div className="notificacao">
            <Header></Header>
            <div className="notificacao-container">
                <Sidebar />
                <div className="notificacao-body">
                    <div className="notificacao-pesquisa">
                        <input type="text" className="notificacao-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)} />
                        <button type="button" className="notificacao-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa" /></button>
                    </div>
                    <div className="notificacao-modal">
                        <h1 className="notificacao-titulo">Histórico de Atualização</h1>
                        <div className="notificacao-lista">
                            {filtro.length > 0 ? (
                                filtro.map((notificacao) => (
                                    <div className="notificacao-card" key={notificacao.id}>
                                        <span className="notificacao-nome">{notificacao.nome}</span>
                                        <span className="notificacao-texto">{formatarHistorico(notificacao)}</span>
                                        <span className="notificacao-texto">{formatarData(notificacao.dataHora)}</span>
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