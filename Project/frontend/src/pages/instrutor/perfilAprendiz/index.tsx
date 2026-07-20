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
interface Usuario {
    edv: number;
    img: string;
    nome: string;
    email: string;
    user: string;
    contato: number;
    dataNascimento: string;
    tipo: string;
}

function PerfilAprendiz(){
    const [aprendiz, setAprendiz] = useState<Usuario | null>(null)
        const [logout, setLogout] = useState(false)
        const [situacao, setSituacao] = useState(false)
        const [formacao_academica, setFormacaoAcademica] = useState(false)
        const [curso_complementar, setCursoComplementar] = useState(false)
        const [idioma, setIdioma] = useState(false)
        const [soft_skill, setSoftSkill] = useState(false)
        const [competencia, setCompetencia] = useState(false)
        const [editar, setEditar] = useState(false)
        const [editarSituacao, setEditarSituacao] = useState(false)
        const [editarFormacao, setEditarFormacao] = useState(false)
        const [adicionarFormacao, setAdicionarFormacao] = useState(false)

        useEffect(() => {
            const usuario:any = localStorage.getItem("usuario")
            const aprendizLogado = JSON.parse(usuario)
            console.log(aprendizLogado)
            setAprendiz(aprendizLogado)
        }, [])
        if (!aprendiz) {
            return <h2>Carregando...</h2>
        }

    return(
        <div className="dadosAprendiz">
            <Header></Header>
            <SituacaoProfissional visible={situacao} setVisible={setSituacao} setEditarSituacao={setEditarSituacao}/>
            <FormacaoAcademica visible={formacao_academica} setVisible={setFormacaoAcademica} setEditarFormacao={setEditarFormacao} setAdicionarFormacao={setAdicionarFormacao}/>
            <CursoComplementar visible={curso_complementar} setVisible={setCursoComplementar}/>
            <Idioma visible={idioma} setVisible={setIdioma}/>
            <SoftSkill visible={soft_skill} setVisible={setSoftSkill}/>
            <Competencia visible={competencia} setVisible={setCompetencia}/>
        
            <div className="dadosAprendiz-container">
                <Sidebar></Sidebar>
                <div className="dadosAprendiz-body">
                    <main className="dadosAprendiz-tela">
                        <section className="dadosAprendiz-bloco">
                            <div className="dadosAprendiz-topo">
                                <div className="dadosAprendiz-foto-container"><img src={icon_user} alt="icon_user" /></div>
                                <div className="dadosAprendiz-dados-perfil">
                                    <div className="dadosAprendiz-cabecalho-perfil"><h1>{aprendiz.nome}</h1></div>
                                    <div className="dadosAprendiz-informacoes">
                                        <span>Email: {aprendiz.email}</span>
                                        <span>EDV: {aprendiz.edv}</span>
                                        <span>User: {aprendiz.user}</span>
                                        <span>Data de Nascimento: {aprendiz.dataNascimento}</span>
                                        <span>Idade: {calcularIdade(converterData(aprendiz.dataNascimento))} anos</span>
                                        <span>Contato: {formatarTelefone(aprendiz.contato)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dadosAprendiz-cards-superiores">
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Situação Profissional</h3>
                                    <ul><li>Descrição da situação atual e das expectativas para o futuro.</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setSituacao(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Formação Acadêmica</h3>
                                    <ul><li>Técnico em Informática</li><li>ADS (cursando)</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setFormacaoAcademica(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Cursos Complementares</h3>
                                    <ul><li>Power BI</li><li>Excel</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setCursoComplementar(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Idiomas</h3>
                                    <ul><li>Português</li><li>Inglês B1</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setIdioma(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                            </div>
                            <div className="dadosAprendiz-cards-inferiores">
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Soft Skills</h3>
                                    <ul><li>Comunicação</li><li>Trabalho em equipe</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setSoftSkill(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Competências</h3>
                                    <ul><li>Análise de dados</li><li>Gestão de projetos</li></ul>
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

function converterData(data: string) {
    const [dia, mes, ano] = data.split("/")
    return new Date(Number(ano), Number(mes) - 1, Number(dia))
}

function calcularIdade(dataNascimento: Date) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    if ( mesAtual < mesNascimento ||(mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    return idade;
}

function formatarTelefone(numero: number) {
    const telefone = numero.toString();
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3");
}