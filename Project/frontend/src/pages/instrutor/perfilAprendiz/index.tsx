import { useEffect, useState } from "react"
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './perfilAprendiz.css'
import SituacaoProfissional from "./situacao_profissional";
import FormacaoAcademica from "./formacao_academica";
import CursoComplementar from "./curso_complementar";
import Idioma from "./idioma";
import SoftSkill from "./soft_skill";
import Competencia from "./competencias";
import icon_olho from '../../../assets/img/icon_olho.png'
import icon_user from '../../../assets/img/icon_user.png'
import voltar from '../../../assets/img/voltar.png'
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

type NivelIdioma ="BASICO" | "INTERMEDIARIO" | "AVANCADO" | "FLUENTE";

type NivelFormacao = "ENSINO_MEDIO" | "TECNICO" | "GRADUACAO" | "POS_GRADUACAO";

interface IUsuario{
    fotoAprendiz: File | null;
    email: string;
    user?: string;
    EDV: number;
    contato: string;
    name: string;
    data_nascimento: string;
}
interface IPerfilAprendiz {
    EDV: number;
    id: number;
    situacao_profissional: {
        nome_Setor?: string;
        nome_Lider?: string;
        cumprido_Estagio?: boolean;
        bio_profissional?: string;
    };

    formacao_academica: {
        id: number;
        name_Curso: string;
        nome_Institucao: string;
        status_Academico: "CONCLUIDO" | "CURSANDO";
        periodo_Atual: number;
        total_Periodo: number;
        nivel_formacao: NivelFormacao;
    }[];

    cursos_complementares: {
        id: number;
        name_Curso: string;
        status_Cursos: "CONCLUIDO" | "CURSANDO";
        data_Conclusao: string;
        carga_horaria: number;
    }[];

    idiomas: {
        id: number;
        nome_Idioma: string;
        nivel_Idioma: NivelIdioma;
    }[];

    soft_skills: {
        id: number;
        nome_SoftSkills: string[];
    }[];

    competencias: {
        id: number;
        nome_Competencia: string;
        nivel_Competencia: string;
    }[];
}

function PerfilAprendiz(){
    const navigate = useNavigate()
    const { edv } = useParams();
    const [aprendiz, setAprendiz] = useState<IPerfilAprendiz | null>(null);
    const [usuario, setUsuario] = useState<IUsuario | null>(null);
    const [situacao, setSituacao] = useState(false)
    const [formacao_academica, setFormacaoAcademica] = useState(false)
    const [curso_complementar, setCursoComplementar] = useState(false)
    const [idioma, setIdioma] = useState(false)
    const [soft_skill, setSoftSkill] = useState(false)
    const [competencia, setCompetencia] = useState(false)
    const fetchUsuario = async () => {
         try {
            const response = await api.get(`/aprendiz/${usuario?.EDV}`);
            console.log("USUARIO:", response.data);
            setAprendiz(response.data);
        } 
        catch (error) {
            console.error(error);
        }
    }
    const fetchAprendiz = async () => {
        try {
            const response = await api.get(`/aprendiz/perfil/${edv}`);
            console.log("PERFIL:", response.data);
            setAprendiz(response.data.data);
        } 
        catch(error) {
            console.error("Erro ao buscar perfil:", error);
        }
    };

    useEffect(() => {
        if(edv){
            fetchUsuario();
            fetchAprendiz();
        }
    },[edv]);

    if (!aprendiz) {
        return <h2>Carregando...</h2>;
    }

    return(
        <div className="dadosAprendiz">
            <Header></Header>
            <SituacaoProfissional visible={situacao} setVisible={setSituacao} situacao={aprendiz.situacao_profissional}/>
            <FormacaoAcademica visible={formacao_academica} setVisible={setFormacaoAcademica} formacaoAcademica={aprendiz.formacao_academica}/>
            <CursoComplementar visible={curso_complementar} setVisible={setCursoComplementar} cursoComplementar={aprendiz.cursos_complementares}/>
            <Idioma visible={idioma} setVisible={setIdioma} idiomas={aprendiz.idiomas}/>
            <SoftSkill visible={soft_skill} setVisible={setSoftSkill} softSkills={aprendiz.soft_skills}/>
            <Competencia visible={competencia} setVisible={setCompetencia} competencias={aprendiz.competencias}/>
        
            <div className="dadosAprendiz-container">
                <Sidebar></Sidebar>
                <div className="dadosAprendiz-body">
                    <main className="dadosAprendiz-tela">
                        <section className="dadosAprendiz-bloco">
                            <div className="dadosAprendiz-voltar">
                                <button onClick={() => navigate('/Aprendiz')}><img src={voltar} alt="voltar" /></button>
                            </div>
                            <div className="dadosAprendiz-topo">
                                <div className="dadosAprendiz-foto-container"><img src={icon_user} alt="icon_user" /></div>
                                <div className="dadosAprendiz-dados-perfil">
                                    <div className="dadosAprendiz-cabecalho-perfil"><h1>{usuario?.name}</h1></div>
                                    {usuario && (
                                        <div className="dadosAprendiz-informacoes">
                                            <span>Email: {usuario.email}</span>
                                            <span>EDV: {usuario.EDV}</span>
                                            <span>User: {usuario.user}</span>
                                            <span>Data de Nascimento: {new Date(usuario.data_nascimento).toLocaleDateString("pt-BR")}</span>
                                            <span>Idade: {calcularIdade(usuario.data_nascimento)} anos</span>
                                            <span>Contato: {formatarTelefone(usuario.contato)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="dadosAprendiz-cards-superiores">
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Situação Profissional</h3>
                                    <ul><li>{aprendiz.situacao_profissional.bio_profissional}</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setSituacao(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Formação Acadêmica</h3>
                                    <ul><li>{aprendiz.formacao_academica.map((formacao, index) => (
                                        <li key={index} title={formacao.name_Curso}>{formacao.name_Curso}</li>))
                                    }</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setFormacaoAcademica(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Cursos Complementares</h3>
                                    <ul>{aprendiz.cursos_complementares.map((curso, index) => (
                                        <li key={index} title={curso.name_Curso}>{curso.name_Curso}</li>))
                                    }</ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setCursoComplementar(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Idiomas</h3>
                                    <ul> {aprendiz.idiomas.map((idioma, index) => (
                                        <li key={index} title={idioma.nome_Idioma}>{idioma.nome_Idioma} - {idioma.nivel_Idioma}</li>))
                                    }</ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setIdioma(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                            </div>
                            <div className="dadosAprendiz-cards-inferiores">
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Soft Skills</h3>
                                    <ul>{aprendiz.soft_skills.map((skill, index) => (
                                        <li key={index} title={skill.nome_SoftSkills.join(", ")}>{skill.nome_SoftSkills.join(", ")}</li>))
                                    }</ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setSoftSkill(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Competências</h3>
                                    <ul>{aprendiz.competencias.map((competencia, index) => (
                                        <li key={index} title={`${competencia.nome_Competencia} - ${competencia.nivel_Competencia}`}>{competencia.nome_Competencia} - {competencia.nivel_Competencia}</li>))
                                    }</ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setCompetencia(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default PerfilAprendiz

function calcularIdade(dataNascimento:string){
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    if(mes < mesNascimento || (mes === mesNascimento && hoje.getDate() < nascimento.getDate())){
        idade--;
    }
    return idade;
}

function formatarTelefone(numero:string){
    return numero.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}