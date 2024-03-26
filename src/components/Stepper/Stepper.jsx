import React from "react";
import PropTypes from "prop-types";
import clsx from 'clsx';

import classes from "./style.module.css";
import Tick from '../../assets/icons/tick-white.png';

const STEP_COMPLETED = <img src={Tick} alt="Done" className={classes.DoneIcon} />
const getProgressWidth = (index, steps) => index > 0 ? `${100 / (steps - 1)}%` : 0;

const Stepper = (props) => {
	const { step, maxSteps, onStepChange, isNextDisabled } = props;


	return (
		<div className={classes.StepperWrapper}>
			<ul className={classes.Stepper}>
				{Array.from({ length: maxSteps }, (_, i) => {

                    

                    const isStepActive = step === i+1;
                    const isStepCompleted = step > i+1;

					return (
						<li
							className={classes.StepperItem}
							key={i}
							style={{ width: getProgressWidth(i, maxSteps) }}
						>
							<button
								className={clsx(
									classes.StepperButton,
									{ [classes.active]: isStepActive },
									{ [classes.completed]: isStepCompleted }
								)}
								onClick={() => onStepChange(i + 1)}
								disabled={isNextDisabled && step < i + 1}
							>
								{isStepCompleted ? STEP_COMPLETED : i + 1}
							</button>

							{i > 0 && (
								<div
									className={clsx(
										classes.StepperSeperator,
										{ [classes.active]: isStepActive },
										{ [classes.completed]: isStepCompleted }
									)}
								></div>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Stepper;

Stepper.propTypes = {
	step: PropTypes.number.isRequired,
	maxSteps: PropTypes.number.isRequired,
	onStepChange: PropTypes.func.isRequired,
    isNextDisabled: PropTypes.bool,
};
