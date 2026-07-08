import faixa from "../../assets/img/faixa.png";
import logo from "../../assets/img/logo.png";

function Header(){
    return(
        <div style={style.quadrado}>
            <img src={faixa} alt="faixa" />
            <div>
                <div>
                    <h1>OIII</h1>
                </div>
            </div>
            <div>
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
}

export default Header;

const style = {
    quadrado: {
        backgroundColor: 'blue'
    }
}