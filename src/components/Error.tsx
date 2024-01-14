import { Alert } from 'react-bootstrap';

export type IError = {
	status: boolean | null;
	message: string;
};

function ErrorComponent({ error }: { error: IError }) {
	return (
		<>
			{error.status === false ? (
				<Alert key='danger' variant='danger'>
					{error.message}
				</Alert>
			) : error.status === true ? (
				<Alert key='success' variant='success'>
					{error.message}
				</Alert>
			) : null}
		</>
	);
}

export default ErrorComponent;
