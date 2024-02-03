import { useEffect, useState } from "react";

import { MultiSelectSearch } from "../components/MultiSelectSearch";

export default function MultiSelectSearchPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setItems(
          res.users.map((u) => ({ ...u, name: u.firstName + " " + u.lastName }))
        );
      });
  }, []);

  return (
    <div className="App">
      <MultiSelectSearch items={items} />
      <div style={{ width: '80%', margin: '0 auto' }} >
        <h3><u>Features</u></h3>
        <ul>
          <li>Press Backspace to focus and remove selected items</li>
          <li>Use up down arrow keys to traverse over the suggestions</li>
          <li>Press enter over selected suggestion to select it</li>
        </ul>
      </div>
    </div>
  );
}
