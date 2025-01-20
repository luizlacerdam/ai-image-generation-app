import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Post from "./pages/Post";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/post" element={<Post />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
