import { useEffect } from 'react';
import { fetchUser } from '../controllers/user';
import { IUser } from '../app/auth/auth';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';

type widgetProps = {
	widgetTitle: string;
};

function Widget({ widgetTitle }: widgetProps) {
	const dispatch = useAppDispatch();

	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const navigate = useNavigate();

	const handleWidgetsClick = (title: string) => {
		if (title === 'settings') {
			navigate(
				`/account/profile/${user?.profile}/account-setting`,
			);
		} else {
			navigate(`/dashboard/settings/${title}`);
		}
	};

	return (
		<>
			<Card
				className='widget'
				onClick={() => handleWidgetsClick(widgetTitle)}
			>
				<Card.Body>
					<Card.Title>{widgetTitle}</Card.Title>
					<Card.Text>
						This is a longer card with supporting
						text below as a natural lead-in to
						additional content. This content is a
						little bit longer.
						<legend
							className='card-link lead'
							style={{ color: '#0055aa' }}
						>
							see more <BsArrowRight />
						</legend>
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

export default Widget;
