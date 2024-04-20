import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage/SignUpFormPage";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import SetterTransferPage from "./components/SetterTransferPage/SetterTransferPage";
import SalesTrackerPage from "./components/SalesTrackerPage/SalesTrackerPage";

function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<div className='main-content'>
					<Outlet />
				</div>
			)}
		</>
	);
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <h1>Welcome!</h1>,
			},
			{
				path: "/login",
				element: <LoginFormPage />,
			},
			{
				path: "/signup",
				element: <SignupFormPage />,
			},
			{
				path: "/setter-transfers",
				element: <SetterTransferPage />,
			},
			{
				path: "/sales-tracker",
				element: <SalesTrackerPage />
			}
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
