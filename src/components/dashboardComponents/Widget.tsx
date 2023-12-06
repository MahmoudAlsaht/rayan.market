import { Card } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type widgetProps = {
	widgetTitle: string;
	className?: string;
	href: string;
};

function Widget({ widgetTitle, className, href }: widgetProps) {
	return (
		<>
			<Card className={`widget ${className}`}>
				<Card.Body>
					<Card.Title>{widgetTitle}</Card.Title>
					<Card.Text>
						<Link to={href}>
							<legend
								className='card-link lead'
								style={{ color: '#0055aa' }}
							>
								see more <BsArrowRight />
							</legend>
						</Link>
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

export default Widget;
