import { createBrowserRouter } from "react-router-dom";

import MultiSelectSearchPage from "./pages/MultiSelectSearchPage";
import LandingPage from "./pages/LandingPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/multi-select-search',
        element: <MultiSelectSearchPage />
    }
]);

export default router;