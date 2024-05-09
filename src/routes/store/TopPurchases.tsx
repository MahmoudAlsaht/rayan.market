/* eslint-disable no-mixed-spaces-and-tabs */

import ProductsList from '../../components/ProductsList';

const TopPurchases = () => {
	return (
		<ProductsList // productsLength={productsLength}
			// mt={mt}
			// mb={mb}
			sortBasedOn={'purchases'}
		/>
	);
};

export default TopPurchases;
