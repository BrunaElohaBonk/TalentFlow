import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import Header from '../../../components/header'
import './login.css'
import { useNavigate } from "react-router-dom"
import Confirm_login from '../confirm_login'

function Login() {

  const navigate = useNavigate() 

  const handleNavigateConfirm_login = () => {
    navigate('/Confirm_login')
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
            <div className='img_icon'><img src={icon_user} alt="icon_user" className='icon'/></div>
            <input placeholder="EDV" className='input_login'></input>
          </div>
          <div className='password'>
            <div className='img_icon'><img src={icon_cadeado} alt="icon_cadeado" className='icon'/></div>
            <input placeholder="Password" className='input_login'></input>
          </div>

          <div className='button'>
            <button className='entrar' onClick={handleNavigateConfirm_login}>ENTRAR</button>
          </div>
      </div>
    </div>
    </>
  )
}

export default Login