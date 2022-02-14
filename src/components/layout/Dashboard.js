import Clients from "../clients/Clients";
import Sidebar from "./Sidebar";
import { useUser } from 'reactfire';

const Dashboard = () => {
  const { status, data: user } = useUser();

  return (
    <div className="row">
      <div className="col-md-10">
        <Clients />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  )
};

export default Dashboard;
