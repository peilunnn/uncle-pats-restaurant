import { React, useEffect, useState } from "react";
import ItemsDisplay from "./ItemsDisplay";
import fetchItems from "../utils/fetchItems";

const backendUrl = process.env.REACT_APP_LOCAL_BACKEND_URL;

function UserView() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNextButton, setShowNextButton] = useState(true);

  useEffect(() => {
    fetchItems(backendUrl, currentPage, setItems, setShowNextButton);
  }, [currentPage]);

  return (
    <ItemsDisplay
      isAdmin={false}
      items={items}
      setItems={setItems}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      showNextButton={showNextButton}
      setShowNextButton={setShowNextButton}
    />
  );
}

export default UserView;
