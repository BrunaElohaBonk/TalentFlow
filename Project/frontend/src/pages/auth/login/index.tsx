import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import './index.css'
import Header from '../../../components/header'

function Login() {

  return (
    <>
    <div>
      <Header></Header>
    </div>
    <div className='container'>
        <div className='titulo'>
          <span className='span'>Seja bem-vindo(a)!</span>
        </div>

        <div className='input-container'>
          <img src={icon_user} alt="icon_user" className='icon'/>
          <input placeholder="EDV" className='input'></input>
        </div>

        <div className='input-container'>
          <img src={icon_cadeado} alt="icon_cadeado" className='icon'/>
          <input placeholder="Password" className='input'></input>
        </div>

        <div>
          <button className='button'>ENTRAR</button>
        </div>
    </div>
    </>
  )
}

export default Login