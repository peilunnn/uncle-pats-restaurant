import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Modal, Paper, Typography } from "@material-ui/core";
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
    width: "90%",
    height: "70%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: "#222",
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
      <Box style={{ marginBottom: 20 }} />
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Paper
              className={classes.paper}
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">${item.price.toFixed(2)}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedItem && (
        <Modal open={true} onClose={handleCloseModal}>
          <div className={classes.modalContent}>
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              style={{
                width: "100%",
                minHeight: "100px",
                maxHeight: "400px",
                objectFit: "contain",
                marginBottom: 10,
              }}
            />
            <Typography
              variant="h5"
              align="center"
              style={{ color: "white", marginBottom: 10 }}
            >
              {selectedItem.name}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              style={{ color: "white", marginBottom: 10 }}
            >
              ${selectedItem.price.toFixed(2)}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ color: "white", marginBottom: 10 }}
            >
              {selectedItem.description}
            </Typography>
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
