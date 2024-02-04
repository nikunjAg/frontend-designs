import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const MultiSelectSearchPage = lazy(() => import("./pages/MultiSelectSearchPage"));
const InfiniteScrollPage = lazy(() => import("./pages/InfiniteScrollPage"));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<p>Loading...</p>} ><LandingPage /></Suspense>
    },
    {
        path: '/multi-select-search',
        element: <Suspense><MultiSelectSearchPage /></Suspense>,
    },
    {
        path: '/infinite-scroll',
        element: <Suspense fallback={<p>Loading...</p>} ><InfiniteScrollPage /></Suspense>
    },
]);

function Router() {
    return <RouterProvider router={router} />
}

export default Router;