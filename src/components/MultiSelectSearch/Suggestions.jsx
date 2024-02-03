import PropTypes from "prop-types";
import classes from './style.module.css';
import { useEffect, useRef } from "react";

export function Suggestions(props) {
	const { items, active, onSelect } = props;

	const suggestionsRef = useRef();

	useEffect(() => {
		const el = suggestionsRef.current.children?.[active];
		// Only scroll if Not into view
		el?.scrollIntoView({ behavior: 'smooth' });
	}, [active]);

	return (
		<ul className={classes.suggestions} ref={suggestionsRef} >
			{items.map((item, i) => (
				<li
					className={`${classes.suggestion} ${active === i ? classes.active : ""}`}
					key={i}
					onClick={() => onSelect(item)}
				>
					<img src={item.image} width={25} height={25} />
					<span>{item.firstName + " " + item.lastName}</span>
				</li>
			))}
		</ul>
	);
}

Suggestions.propTypes = {
	items: PropTypes.array,
	active: PropTypes.number,
	onSelect: PropTypes.func,
};
