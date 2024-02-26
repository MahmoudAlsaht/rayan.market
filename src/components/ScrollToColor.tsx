import React from 'react';
import { useScrollTrigger } from '@material-ui/core';

const ScrollHandler = (props: any) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: props?.window ? props.window() : undefined,
	});

	return React.cloneElement(props.children, {
		style: {
			backgroundColor: trigger ? 'white' : '#07a18033',
			transition: trigger ? '0.3s' : '0.5s',
			boxShadow: 'none',
			padding: '10px 0px',
		},
	});
};

const ScrollToColor01 = (props: any) => {
	return (
		<ScrollHandler {...props}>
			{props.children}
		</ScrollHandler>
	);
};

export default ScrollToColor01;
