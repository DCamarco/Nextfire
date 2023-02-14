import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Loader from "@/components/Loader";

import toast, { Toaster } from "react-hot-toast";

type Props = {};
const Home = ({}: Props): JSX.Element => {
	return (
		<div>
			<Loader show />
			<h1>Sign Up</h1>
			<button
				onClick={() => {
					toast.success("hello toast!");
					console.log("Toasted");
				}}
			>
				Toast Me!
			</button>
			<Toaster />
		</div>
	);
};

export default Home;
