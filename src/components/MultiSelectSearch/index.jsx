import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { SelectedItems } from "./SelectedItems";
import { Suggestions } from "./Suggestions";
import classes from './style.module.css';

export function MultiSelectSearch(props) {
  const { items } = props;

  const [searchVal, setSearchValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [suggestions, setSuggestions] = useState(items);
  const [focusedItem, setFocusedItem] = useState();
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const inputRef = useRef();

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  const changeSearchHandler = (e) => {
    setSearchValue(e.target.value);
    setActiveSuggestion(0);
    setFocusedItem(undefined);
  };

  const selectSuggestionHandler = (suggestion) => {
    setSelectedItems((prev) => prev.concat(suggestion));
    setSuggestions((oldSuggestions) =>
      oldSuggestions.filter((s) => s.name !== suggestion.name)
    );
    setFocusedItem(undefined);
    setActiveSuggestion(0);
    setSearchValue("");
    inputRef.current.focus();
    setTimeout(() => {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const removeSelectionHandler = (item) => {
    setFocusedItem(null);
    setSelectedItems((prev) => prev.filter((old) => old.name !== item.name));
    setSuggestions((prev) => prev.concat(item));
    inputRef.current.focus();
  };

  const keyPressHandler = (event) => {
    if (event.key === "Backspace" && searchVal.length === 0) {
      // Focus on selected items
      if (!focusedItem) {
        setFocusedItem(selectedItems.at(-1));
      } else {
        removeSelectionHandler(selectedItems.at(-1));
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion((prev) => (prev + 1) % filteredSuggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion(
        (prev) =>
          (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length
      );
    }

    if (event.key === "Enter" && filteredSuggestions[activeSuggestion]) {
      selectSuggestionHandler(filteredSuggestions[activeSuggestion]);
    }
  };

  useEffect(() => {
    setFocusedItem(undefined);
    setSelectedItems([]);
    setSuggestions(items);
    setActiveSuggestion(0);
  }, [items]);

  return (
    <div className={classes.multiSelectSearch} >
      <h1>Multi Select Search</h1>
      <div className={classes.itemsWithInput}>
        <SelectedItems
          items={selectedItems}
          focusedItem={focusedItem}
          onRemove={removeSelectionHandler}
        />
        <input
          ref={inputRef}
          value={searchVal}
          onChange={changeSearchHandler}
          onKeyDown={keyPressHandler}
          placeholder="Search..."
          autoFocus
        />
      </div>
      <Suggestions
        items={filteredSuggestions}
        active={activeSuggestion}
        onSelect={selectSuggestionHandler}
      />
    </div>
  );
}

MultiSelectSearch.propTypes = {
    items: PropTypes.array,
}