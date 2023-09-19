import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const backendUrl = process.env.REACT_APP_LOCAL_BACKEND_URL;

const useStyles = makeStyles({
  input: {
    backgroundColor: "#444",
    borderRadius: "8px",
    color: "#eee",
  },
  label: {
    color: "#aaa",
  },
  paper: {
    padding: "20px",
    textAlign: "center",
    color: "#eee",
    backgroundColor: "#333",
    cursor: "pointer",
  },
  modalContent: {
    position: "absolute",
    width: "80%",
    maxWidth: "500px",
    backgroundColor: "white",
    padding: "20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

function UserView() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNextButton, setShowNextButton] = useState(true);

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${backendUrl}/items?page=${currentPage}`);
      const data = await response.json();
      debugger;
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
        console.error("Invalid data format received:", data);
      }

      if (data.length < 10) {
        setShowNextButton(false);
      } else {
        setShowNextButton(true);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    }
  };

  const handleItemClick = (uuid) => {
    window.location.href = `${backendUrl}/items/${uuid}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222",
      }}
    >
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Paper
              className={classes.paper}
              onClick={() => setSelectedItem(item)}
            >
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">${item.price.toFixed(2)}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedItem && (
        <Modal open={true} onClose={handleCloseModal}>
          <div className={classes.modalContent}>
            <Typography variant="h5">{selectedItem.name}</Typography>
            <Typography variant="body1">
              ${selectedItem.price.toFixed(2)}
            </Typography>
            <Typography variant="body2">{selectedItem.description}</Typography>
          </div>
        </Modal>
      )}

      <div style={{ marginTop: "20px" }}>
        {currentPage > 1 && (
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
        )}
        {showNextButton && (
          <Button
            variant="contained"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserView;
