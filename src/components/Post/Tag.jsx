import PropTypes from "prop-types";

import classes from './style.module.css';

const Tag = (props) => {
	const { name } = props;

	return <span data-testid="tag_name" className={classes.tag} >{name}</span>;
};

export default Tag;

Tag.propTypes = {
	name: PropTypes.string,
};
