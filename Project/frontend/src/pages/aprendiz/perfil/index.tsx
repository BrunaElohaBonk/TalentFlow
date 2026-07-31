import Header from "../../../components/header"
import icon_logout from '../../../assets/img/icon_logout.png'
import { useEffect, useState } from "react";
import { useTheme } from '../../../context/themeContext'
import icon_editar from '../../../assets/img/icon_editar.png'
import icon_user from '../../../assets/img/icon_user.png'
import icon_olho from '../../../assets/img/icon_olho.png'
import Logout from '../../../components/logout/logout'
import SituacaoProfissional from "../situacao_profissional";
import EditarPerfil from '../../../components/editarPerfil'
import EditarSituacaoProfissional from "../situacao_profissional/editar/editar";
import FormacaoAcademica from "../formacao_academica";
import CursoComplementar from "../curso_complementar";
import Idioma from "../idioma";
import SoftSkill from "../soft_skill";
import Competencia from "../competencias";
import EditarFormacaoAcademica from '../formacao_academica/editar/editar_formacao'
import AdicionarFormacaoAcademica from "../formacao_academica/adicionar/adicionar";
import './perfil.css';
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

const formatarIdioma = (idioma: string) => {
    const idiomas: Record<string, string> = {
        ALEMAO: "Alemão",
        ARABE: "Árabe",
        COREANO: "Coreano",
        ESPANHOL: "Espanhol",
        FRANCES: "Francês",
        INGLES: "Inglês",
        ITALIANO: "Italiano",
        JAPONES: "Japonês",
        MANDARIM: "Mandarim",
        RUSSO: "Russo",
        TAILANDES: "Tailandês"
    };

    return idiomas[idioma] || idioma;
};
interface Usuario {
    edv: number;
    img: string;
    nome: string;
    email: string;
    user: string;
    contato: number;
    data_nascimento: string;
    tipo: string;
}
interface Perfil {
    id: Number,
    EDV_Aprendiz: number,
    situacao_profissional: ISituacaoProfissional[],
    soft_skills: SoftSkills[],
    competencia: Competencia[],
    formacao_academica: FormacaoAcademica[],
    cursos: Cursos[],
    idiomas: Idiomas[]
}
interface ISituacaoProfissional {
    id: number;
    bio_profissional: string;
};
interface SoftSkills {
    id: number;
    nome_SoftSkills: string;
}
interface Competencia {
    id: number;
    nome_Competencia: string;
}
interface Cursos {
    id: number;
    name_Curso: string;
}
interface Idiomas {
    id: number;
    nome_Idioma: string;
}


interface FormacaoAcademica {
    id: number;
    name_Curso: string;
    status_Academico: string;
}


function Telefone(numero: number | string) {
    const telefone = String(numero).replace(/\D/g, "");
    return telefone.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        "($1) $2-$3"
    );
}

function Idade(data_nascimento: string) {
    const [dia, mes, ano] = data_nascimento.split("/");
    const nascimento = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia)
    );
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }
    return idade;
}

function formatarData(data: string) {
    if (!data) return "";
    if (data.includes("T")) {
        const [ano, mes, dia] = data.split("T")[0].split("-");

        return `${dia}/${mes}/${ano}`;
    }
    if (data.includes("/")) {
        return data;
    }
    return "";
}

