import PropTypes from "prop-types";

import Tag from "./Tag";
import classes from './style.module.css';

const Post = (props) => {
	const { title, body, tags, reactions } = props;

	return (
		<div className={classes.post} >
			<h3 data-testid="post_title" >{title}</h3>
			<p data-testid="post_body" >{body}</p>
			<hr />
			<div data-testid="post_tags_list" >
				{tags.map((tag) => (
					<Tag key={tag} name={tag} />
				))}
			</div>
			<p className={classes.reactions} data-testid="post_reactions" >Reactions: {reactions}</p>
		</div>
	);
};

export default Post;

Post.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.string),
	reactions: PropTypes.number,
};
