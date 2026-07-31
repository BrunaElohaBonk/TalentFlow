import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import lupa from '../../../assets/img/pesquisar.png'
import './notificacao.css'
import { useEffect, useState } from "react";
import { useNotificacao } from "../../../context/notificacaoContext";
import api from "../../../services/api";

interface INotificacao {
    tipo: string;
    alteradoPor: string;
    id: number;
    nome: string;
    texto: string;
    dataHora: string;
}

interface IUsuario {
    EDV: number;
    name: string;
    tipoUser: string;
}

function Notificacao() {
    const [busca, setBusca] = useState("");
    const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const { marcarComoLida } = useNotificacao();
    const normalizar = (texto: string) =>
        texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    const formatarHistorico = (notificacao: INotificacao) => {
        if (notificacao.texto === "CREATE") {
            if (notificacao.tipo === "TURMA")
                return `Cadastrou uma nova turma: ${notificacao.nome}.`;
            if (notificacao.tipo === "PERFIL") {
                return `Cadastrou um novo usuário: ${notificacao.nome}.`
            }
        }
        if (notificacao.texto === "UPDATE") {
            if (notificacao.tipo === "TURMA")
                return `Atualizou as informações da turma ${notificacao.nome}.`;
            if (notificacao.tipo === "PERFIL")
                return `Atualizou as informações do perfil.`
        }
        if (notificacao.texto === "DELETE") {
            if (notificacao.tipo === "TURMA")
                return `Removeu a turma ${notificacao.nome}.`;
            if (notificacao.tipo === "PERFIL")
                return `Removeu o usuário ${notificacao.nome}.`
        }
        return `Realizou uma alteração`;
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleString("pt-BR");
    };
    const fetchNotificacoes = async () => {
        try {
            const response = await api.get("/historico/verHistorico");
            console.log('DATAAAAA', response.data)
            const notificacoesValidas = response.data.filter(
                (item: INotificacao) => item.alteradoPor !== null
            );
            setNotificacoes(notificacoesValidas);
        } 
        catch (error) {
            console.error("Erro ao buscar histórico:", error);
            setNotificacoes([]);
        }
    };
    const fetchUsuarios = async () => {
        try {
            const [aprendizes, instrutores] = await Promise.all([
                api.get("/auth/buscaruser/APRENDIZ"),
                api.get("/auth/buscaruser/INSTRUTOR")
            ]);

            const listaUsuarios = [
                ...aprendizes.data,
                ...instrutores.data
            ];
            setUsuarios(listaUsuarios);
        } 
        catch(error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };
    useEffect(() => {
        marcarComoLida();
        fetchNotificacoes();
        fetchUsuarios();
    }, []);

    const filtro = notificacoes
        .filter((item) => {
            const termo = normalizar(busca.trim());
            return (
                normalizar(item.nome).includes(termo) ||
                normalizar(item.texto).includes(termo) ||
                normalizar(item.dataHora).includes(termo) ||
                normalizar(item.alteradoPor).includes(termo) ||
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
                                filtro.map((notificacao, index) => (
                                    <div className="notificacao-card" key={`${notificacao.id}-${index}`}>
                                        <span className="notificacao-nome">{notificacao.alteradoPor}</span>
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