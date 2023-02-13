import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

type Props = {};
const Home = ({}: Props): JSX.Element => {
	return (
		<div>
			<Link
				prefetch={false}
				href={{
					pathname: "/[username]",
					query: {
						username: "jeffd23",
					},
				}}
			></Link>
		</div>
	);
};

export default Home;
