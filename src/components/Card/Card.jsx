import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import classes from "./style.module.css";

const Card = (props) => {
	const { url, name, description, previewURL } = props;

	return (
		<Link className={classes.card} to={url}>
			<img src={previewURL} alt="Card Preview" />
			<h3>{name}</h3>
			<p>{description}</p>
		</Link>
	);
};

export default Card;

Card.propTypes = {
	url: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	previewURL: PropTypes.string,
};
