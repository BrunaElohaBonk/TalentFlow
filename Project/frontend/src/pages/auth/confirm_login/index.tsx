import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import Header from '../../../components/header'
import './confirm_login.css'

function Confirm_login() {

  return (
    <>
    <div>
      <Header></Header>
    </div>
    <div className='a'>
      <div className='b'>
        <div className='c'>
            <span className='d'>Seja bem-vindo(a)!</span>
        </div>

        <div className='e'>
            <img src={icon_user} alt="icon_user" className='h'/>
            <input placeholder="EDV" className='j'></input>
        </div>
        <div className='f'>
            <img src={icon_cadeado} alt="icon_cadeado" className='i'/>
            <input placeholder="Password" className='j'></input>
        </div>
        <div className='g'>
            <img src={icon_cadeado} alt="icon_cadeado" className='i'/>
            <input placeholder="Confirm Password" className='j'></input>
        </div>

        <div className='k'>
            <button className='l'>ENTRAR</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Confirm_login