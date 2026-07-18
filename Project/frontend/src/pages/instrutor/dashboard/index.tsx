import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import "./dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">
    <Header />

    <div className="dashboard-content">
        <Sidebar />

        <div className="home-body">

        </div>
    </div>
</div>
    );
}

export default Dashboard;