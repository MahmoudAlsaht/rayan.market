import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export type IError = {
	status: boolean | null;
	message: string;
};

function ErrorComponent({ error }: { error: IError }) {
	return (
		<main dir='rtl'>
			<Stack sx={{ my: 3 }}>
				{error.status === false ? (
					<Alert severity='warning'>
						{error.message}.
					</Alert>
				) : error.status === true ? (
					<Alert severity='success'>
						{error.message}.
					</Alert>
				) : null}
			</Stack>
		</main>
	);
}

export default ErrorComponent;
