import { Form } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

type ButtonProps = {
	body: string;
	variant: string;
	type: string;
	className?: string;
	isLoading?: boolean;
};

function LoadingButton({
	body,
	variant,
	type,
	className,
	isLoading = false,
}: ButtonProps) {
	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<Form.Control
					className={`${className} btn btn-outline-${variant}`}
					value={body}
					type={type}
				/>
			)}
		</>
	);
}

export default LoadingButton;