function Perfil() {
    const { darkMode, alternarTema } = useTheme();
    const [aprendiz, setAprendiz] = useState<Usuario | null>(null);
    const [apireq, setApireq] = useState<Perfil | null>(null)
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
    const navigate = useNavigate()
    const [idSituacao, setIdSituacao] = useState<number | null>(null);

    useEffect(() => {
        async function carregarPerfil() {
            const usuario = localStorage.getItem("usuario");
            const aprendizLogado = JSON.parse(usuario);
            setAprendiz({
                edv: aprendizLogado.user.EDV,
                img: aprendizLogado.user.imagem,
                nome: aprendizLogado.user.name,
                email: aprendizLogado.user.email_bosch,
                user: aprendizLogado.user.user_bosch,
                contato: aprendizLogado.user.contato,
                data_nascimento: aprendizLogado.user.data_nascimento,
                tipo: aprendizLogado.user.tipo
            });

            try {
                const response = await api.get(
                    `/aprendiz/meuPerfil/${aprendizLogado.user.EDV}`
                );

                setApireq(response.data.data);
                setIdSituacao(response.data.data.situacao_profissional[0].id);
            } catch (error) {
                console.error(error);
            }
        }

        carregarPerfil();
    }, []);

    if (!aprendiz) {

        navigate('/')
    }

    return (
        <>
            <div>
                <Header></Header>
            </div>

            <div className="confirm-logout">
                <img src={icon_logout} alt="icon_logout" onClick={() => setLogout(true)} />
            </div>
            <div className="perfilAprendiz-body">
                <label htmlFor="theme" className="theme">
                    <span className="theme__toggle-wrap">
                        <input id="theme" className="theme__toggle" type="checkbox" role="switch" name="theme" checked={darkMode} onChange={alternarTema} />
                        <span className="theme__fill"></span>
                        <span className="theme__icon">
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                        </span>
                    </span>
                </label>
            </div>
            <Logout visible={logout} setVisible={setLogout} />

            <SituacaoProfissional visible={situacao} setVisible={setSituacao} setEditarSituacao={setEditarSituacao} />
            <FormacaoAcademica visible={formacao_academica} setVisible={setFormacaoAcademica} setEditarFormacao={setEditarFormacao} setAdicionarFormacao={setAdicionarFormacao} />
            <CursoComplementar visible={curso_complementar} setVisible={setCursoComplementar} />
            <Idioma visible={idioma} setVisible={setIdioma} />
            <SoftSkill visible={soft_skill} setVisible={setSoftSkill} />
            <Competencia visible={competencia} setVisible={setCompetencia} />
            <EditarPerfil visible={editar} setVisible={setEditar} edv={aprendiz?.edv} />
            <EditarSituacaoProfissional visible={editarSituacao} setVisible={setEditarSituacao} setSituacaoProfissional={setSituacao} edv={aprendiz?.edv ?? 0} idSituacao={apireq?.situacao_profissional?.[0]?.id ?? 0} />
            <EditarFormacaoAcademica visible={editarFormacao} setVisible={setEditarFormacao} setFormacaoAcademica={setFormacaoAcademica} id={1} />
            <AdicionarFormacaoAcademica visible={adicionarFormacao} setVisible={setAdicionarFormacao} setFormacaoAcademica={setFormacaoAcademica} edv={aprendiz?.edv ?? 0} />

            <main className="perfil-tela">
                <section className="perfil-bloco">
                    <button
                        className="perfil-btn-editar"
                        onClick={() => setEditar(true)}
                    >
                        <img src={icon_editar} alt="Editar" />
                    </button>
                    <div className="perfil-topo">
                        <div className="perfil-foto-container">
                            <img src={icon_user} alt="icon_user" />
                        </div>
                        <div className="perfil-dados-perfil">
                            <div className="perfil-cabecalho-perfil">
                                <h1>{aprendiz?.nome}</h1>
                            </div>
                            <div className="perfil-informacoes">
                                <span>Email: {aprendiz?.email}</span>
                                <span>EDV: {aprendiz?.edv}</span>
                                <span>User: {aprendiz?.user}</span>
                                <span>Data de Nascimento: {formatarData(aprendiz?.data_nascimento)}</span>
                                <span>Idade: {Idade(formatarData(aprendiz?.data_nascimento))} anos</span>
                                <span>Contato: {Telefone(aprendiz?.contato)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="perfil-cards-superiores">
                        <div className="perfil-card-perfil">
                            <h3>Situação Profissional</h3>
                            <ul>{apireq?.situacao_profissional.map((situacao) => (
                                <li key={situacao.id}>
                                    {situacao.bio_profissional.slice(0, 50)}...
                                </li>
                            ))}
                            </ul>
                            <button className="perfil-btn-visualizar" onClick={() => setSituacao(true)}>
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Formação Acadêmica</h3>
                            <ul>
                                {apireq?.formacao_academica
                                    .slice(0, 2)
                                    .map((formacao, index) => (
                                        <li key={formacao.id}>
                                            {formacao.name_Curso} - {formacao.status_Academico}
                                            {index === 1 && apireq.formacao_academica.length > 2 && "..."}
                                        </li>
                                    ))
                                }
                            </ul>
                            <button
                                className="perfil-btn-visualizar"
                                onClick={() => setFormacaoAcademica(true)}
                            >
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Cursos Complementares</h3>
                            <ul>{apireq?.cursos
                                .slice(0, 2)
                                .map((curso) => (
                                    <li key={curso.id}>
                                        {curso.name_Curso}
                                    </li>
                                ))}
                            </ul>
                            <button className="perfil-btn-visualizar" onClick={() => setCursoComplementar(true)}>
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Idiomas</h3>
                            <ul>{apireq?.idiomas.slice(0, 2).map((idiomas) => (
                                <li key={idiomas.id}>
                                    {formatarIdioma(idiomas.nome_Idioma)}
                                </li>
                            ))}
                            </ul>
                            <button className="perfil-btn-visualizar" onClick={() => setIdioma(true)}>
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                    </div>
                    <div className="perfil-cards-inferiores">
                        <div className="perfil-card-perfil">
                            <h3>Soft Skills</h3>
                            <ul>{apireq?.soft_skills.slice(0, 2).map((skill) => (
                                <li key={skill.id}>
                                    {skill.nome_SoftSkills}
                                </li>
                            ))}
                            </ul>
                            <button className="perfil-btn-visualizar" onClick={() => setSoftSkill(true)}>
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Competências</h3>
                            <ul>{apireq?.competencia
                                .slice(0, 2)
                                .map((competencia) => (
                                    <li key={competencia.id}>
                                        {competencia.nome_Competencia}
                                    </li>
                                ))}
                            </ul>
                            <button className="perfil-btn-visualizar" onClick={() => setCompetencia(true)}>
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}

export default Perfil