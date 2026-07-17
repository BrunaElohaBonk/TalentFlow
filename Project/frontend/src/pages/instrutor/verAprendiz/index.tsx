import { useState } from "react";
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verAprendiz.css'
import user from '../../../assets/img/icon_user.png'
import lupa from '../../../assets/img/pesquisar.png'
import lixeira from '../../../assets/img/lixeira.png'
import filter from '../../../assets/img/filter.png'
import { aprendizes } from "./aprendizes";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Filtro from "../../../components/filter";

function VerAprendiz(){
    const navigate = useNavigate()
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState(false)
    const Idade = (dataNascimento: Date) => {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        return idade;
    };
    const [filtros, setFiltros] = useState({
        turmas: [] as string[],
        idadeMin: "",
        idadeMax: "",
        setores: [] as string[],
        idiomas: [] as string[],
        formacoes: [] as string[]
    });
    const normalizar = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const pesquisar = aprendizes
        .filter((item) => {
        if (filtros.setores.length > 0) {
            const setorAprendiz = item.situacaoProfissional.nomeSetor;
            const possuiSetor = filtros.setores.includes(setorAprendiz);
            if (!possuiSetor) {
                return false;
            }
        }
        if (filtros.turmas.length > 0) {
            if (!filtros.turmas.includes(item.perfil.turma)) {
                return false;
            }
        }
        if (filtros.idadeMin !== "" || filtros.idadeMax !== "") {
            const idade = Idade(item.perfil.nascimento);
            if (filtros.idadeMin !== "" && filtros.idadeMax === "" && idade !== Number(filtros.idadeMin)) {
                return false;
            }
            if (filtros.idadeMin !== "" && filtros.idadeMax !== "" && (idade < Number(filtros.idadeMin) || idade > Number(filtros.idadeMax))) {
                return false;
            }
            if (filtros.idadeMin === "" && filtros.idadeMax !== "" && idade > Number(filtros.idadeMax)) {
                return false;
            }
        }
        if (filtros.idiomas.length > 0) {
            const idiomasAprendiz = item.idiomas.map(
                i => i.idioma
            );
            const possuiIdioma = filtros.idiomas.some(idioma => idiomasAprendiz.includes(idioma));
            if (!possuiIdioma) {
                return false;
            }
        }
        if (filtros.formacoes.length > 0) {
            const formacoesAprendiz = item.formacaoAcademica.map(f => f.nomeCurso);
            const possuiFormacao = filtros.formacoes.some(formacao => formacoesAprendiz.includes(formacao));
            if (!possuiFormacao) {
                return false;
            }
        }
        return true;
    })
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
        
    // const fetchAprendiz = async () => {
    //     try {
    //         const response = await axios.get("link backend");
    //         console.log("API RESPONSE:", response.data);
    //         setAprendiz(response.data.response);
    //     } 
    //     catch (error) {
    //         console.error("Erro:", error);
    //         setAprendiz(null);
    //     }
    // };

    const handleDelete = async (edv) => {
        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'O aprendiz será deletado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })

        if (!confirm.isConfirmed) return
            try {
                await axios.delete(`link backend/${edv}`)
                Swal.fire({
                    title: 'Deletado!',
                    text: 'Aprendiz removido com sucesso!',
                    icon: 'success'
                })
                // fetchAprendiz()
            } 
            catch (error) {
                console.error('Erro ao deletar:', error)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao deletar aprendiz',
                    icon: 'error'
                })
            }
    }


    return(
        <div>
            <Header></Header>
            <Filtro visible={filtro} setVisible={setFiltro} filtros={filtros} setFiltros={setFiltros}/>
            <div className="aprendiz-container">
                <Sidebar/>
                <div className="aprendiz-body">
                    <div className="aprendiz-pesquisa">
                        <div className="aprendiz-input-area">
                            <input type="text" className="aprendiz-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                            <button type="button" className="aprendiz-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                        </div>
                        <button type="button" className="aprendiz-button-filtro"><img src={filter} alt="filtro" className="img-filter" onClick={() => setFiltro(true)}/></button>
                    </div>
                    <div className="aprendiz-card-area">
                        {pesquisar.length > 0 ? (
                            pesquisar.map((aprendizes) => (
                                <div className="aprendiz-modal" key={aprendizes.perfil.edv}>
                                    <button className="aprendiz-btn-delete" onClick={() => handleDelete(aprendizes.perfil.edv)}><img src={lixeira} alt="deletar" className="aprendiz-deletar"/></button>
                                    <div className="aprendiz-header">
                                        <img src={user} alt="user" className="aprendiz-img"/>
                                        <span className="aprendiz-titulo" title={aprendizes.perfil.nome}>{aprendizes.perfil.nome}</span>
                                    </div>
                                    <div className="aprendiz-conteudo">
                                        <span className="aprendiz-span" title={aprendizes.perfil.turma}>{aprendizes.perfil.turma}</span>
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