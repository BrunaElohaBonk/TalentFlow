import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import icon_olho from '../../../assets/img/icon_olho.png'
import icon_olho_fechado from '../../../assets/img/icon_olho_fechado.png'
import Header from '../../../components/header'
import Swal from 'sweetalert2'
import './login.css'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'

function Login() {
  const [edv, setEdv] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // EXCLUIR AQUI NO BACKEND
  // Esses dados vão vir do banco de dados através da API
  // TEMPORÁRIO - REMOVER NA INTEGRAÇÃO COM BACKEND
const usuario = [
  {
    nome: "Bruna",
    edv: "92",
    senha: "21/08/2006",
    dataNascimento: "21/08/2006",
    tipo: "aprendiz"
  },
  {
    nome: "Las",
    edv: "90",
    senha: "Carlos123@",
    dataNascimento: "01012000",
    tipo: "instrutor"
  }
]

  const navigate = useNavigate() 

  const handleLogin = async () => {
    // TEMPORÁRIO - REMOVER NA INTEGRAÇÃO COM BACKEND
    const usuarioEncontrado = usuario.find(
      (usuario) => usuario.edv === edv && usuario.senha === password
    )
    if (usuarioEncontrado) {

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
    
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'EDV ou senha inválidos!',
        confirmButtonColor: '#2B83D5',
        confirmButtonText: 'OK'
      })
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
            <input type='text' inputMode='numeric' maxLength={8} placeholder="EDV" className='input_login' value={edv} onChange={(e) => setEdv(e.target.value.replace(/[^0-9]/g, ""))}></input>
          </div>

          <div className='password'>
            <div className='img_icon'>
              <img src={icon_cadeado} alt="icon_cadeado" className='icon'/>
            </div>
            <input type={showPassword ? "text" : "password"} placeholder="Password" className='input_login' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <img src={showPassword ? icon_olho_fechado : icon_olho} alt="Visualizar senha" className='eye-icon' onClick={() => setShowPassword(!showPassword)}/>
          </div>

          <div className="forgot-password">
            <span>Esqueceu a senha? </span>
            <span className="forgot-link">Clique aqui</span>
          </div>

          <div className='button'>
            <button className='entrar' onClick={handleLogin}>
              ENTRAR
            </button>
          </div>
      </div>
    </div>
    </>
  )
}

export default Login