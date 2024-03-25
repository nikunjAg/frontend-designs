import React from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./style.module.css";
import { toReadableKebabCase } from "../../utils/common";
import home from "../../assets/icons/Home.svg";
import arrowRight from "../../assets/icons/ArrowRight.png";

const HomeIcon = <img className={classes.HomeIcon} src={home} alt="Home" />;
const ArrowRightIcon = <img className={classes.ArrowRight} src={arrowRight} alt="Arrow Right" />;

console.log(HomeIcon, ArrowRightIcon);

const Stepper = () => {
	const { pathname } = useLocation();

	const steps = pathname.split("/");

	let curr_link = "";

	return (
		<div className={classes.StepWrapper}>
			{steps.length > 1 &&
				steps.map((step, index) => {
					const isLast = index === steps.length - 1;
					curr_link += "/" + step;

					const label =
						index === 0 ? HomeIcon : [ArrowRightIcon, toReadableKebabCase(step)];

					return isLast ? (
						<span key={index} className={classes.Step}>{label}</span>
					) : (
						<span key={index} className={classes.Step}>
							<Link to={curr_link}>{label}</Link>
						</span>
					);
				})}
		</div>
	);
};

export default Stepper;
