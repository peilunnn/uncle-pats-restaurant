const fetchItems = async (
  backendUrl,
  currentPage,
  setItems,
  setShowNextButton
) => {
  try {
    const response = await fetch(`${backendUrl}/?page=${currentPage}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setItems(data);
    } else {
      setItems([]);
      console.error("Invalid data format received:", data);
    }

    if (data.length < 8) {
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    setItems([]);
  }
};

export default fetchItems;
