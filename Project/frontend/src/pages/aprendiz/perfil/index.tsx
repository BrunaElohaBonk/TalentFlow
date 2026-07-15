import Header from "../../../components/header"
import icon_logout from '../../../assets/img/icon_logout.png'
import { useNavigate } from "react-router-dom"
import './perfil.css'
import { useEffect, useState } from "react";
import icon_editar from '../../../assets/img/icon_editar.png'
import icon_user from '../../../assets/img/icon_user.png'
import icon_olho from '../../../assets/img/icon_olho.png'
import Logout from '../../../components/logout/logout'
import SituacaoProfissional from "../../../components/situacao_profissional";

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

function converterData(data: string) {
    const [dia, mes, ano] = data.split("/")
    return new Date(Number(ano), Number(mes) - 1, Number(dia))
}

function calcularIdade(dataNascimento: Date) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();

    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())
    ) {
        idade--;
    }

    return idade;
}

function formatarTelefone(numero: number) {
    const telefone = numero.toString();
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3");
}

function Perfil() {

    const [aprendiz, setAprendiz] = useState<Usuario | null>(null)

    const navigate = useNavigate()

    const [logout, setLogout] = useState(false)
    const [situacao, setSituacao] = useState(false)

    // TEMPORÁRIO - REMOVER NA INTEGRAÇÃO COM BACKEND
    // Os dados do usuário estão sendo recuperados do localStorage.
    // Após a integração, substituir pela requisição da API.
    useEffect(() => {

        const usuario = localStorage.getItem("usuarioLogado")

        if (usuario) {
            setAprendiz(JSON.parse(usuario))
        }

    }, [])

    if (!aprendiz) {
        return <h2>Carregando...</h2>
    }

    return (
        <>
            <div>
                <Header></Header>
            </div>

            <div className="confirm-logout">
                <img src={icon_logout} alt="icon_logout" onClick={() => setLogout(true)}/>
            </div>

            <Logout visible={logout} setVisible={setLogout}/>
            <SituacaoProfissional visible={situacao} setVisible={setSituacao}/>

            <main className="perfil-tela">
                <section className="perfil-bloco">
                    <button
                        className="perfil-btn-editar"
                        onClick={() => navigate(`/Editar/${aprendiz.edv}`)}
                    >
                        <img src={icon_editar} alt="Editar" />
                    </button>
                    <div className="perfil-topo">
                        <div className="perfil-foto-container">
                            <img src={icon_user} alt="icon_user" />
                        </div>
                        <div className="perfil-dados-perfil">
                            <div className="perfil-cabecalho-perfil">
                                <h1>{aprendiz.nome}</h1>
                            </div>
                            <div className="perfil-informacoes">
                                <span>Email: {aprendiz.email}</span>
                                <span>EDV: {aprendiz.edv}</span>
                                <span>User: {aprendiz.user}</span>
                                <span>Data de Nascimento: {aprendiz.dataNascimento}</span>
                                <span>Idade: {calcularIdade(converterData(aprendiz.dataNascimento))} anos</span>
                                <span>Contato: {formatarTelefone(aprendiz.contato)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="perfil-cards-superiores">
                        <div className="perfil-card-perfil">
                            <h3>Situação Profissional</h3>
                            <ul>
                                <li>Descrição da situação atual e das expectativas para o futuro.</li>
                            </ul>
                            <button className="perfil-btn-visualizar" onClick={() => setSituacao(true)}>
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Formação Acadêmica</h3>
                            <ul>
                                <li>Técnico em Informática</li>
                                <li>ADS (cursando)</li>
                            </ul>
                            <button className="perfil-btn-visualizar">
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Cursos Complementares</h3>
                            <ul>
                                <li>Power BI</li>
                                <li>Excel</li>
                            </ul>
                            <button className="perfil-btn-visualizar">
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Idiomas</h3>
                            <ul>
                                <li>Português</li>
                                <li>Inglês B1</li>
                            </ul>
                            <button className="perfil-btn-visualizar">
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                    </div>
                    <div className="perfil-cards-inferiores">
                        <div className="perfil-card-perfil">
                            <h3>Soft Skills</h3>
                            <ul>
                                <li>Comunicação</li>
                                <li>Trabalho em equipe</li>
                            </ul>
                            <button className="perfil-btn-visualizar">
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                        <div className="perfil-card-perfil">
                            <h3>Competências</h3>
                            <ul>
                                <li>Análise de dados</li>
                                <li>Gestão de projetos</li>
                            </ul>
                            <button className="perfil-btn-visualizar">
                                <img src={icon_olho} alt="Visualizar" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Perfil