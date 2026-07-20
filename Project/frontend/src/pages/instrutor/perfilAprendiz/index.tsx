import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './perfilAprendiz.css'

function PerfilAprendiz(){
    return(
        <div className="dadosAprendiz">
            <Header></Header>
            <div className="dadosAprendiz-container">
                <Sidebar></Sidebar>
                <div className="dadosAprendiz-body">
                
                </div>
            </div>
        </div>
    )
}
export default PerfilAprendiz