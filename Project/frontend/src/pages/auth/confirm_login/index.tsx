import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'
import icon_logout from '../../../assets/img/icon_logout.png'
import Header from '../../../components/header'
import './confirm_login.css'
import { useNavigate } from "react-router-dom"

function Confirm_login() {

  const navigate = useNavigate() 

  const handleNavigateLogin = () => {
    navigate('/')
  }

  return (
    <>
    <div>
      <Header></Header>
    </div>
    <div className='logout'>
        <img src={icon_logout} alt="icon_logout" onClick={handleNavigateLogin}/>
      </div>
    <div className='a'>
      <div className='b'>
          <div className='c'>
            <span className='d'>Seja bem-vindo(a)!</span>
          </div>

          <div className='e'>
            <div className='h'><img src={icon_user} alt="icon_user" className='g'/></div>
            <input placeholder="EDV" className='i'></input>
          </div>
          <div className='f'>
            <div className='h'><img src={icon_cadeado} alt="icon_cadeado" className='g'/></div>
            <input placeholder="Password" className='i'></input>
          </div>
          <div className='f'>
            <div className='h'><img src={icon_cadeado} alt="icon_cadeado" className='g'/></div>
            <input placeholder="Confirm Password" className='i'></input>
          </div>

          <div className='j'>
            <button className='k'>ENTRAR</button>
          </div>
      </div>
    </div>
    </>
  )
}

export default Confirm_login