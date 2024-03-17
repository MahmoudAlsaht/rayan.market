import MobileBrandList from './MobileBrandList';
import MobileCategoryList from './MobileCategoryList';

export default function MobileHome() {
	return (
		<main dir='rtl'>
			<MobileCategoryList isHomePage={true} />
			<MobileBrandList isHomePage={true} />
		</main>
	);
}
