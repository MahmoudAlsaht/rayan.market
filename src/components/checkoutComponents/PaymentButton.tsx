import GooglePayButton from '@google-pay/button-react';
import { useRef } from 'react';

export default function PaymentButton() {
	const googlePayButton = useRef<any>();

	return (
		<>
			<GooglePayButton
				ref={googlePayButton}
				environment='TEST'
				paymentRequest={{
					apiVersion: 2,
					apiVersionMinor: 0,
					allowedPaymentMethods: [
						{
							type: 'CARD',
							parameters: {
								allowedAuthMethods: [
									'PAN_ONLY',
									'CRYPTOGRAM_3DS',
								],
								allowedCardNetworks: [
									'MASTERCARD',
									'VISA',
								],
							},
							tokenizationSpecification: {
								type: 'PAYMENT_GATEWAY',
								parameters: {
									gateway: 'example',
									gatewayMerchantId:
										'exampleGatewayMerchantId',
								},
							},
						},
					],
					merchantInfo: {
						merchantId: '12345678901234567890',
						merchantName: 'Demo Merchant',
					},
					transactionInfo: {
						totalPriceStatus: 'FINAL',
						totalPriceLabel: 'Total',
						totalPrice: '100.00',
						currencyCode: 'USD',
						countryCode: 'US',
					},
				}}
				// onLoadPaymentData={(paymentRequest) => {
				// 	console.log(
				// 		'load payment data',
				// 		paymentRequest,
				// 	);
				// }}
			/>
		</>
	);
}
