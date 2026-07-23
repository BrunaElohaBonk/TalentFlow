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
import { aprendizes } from "../verAprendiz/aprendizes";


function PerfilAprendiz(){
    const navigate = useNavigate()
    const { edv } = useParams();
    type Aprendiz = (typeof aprendizes)[number];
    const [aprendiz, setAprendiz] = useState<Aprendiz | null>(null)
    const [situacao, setSituacao] = useState(false)
    const [formacao_academica, setFormacaoAcademica] = useState(false)
    const [curso_complementar, setCursoComplementar] = useState(false)
    const [idioma, setIdioma] = useState(false)
    const [soft_skill, setSoftSkill] = useState(false)
    const [competencia, setCompetencia] = useState(false)
    useEffect(() => {
        const dados = aprendizes.find(
            a => a.perfil.edv === Number(edv)
        );

        if (dados) {
            setAprendiz(dados);
        }
    }, [edv]);
    if (!aprendiz) {
        return <h2>Carregando...</h2>;
    }

    return(
        <div className="dadosAprendiz">
            <Header></Header>
            <SituacaoProfissional visible={situacao} setVisible={setSituacao} situacao={aprendiz.situacaoProfissional}/>
            <FormacaoAcademica visible={formacao_academica} setVisible={setFormacaoAcademica} formacaoAcademica={aprendiz.formacaoAcademica}/>
            <CursoComplementar visible={curso_complementar} setVisible={setCursoComplementar} cursoComplementar={aprendiz.cursosComplementares}/>
            <Idioma visible={idioma} setVisible={setIdioma} idiomas={aprendiz.idiomas}/>
            <SoftSkill visible={soft_skill} setVisible={setSoftSkill} softSkills={aprendiz.softskills}/>
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
                                    <div className="dadosAprendiz-cabecalho-perfil"><h1>{aprendiz.perfil.nome}</h1></div>
                                    <div className="dadosAprendiz-informacoes">
                                        <span>Email: {aprendiz.perfil.email}</span>
                                        <span>EDV: {aprendiz.perfil.edv}</span>
                                        <span>User: {aprendiz.perfil.user}</span>
                                        <span>Data de Nascimento: {aprendiz.perfil.nascimento.toLocaleDateString("pt-BR")}</span>
                                        <span>Idade: {calcularIdade(aprendiz.perfil.nascimento)} anos</span>
                                        <span>Contato: {formatarTelefone(aprendiz.perfil.contato)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dadosAprendiz-cards-superiores">
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Situação Profissional</h3>
                                    <ul><li>{aprendiz.situacaoProfissional.descricaoEstagio}</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setSituacao(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Formação Acadêmica</h3>
                                    <ul><li>{aprendiz.formacaoAcademica.map((formacao, index) => (
                                        <li key={index} title={formacao.nomeCurso}>{formacao.nomeCurso}</li>))
                                    }</li></ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setFormacaoAcademica(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Cursos Complementares</h3>
                                    <ul>{aprendiz.cursosComplementares.map((curso, index) => (
                                        <li key={index} title={curso.nomeCurso}>{curso.nomeCurso}</li>))
                                    }</ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setCursoComplementar(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Idiomas</h3>
                                    <ul> {aprendiz.idiomas.map((idioma, index) => (
                                        <li key={index} title={idioma.idioma}>{idioma.idioma} - {idioma.nivel}</li>))
                                    }</ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setIdioma(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                            </div>
                            <div className="dadosAprendiz-cards-inferiores">
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Soft Skills</h3>
                                    <ul>{aprendiz.softskills.map((skill, index) => (
                                        <li key={index} title={skill.nome}>{skill.nome}</li>))
                                    }</ul>
                                    <button className="dadosAprendiz-btn-visualizar" onClick={() => setSoftSkill(true)}><img src={icon_olho} alt="Visualizar" /></button>
                                </div>
                                <div className="dadosAprendiz-card-perfil">
                                    <h3>Competências</h3>
                                    <ul>{aprendiz.competencias.map((competencia, index) => (
                                        <li key={index} title={`${competencia.nome} - ${competencia.nivel}`}>{competencia.nome} - {competencia.nivel}</li>))
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