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
						This is a longer card with supporting
						text below as a natural lead-in to
						additional content. This content is a
						little bit longer.
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
