import Header from "../../../components/header"
import icon_logout from '../../../assets/img/icon_logout.png'
import { useNavigate } from "react-router-dom"
import './perfil.css'

function Perfil(){

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
        <div className="tela">
            <div className="bloco"></div>
        </div>
        </>
    )
}
export default Perfil