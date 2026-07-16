import { useState } from "react";
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verAprendiz.css'
import user from '../../../assets/img/icon_user.png'
import lupa from '../../../assets/img/pesquisar.png'
import filter from '../../../assets/img/filter.png'
import { aprendizes } from "./aprendizes";
import { useNavigate } from "react-router-dom";

function VerAprendiz(){
    const [busca, setBusca] = useState("");
    const navigate = useNavigate()
    const normalizar = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const filtro = aprendizes
    .filter((item) => {
        const termo = normalizar(busca.trim());
        if (termo === "") return true;
        return (
            normalizar(item.perfil.nome).includes(termo) ||
            normalizar(item.perfil.email).includes(termo) ||
            normalizar(item.perfil.user).includes(termo) ||
            normalizar(item.perfil.turma).includes(termo) ||
            item.perfil.edv.toString().includes(termo) ||
            item.perfil.contato.toString().includes(termo) ||
            item.perfil.nascimento.toLocaleDateString("pt-BR").includes(termo)
        );
    })
    .sort((a, b) =>
        a.perfil.nome.localeCompare(b.perfil.nome, "pt-BR")
    );
        
    // const fetchInstrutor = async () => {
    //     try {
    //         const response = await axios.get("link backend");
    //         console.log("API RESPONSE:", response.data);
    //         setInstrutor(response.data.response);
    //     } 
    //     catch (error) {
    //         console.error("Erro:", error);
    //         setInstrutor(null);
    //     }
    // };

    return(
        <div>
            <Header></Header>
            <div className="aprendiz-container">
                <Sidebar/>
                <div className="aprendiz-body">
                    <div className="aprendiz-pesquisa">
                        <div className="aprendiz-input-area">
                            <input type="text" className="aprendiz-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                            <button type="button" className="aprendiz-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                        </div>
                        <button type="button" className="aprendiz-button-filtro"><img src={filter} alt="filtro" className="img-filter"/></button>
                    </div>
                    <div className="aprendiz-card-area">
                        {filtro.length > 0 ? (
                            filtro.map((aprendizes) => (
                                <div className="aprendiz-modal" key={aprendizes.perfil.edv}>
                                    <div className="aprendiz-header">
                                        <img src={user} alt="user" className="aprendiz-img"/>
                                        <span className="aprendiz-titulo">{aprendizes.perfil.nome}</span>
                                    </div>
                                    <div className="aprendiz-conteudo">
                                        <span className="aprendiz-span">{aprendizes.perfil.turma}</span>
                                        <button onClick={() => navigate('/PerfilAprendiz')} className="aprendiz-button">Ver Dados do Aprendiz</button>
                                    </div>
                                </div>
                            ))
                        ) : (<p className="aprendiz-titulo">Nenhum aprendiz encontrado.</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerAprendiz