import React, { useState } from "react";

import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Stepper from "../components/Stepper/Stepper";

const LAST_STEP = 4;

const STEP_COMPONENTS = [
	() => <p>Please enter personal details</p>,
	() => <p>Please enter your address</p>,
	() => <p>Please enter your card details</p>,
	() => <p>Please confrm Order</p>,
]

const MultiStepForm = () => {
	const [currStep, setCurrStep] = useState(1);

	const stepChangeHandler = (step) => {
		setCurrStep(step);
	};

	const nextStepHandler = () => {
		setCurrStep((prev) => prev + 1);
	};

	const ActiveStepComponent = STEP_COMPONENTS[currStep - 1];

	return (
		<div style={{ textAlign: "center" }}>

			<Breadcrumbs />

			<h3>Multi-Step Form</h3>

			<Stepper
				step={currStep}
				maxSteps={LAST_STEP}
				onStepChange={stepChangeHandler}
				isNextDisabled
			/>

			{ActiveStepComponent && <ActiveStepComponent />}

			{currStep <= LAST_STEP && (
				<button onClick={nextStepHandler} style={{ marginTop: '1rem' }} >
					{currStep === LAST_STEP ? "Finish" : "Next"}
				</button>
			)}
		</div>
	);
};

export default MultiStepForm;
