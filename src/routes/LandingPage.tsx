import '../assets/styles/LandingPage.css';
import { Col, Image, Row } from 'react-bootstrap';
import coverImg from '../mStoreCoverImg.jpeg';
import { BsArrowRight } from 'react-icons/bs';

export default function LandingPage() {
	return (
		<Row className='LandingContainer'>
			<Col
				sm={12}
				md={6}
				className='welcomeSection d-flex flex-column align-items-center justify-content-center'
			>
				<h1 className=''>Welcome</h1>
				<p className='text-center w-50'>
					Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Perspiciatis qui nulla
					labore reiciendis itaque fuga, aperiam
					consectetur quo vitae corporis, voluptatibus,
					quia quod laudantium praesentium nihil est
					accusamus cupiditate hic?
				</p>
				<a href='/home'>
					Take a look <BsArrowRight />
				</a>
			</Col>
			<Col className='logoSection d-flex flex-column align-items-center justify-content-center'>
				<Image
					width={300}
					src={coverImg}
					alt='Home-Hive'
				/>
			</Col>
		</Row>
	);
}