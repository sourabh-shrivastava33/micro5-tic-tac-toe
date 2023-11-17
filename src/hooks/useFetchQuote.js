import { useEffect, useState } from "react";
import { fetchAdvice } from "../services/quoteApi";
import { INTERVAL, URL } from "../utils/constants";
export function useFetchQuote() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const abortController = new AbortController();
		async function fetchQuote() {
			try {
				setIsLoading(true);
				const data = await fetchAdvice(URL, { signal: abortController.signal });
				setData(data);
				setIsLoading(false);
			} catch (error) {
				console.error(error.response);
			}
		}
		const id = setInterval(fetchQuote, INTERVAL * 1000);

		return () => {
			abortController.abort();
			clearInterval(id);
		};
	}, [setIsLoading, setData]);
	return { data, isLoading };
}
