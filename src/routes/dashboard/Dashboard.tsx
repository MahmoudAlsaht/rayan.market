import { useParams } from 'react-router-dom';

function Dashboard() {
	const { adminId } = useParams();
	return <div>{adminId}</div>;
}

export default Dashboard;
