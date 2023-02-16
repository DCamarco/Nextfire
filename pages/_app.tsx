import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "@/lib/context";

import { useUserData } from "../lib/hooks";

export default function App({ Component, pageProps }: AppProps) {
	const userData = useUserData;

	return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</UserContext.Provider>
	);
}
