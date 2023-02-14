import React from "react";

type Props = {
	show: boolean;
};

//Loading Spinner
export default function Loader(props: Props) {
	const { show } = props;
	return show ? <div className='loader'></div> : null;
}
