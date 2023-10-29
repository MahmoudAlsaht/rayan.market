import { useParams } from 'react-router-dom';
import '../../assets/styles/Dashboard.css';

function Dashboard() {
	const { adminId } = useParams();
	return <div>{adminId}</div>;
}

export default Dashboard;
