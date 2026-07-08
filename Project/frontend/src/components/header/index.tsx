import faixa from "../../assets/img/faixa.png";
import logo from "../../assets/img/logo.png";
import './header.css'

function Header(){
    return(
        <div className="header-body">
            <img src={faixa} alt="faixa" className="header-faixa"/>
            <div className="header-position">
                <img src={logo} alt="logo" className="header-logo"/>
            </div>
            <div className="header-final"></div>
        </div>
    );
}

export default Header;

