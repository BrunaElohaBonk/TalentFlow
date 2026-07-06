import faixa from "../../assets/img/faixa.png";
import logo from "../../assets/img/logo.png";

function Header(){
    return(
        <div style={quadrado}>
            <img src={faixa} alt="faixa" />
            <div>
                <div>

                </div>
            </div>
            <div>
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
}

export default Header;

const quadrado = {
    
}