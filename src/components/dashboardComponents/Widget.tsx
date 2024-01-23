/* eslint-disable no-mixed-spaces-and-tabs */
import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type widgetProps = {
	widgetTitle: string | ReactNode;
	badge?: ReactNode;
	body?: ReactNode;
	className?: string;
	height?: string;
	href: string;
};

function Widget({
	widgetTitle,
	className,
	href,
	body,
	badge,
	height = '100px',
}: widgetProps) {
	const isTitleAString = typeof widgetTitle === 'string';

	return (
		<>
			<Link to={href}>
				<Card
					className={`widget ${className}`}
					style={{ height }}
				>
					<Card.Body>
						{isTitleAString ? (
							<Card.Title>
								{widgetTitle} {badge}
							</Card.Title>
						) : (
							<Card.Title
								className='text-center'
								style={{ fontSize: '50px' }}
							>
								{widgetTitle}
							</Card.Title>
						)}

						{body}

						<Card.Text>
							{isTitleAString && (
								<legend
									className='card-link lead'
									style={{ color: '#0055aa' }}
								>
									see more <BsArrowRight />
								</legend>
							)}
						</Card.Text>
					</Card.Body>
				</Card>
			</Link>
		</>
	);
}

export default Widget;
