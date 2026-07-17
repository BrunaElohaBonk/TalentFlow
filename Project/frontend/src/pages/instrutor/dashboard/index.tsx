import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"

function Dashboard(){
    return(
        <div>
            <Header></Header>
            <div className="home-container">
                <Sidebar/>
                <div className="home-body">
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard