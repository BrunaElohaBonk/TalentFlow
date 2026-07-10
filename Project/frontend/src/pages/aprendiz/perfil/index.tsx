import Header from "../../../components/header"
import icon_logout from '../../../assets/img/icon_logout.png'
import { useNavigate } from "react-router-dom"
import './perfil.css'
import { useState } from "react";
import icon_editar from '../../../assets/img/icon_editar.png'
import icon_user from '../../../assets/img/icon_user.png'
import icon_olho from '../../../assets/img/icon_olho.png'

function Perfil(){
    interface Aprendiz {
        edv: number;
        img: string;
        name: string;
        email: string;
        user: string;
        contato: number;
        nascimento: Date;
    }

    const [aprendiz, setAprendiz] = useState<Aprendiz>({
        edv: 12345678,
        img: "foto.png",
        name: "Lays Arceles de Souza",
        email: "lays.arceles@br.bosch.com",
        user: "SLO7CT",
        contato: 41991234567,
        nascimento: new Date("11/10/2005"),
    });

    const navigate = useNavigate() 

  const handleNavigateLogin = () => {
    navigate('/')
  }

    return(
        <>
        <div>
            <Header></Header>
        </div>
        <div className='logout'>
            <img src={icon_logout} alt="icon_logout" onClick={handleNavigateLogin}/>
        </div>
        <main className="tela">
            <section className="bloco">
                <div className="perfil-topo">
                    <div className="foto-container">
                        <img src={icon_user} alt="Usuário" className="foto-perfil"/>
                    </div>
                    <div className="dados-perfil">
                        <div className="cabecalho-perfil">
                            <h1>{aprendiz.name}</h1>
                            <button className="btn-editar" onClick={() => navigate(`/Editar/${aprendiz.edv}`)}><img src={icon_editar} alt="Editar" /></button>
                        </div>
                        <div className="informacoes">
                            <span>Email: {aprendiz.email}</span>
                            <span>EDV: {aprendiz.edv}</span>
                            <span>User: {aprendiz.user}</span>
                            <span>Data de Nascimento: {aprendiz.nascimento.toLocaleDateString("pt-BR")}</span>
                            <span>Idade: {Idade(aprendiz.nascimento)} anos</span>
                            <span>Contato: {Telefone(aprendiz.contato)}</span>
                        </div>
                    </div>
                </div>

                <div className="cards-superiores">

                <div className="card-perfil">
                    <h3>Situação Profissional</h3>
                    <ul><li>Descrição da situação atual e das expectativas para o futuro.</li></ul>
                    <button className="btn-visualizar"><img src="icon_olho" alt="olho" /></button>
                </div>
                <div className="card-perfil">
                    <h3>Formação Acadêmica</h3>
                    <ul>
                        <li>Técnico em Informática</li>
                        <li>ADS (cursando)</li>
                    </ul>

                    <button className="btn-visualizar">
                        👁
                    </button>
                </div>

                <div className="card-perfil">
                    <h3>Cursos Complementares</h3>

                    <ul>
                        <li>Power BI</li>
                        <li>Excel</li>
                    </ul>

                    <button className="btn-visualizar">
                        👁
                    </button>
                </div>

                <div className="card-perfil">
                    <h3>Idiomas</h3>

                    <ul>
                        <li>Português</li>
                        <li>Inglês B1</li>
                    </ul>

                    <button className="btn-visualizar">
                        👁
                    </button>
                </div>

            </div>
            </section>
        </main>
        </>
    )
}
export default Perfil

function Telefone(numero: number) {
    const telefone = numero.toString();
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/,"($1)$2-$3");
}

function Idade(dataNascimento: Date) {
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