import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import Header from '../../../components/header'
import './login.css'

function Login() {

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
            <div className='img_icon'><img src={icon_user} alt="icon_user" className='icon_user'/></div>
            <input placeholder="EDV" className='input_login'></input>
          </div>
          <div className='password'>
            <div className='img_icon'><img src={icon_cadeado} alt="icon_cadeado" className='icon_cadeado'/></div>
            <input placeholder="Password" className='input_login'></input>
          </div>

          <div className='button'>
            <button className='entrar'>ENTRAR</button>
          </div>
      </div>
    </div>
    </>
  )
}

export default Login