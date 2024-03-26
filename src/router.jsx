import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const MultiSelectSearchPage = lazy(() => import("./pages/MultiSelectSearchPage"));
const InfiniteScrollPage = lazy(() => import("./pages/InfiniteScrollPage"));
const OtpValidatorPage = lazy(() => import("./pages/OtpValidator"));
const MultiStepFormPage = lazy(() => import("./pages/MultiStepForm"));

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
    {
        path: '/otp-validator',
        element: <Suspense fallback={<p>Loading...</p>} ><OtpValidatorPage /></Suspense>
    },
    {
        path: '/stepper',
        element: <Suspense fallback={<p>Loading...</p>} ><MultiStepFormPage /></Suspense>
    },
]);

function Router() {
    return <RouterProvider router={router} />
}

export default Router;