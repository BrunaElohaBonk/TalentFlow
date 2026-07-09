import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
<<<<<<< HEAD
=======
import './confirm_login.css'
>>>>>>> a63b585d3efbd6aba56feb6386fec5d1169813d3
import Header from '../../../components/header'
import './confirm_login.css'

function Confirm_login() {

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
            <img src={icon_user} alt="icon_user" className='icon_user'/>
            <input placeholder="EDV" className='input'></input>
        </div>
        <div className='password'>
            <img src={icon_cadeado} alt="icon_cadeado" className='icon_cadeado'/>
            <input placeholder="Password" className='input'></input>
        </div>
        <div className='confirm_password'>
            <img src={icon_cadeado} alt="icon_cadeado" className='icon_cadeado'/>
            <input placeholder="Confirm Password" className='input'></input>
        </div>

        <div className='button'>
            <button className='entrar'>ENTRAR</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Confirm_login