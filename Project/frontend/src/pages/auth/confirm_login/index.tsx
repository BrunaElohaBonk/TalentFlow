import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import icon_logout from '../../../assets/img/icon_logout.png'
import icon_olho from '../../../assets/img/icon_olho.png'
import icon_olho_fechado from '../../../assets/img/icon_olho_fechado.png'
import Header from '../../../components/header'
import Logout from '../../../components/logout/logout'
import Swal from 'sweetalert2'
import './confirm_login.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api from '../../../services/api'

async function Confirm_login() {
  const navigate = useNavigate()

  const [edv, setEdv] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [logout, setLogout] = useState(false)


  // const usuario = {
  //   nome: "Bruna",
  //   dataNascimento: "21/08/2006"
  // }
  const usuario = await api.post
   await api.post("/auth/primeiroAcesso", {
    EDV: edv,
    password: password,
    confirmPassword: confirmPassword,
  });

  const validarSenha = () => {
    const temMaiuscula = /[A-Z]/.test(password)
    const temMinuscula = /[a-z]/.test(password)
    const temNumero = /[0-9]/.test(password)
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if(edv === "") {
      return "Informe o EDV."
    }

    if(password.length < 10) {
      return "A senha deve possuir no mínimo 10 caracteres."
    }

    if(password === usuario.dataNascimento) {
      return "A senha não pode ser igual a data de nascimento."
    }

    if(password.toLowerCase() === usuario.nome.toLowerCase()) {
      return "A senha não pode ser igual ao nome."
    }

    if(!temMaiuscula) {
      return "A senha deve possuir uma letra maiúscula."
    }

    if(!temMinuscula) {
      return "A senha deve possuir uma letra minúscula."
    }

    if(!temNumero) {
      return "A senha deve possuir um número."
    }

    if(!temEspecial) {
      return "A senha deve possuir um caractere especial."
    }

    if(password !== confirmPassword) {
      return "As senhas não são iguais."
    }

    return null
  }

  const handleConfirmPassword = () => {
    const erro = validarSenha()

    if (erro) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: erro,
        confirmButtonColor: '#2B83D5',
        confirmButtonText: 'OK'
      })
    
      return
    }

    Swal.fire({
      icon: 'success',
      title: 'Senha alterada!',
      text: 'Sua senha foi cadastrada com sucesso.',
      confirmButtonColor: '#2B83D5',
      confirmButtonText: 'Continuar'
    }).then(() => {
      navigate('/Perfil')
    })
    navigate('/Perfil')
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

    <div className="confirm-body">
      <div className="confirm-container">

        <div className="confirm-titulo">
          <span className="confirm-span">Seja bem-vindo(a)!</span>
        </div>

        <div className="confirm-edv">
          <div className="confirm-img-icon">
            <img src={icon_user} alt="icon_user" className="confirm-icon"/>
          </div>
          <input placeholder="EDV" className="confirm-input-login" value={edv} onChange={(e)=>setEdv(e.target.value.replace(/[^0-9]/g,""))}/>
        </div>

        <div className="confirm-password">
          <div className="confirm-img-icon">
            <img src={icon_cadeado} alt="icon_cadeado" className="confirm-icon"/>
          </div>
          <input type={showPassword ? "text" : "password"} placeholder="Nova Password" className="confirm-input-login" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <img src={showPassword ? icon_olho_fechado : icon_olho} alt="Visualizar senha" className="confirm-eye-icon" onClick={()=>setShowPassword(!showPassword)}/>
        </div>

        <div className="confirm-password">
          <div className="confirm-img-icon">
            <img src={icon_cadeado} alt="icon_cadeado" className="confirm-icon"/>
          </div>
          <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="confirm-input-login" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <img src={showConfirmPassword ? icon_olho_fechado : icon_olho} alt="Visualizar senha" className="confirm-eye-icon" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>
        </div>

        <div className="confirm-button">
          <button className="confirm-entrar" onClick={handleConfirmPassword}>ENTRAR</button>
        </div>

      </div>
    </div>
    </>
  )
}

export default Confirm_login