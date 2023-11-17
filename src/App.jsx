import PlayComponent from "./components/Play/PlayComponent";
import QuoteComponent from "./components/Quote/QuoteComponent";
import { Toaster } from "react-hot-toast";
function App() {
	return (
		<div className="app">
			<Toaster
				position="top-right"
				containerStyle={{
					top: "20px",
					right: 0,
				}}
			/>
			<QuoteComponent />
			<PlayComponent />
		</div>
	);
}

export default App;
