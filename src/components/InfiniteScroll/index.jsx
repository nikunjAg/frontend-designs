import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import classes from "./style.module.css";

const InfiniteScroll = (props) => {
	const {
		list: { data, skip, limit, total },
		loading,
		before,
		render,
		onFetchData,
	} = props;

	const dataListRef = useRef();

	useEffect(() => {

		if (skip + limit === total) return;

		const el = dataListRef.current;

		function scrollHandler() {

			if (el.clientHeight + el.scrollTop >= el.scrollHeight - (before || 100)) {
				console.log('Nearly reached the end');
				onFetchData();
			}

		}

		el.addEventListener('scroll', scrollHandler);
		return () => el.removeEventListener('scroll', scrollHandler);
	}, [onFetchData, before, skip, limit, total]);

	return <div className={classes.infiniteScroll} ref={dataListRef}>
		<h2>Infinite Scroll</h2>
		<div className={classes.data}>
			{data.map(render)}
		</div>
		{loading && <div className={classes.loader} >Loading ...</div>}
		{total === skip + limit && <div className={classes.loader}>No more posts</div>}
	</div>;
};

export default InfiniteScroll;

InfiniteScroll.propTypes = {
	list: PropTypes.shape({
		data: PropTypes.array,
		total: PropTypes.number,
		skip: PropTypes.number,
		limit: PropTypes.number,
	}),
	loading: PropTypes.bool,
	render: PropTypes.func,
	before: PropTypes.number,
	onFetchData: PropTypes.func,
};
