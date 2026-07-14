import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"

function VerTurma(){
    return(
        <div>
            <Header></Header>
            <div className="turma-container">
                <Sidebar />
            </div>
        </div>
    )
}
export default VerTurma