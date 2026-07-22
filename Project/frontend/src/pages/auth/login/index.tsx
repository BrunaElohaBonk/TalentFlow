import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import icon_olho from '../../../assets/img/icon_olho.png'
import icon_olho_fechado from '../../../assets/img/icon_olho_fechado.png'
import Header from '../../../components/header'
import Swal from 'sweetalert2'
import './login.css'
import { useNavigate } from "react-router-dom"
import { useRef, useState } from 'react'
import { useAuth } from "../../../context/authContext";

interface Usuario {
    edv: string;
    img: string;
    nome: string;
    email: string;
    user: string;
    contato: number;
    dataNascimento: string;
    tipo: "instrutor" | "aprendiz";
    senha: string;
}

function Login() {
  const [edv, setEdv] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth();
  const edvRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const proximoCampo = (e: React.KeyboardEvent<HTMLInputElement>, proximo: React.RefObject<HTMLElement | null>) => {
    if (e.key === "Enter") {
        e.preventDefault();
        proximo.current?.focus();
    }};
  // EXCLUIR AQUI NO BACKEND
  // Esses dados vão vir do banco de dados através da API
  // TEMPORÁRIO - REMOVER NA INTEGRAÇÃO COM BACKEND
const usuario: Usuario[] = [
  {
    edv: "92906829",
    img: "",
    nome: "Bruna Elohá Bonk",
    email: "bruna@bosch.com",
    user: "BOB1CT",
    contato: 42999830200,
    dataNascimento: "21/08/2006",
    tipo: "aprendiz",
    senha: "123"
  },
  {
    nome: "Lasnine Miranda",
    email: "lasnine@bosch.com",
    edv: "92906812",
    user: "SLN6CT",
    contato: 41995325493,
    dataNascimento: "08/01/2008",
    tipo: "instrutor",
    senha: "123",
    img: ""
  },
  {
    nome: "Mariana Ferreira Costa",
    email: "mariana.costa@bosch.com",
    edv: "92906813",
    user: "MFC7CT",
    contato: 41996543218,
    dataNascimento: "15/04/1997",
    tipo: "instrutor",
    senha: "123",
    img: ""
  },
  {
    nome: "Rafael Henrique Costa",
    email: "rafael.costa@bosch.com",
    edv: "92906814",
    user: "RHC8CT",
    contato: 41997865432,
    dataNascimento: "22/09/1994",
    tipo: "instrutor",
    senha: "123",
    img: ""
  }
]

  const navigate = useNavigate() 

  const handleLogin = async () => {
    if (edv === "") {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Informe o EDV.",
        confirmButtonColor: "#2B83D5",
        confirmButtonText: "OK"
      })
      return
    }
    if (password === "") {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Informe a senha.",
        confirmButtonColor: "#2B83D5",
        confirmButtonText: "OK"
      })
      return
    }
    const usuarioEncontrado = usuario.find(
      (usuario) => usuario.edv === edv && usuario.senha === password
    )
    if (!usuarioEncontrado) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "EDV ou senha inválidos.",
        confirmButtonColor: "#2B83D5",
        confirmButtonText: "OK"
      })
      return
    }
    if (usuarioEncontrado) {
      login(usuarioEncontrado);

      if (password === usuarioEncontrado.dataNascimento) {
        navigate('/Confirm_login')
        return
      }

      if (usuarioEncontrado.tipo === "aprendiz") {
        navigate('/Perfil')
        return
      }

      if (usuarioEncontrado.tipo === "instrutor") {
        navigate('/Home')
        return
      }
    }
  }

  return (
    <>
    <div>
      <Header></Header>
    </div>
    <div className='body'>
      <div className='container'>
          <div className='titulo'>
            <span className='span'>Seja bem-vindo(a)!</span>
          </div>
          <div className='edv'>
            <div className='img_icon'>
              <img src={icon_user} alt="icon_user" className='icon'/>
            </div>
            <input ref={edvRef} type='text' inputMode='numeric' maxLength={8} placeholder="EDV" className='input_login' value={edv} onChange={(e) => setEdv(e.target.value.replace(/[^0-9]/g, ""))} onKeyDown={(e) => proximoCampo(e, senhaRef)}></input>
          </div>
          <div className='password'>
            <div className='img_icon'>
              <img src={icon_cadeado} alt="icon_cadeado" className='icon'/>
            </div>
            <input ref={senhaRef} type={showPassword ? "text" : "password"} placeholder="Password" className='input_login' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => proximoCampo(e, enterRef)}></input>
            <img src={showPassword ? icon_olho_fechado : icon_olho} alt="Visualizar senha" className='eye-icon' onClick={() => setShowPassword(!showPassword)}/>
          </div>
          <div className="forgot-password">
            <span>Esqueceu a senha? </span>
            <span className="forgot-link">Clique aqui</span>
          </div>
          <div className='button'>
            <button ref={enterRef} className='entrar' onKeyDown={(e) => {if (e.key === "Enter") {handleLogin();}}}>
              ENTRAR
            </button>
          </div>
      </div>
    </div>
    </>
  )
}

export default Login