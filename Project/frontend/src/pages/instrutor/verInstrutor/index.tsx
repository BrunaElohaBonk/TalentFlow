import { useEffect, useState } from "react"
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verInstrutor.css'
import Swal from "sweetalert2"
import lixeira from '../../../assets/img/lixeira.png'
import user from '../../../assets/img/icon_user.png'
import lupa from '../../../assets/img/pesquisar.png'
import api from "../../../services/api"

interface Iinstrutor {
    EDV: number;
    name: string;
    user_bosch: string;
    email_bosch: string;
    contato: string;
    data_nascimento: string;
    fotoPerfil: File | string | null;
    Ativo: boolean;
    tipoUser: "INSTRUTOR" 
}

function VerInstrutor(){
    const [busca, setBusca] = useState("");
    const [instrutor, setInstrutor] = useState<Iinstrutor[]>([]);
    const normalizar = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const filtro = instrutor
    .filter((item) => {
        const termo = normalizar(busca.trim());
        return (
            normalizar(item.name).includes(termo) ||
            normalizar(item.email_bosch).includes(termo) ||
            item.EDV.toString().includes(termo)
        );
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    const getUsuarioLogado = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    };

    const fetchInstrutor = async () => {
        try {
            const response = await api.get("/auth/buscaruser/INSTRUTOR");
            console.log("API RESPONSE:", response.data);
            console.log("PRIMEIRO USUARIO:", response.data[0]);

            const usuarios = response.data;
            const usuarioLogado = getUsuarioLogado();
            const outrosInstrutores = usuarios.filter(
                (item: Iinstrutor) => item.Ativo === true  && item.tipoUser === "INSTRUTOR" && item.EDV !== usuarioLogado.EDV
            );
            setInstrutor(outrosInstrutores);
        } 
        catch (error) {
            console.error("Erro:", error);
            setInstrutor([]);
        }
    };

    const handleDelete = async (EDV: number) => {
        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'O instrutor será deletado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        });
        if (!confirm.isConfirmed) return;
        try {
            const response = await api.put(`/auth/deletarUser/${EDV}`);
            console.log("Resposta da API:", response.data);
            console.log("Status:", response.status);
            Swal.fire({
                title: 'Deletado!',
                text: 'Instrutor removido com sucesso!',
                icon: 'success'
            });
            fetchInstrutor();
        } 
        catch (error) {
            console.error('Erro ao deletar:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar instrutor',
                icon: 'error'
            });
        }
    };
    useEffect(() => {
        fetchInstrutor();
    }, []);

    return(
        <div className="instrutor">
            <Header></Header>
            <div className="instrutor-container">
                <Sidebar />
                <div className="instrutor-body">
                    <div className="instrutor-pesquisa">
                        <input type="text" className="instrutor-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                        <button type="button" className="instrutor-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                    </div>
                   <div className="instrutor-card-area">
                        {filtro.length > 0 ? (
                            filtro.map((instrutor) => (
                                <div className="instrutor-modal" key={instrutor.EDV}>
                                    <button className="instrutor-btn-delete" onClick={() => handleDelete(instrutor.EDV)}><img src={lixeira} alt="deletar" className="instrutor-deletar"/></button>
                                    <div className="instrutor-header">
                                        <img src={user} alt="user" className="instrutor-img"/>
                                        <span className="instrutor-titulo" title={instrutor.name}>{instrutor.name}</span>
                                    </div>
                                    <div className="instrutor-conteudo">
                                        <span className="instrutor-span">EDV: {instrutor.EDV}</span>
                                        <span className="instrutor-span" title={instrutor.email_bosch}>Email: {instrutor.email_bosch}</span>
                                    </div>
                                </div>
                            ))
                        ) : (<p className="instrutor-aviso">Nenhum instrutor encontrado.</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerInstrutor