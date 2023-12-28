import { Col, Row } from 'react-bootstrap';
import ContactInformation from './ContactInformation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { TProfile } from '../../app/auth/profile';
import { useEffect } from 'react';
import { fetchUser } from '../../controllers/user';
import { fetchProfile } from '../../controllers/profile';

function Information({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);
	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchProfile(user?.profile));
	}, [dispatch, user?.profile]);

	return (
		<>
			<Row>
				<ContactInformation
					handleStep={handleStep}
					profile={profile}
				/>
				<Col
					xs={{ order: 'first' }}
					md={{ order: 'last' }}
					className='cartSummary'
				>
					// TODO: Add Cart Summary Cart Summary
				</Col>
			</Row>
		</>
	);
}

export default Information;
