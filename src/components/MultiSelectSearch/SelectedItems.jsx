import PropTypes from "prop-types";
import classes from './style.module.css';

export function SelectedItems(props) {
	const { items, focusedItem, onRemove } = props;

	return (
		<>
			{items.map((item, i) => (
				<div
					className={`${classes.item} ${
						focusedItem && focusedItem.name === item.name ? classes.selected : ""
					}`}
					key={i}
				>
					<img src={item.image} width={25} height={25} />
					{item.name}
					<span onClick={() => onRemove(item)}>{'⨯'}</span>
				</div>
			))}
		</>
	);
}

SelectedItems.propTypes = {
	items: PropTypes.array,
	focusedItem: PropTypes.object,
	onRemove: PropTypes.func,
};
