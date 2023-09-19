import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Modal, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import fetchItems from "../utils/fetchItems";

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
    position: "relative",
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
  button: {
    textTransform: "none",
    color: "black",
    backgroundColor: "orange",
    "&:hover": {
      backgroundColor: "#ff7f00",
    },
    "&:focus": {
      backgroundColor: "orange",
    },
  },
  buttonContainer: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    display: "flex",
    gap: "10px",
  },
});

function ItemsDisplay({
  isAdmin,
  onDialogOpen,
  onDelete,
  items,
  setItems,
  currentPage,
  setCurrentPage,
  showNextButton,
  setShowNextButton,
}) {
  const classes = useStyles();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    fetchItems(backendUrl, currentPage, setItems, setShowNextButton);
  }, [currentPage]);

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
              <Typography variant="body2">
                {" "}
                ${item.price ? item.price.toFixed(2) : "N/A"}
              </Typography>
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
              ${selectedItem.price ? selectedItem.price.toFixed(2) : "N/A"}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ color: "white", marginBottom: 10 }}
            >
              {selectedItem.description}
            </Typography>

            {isAdmin && (
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.button}
                  onClick={() => onDialogOpen("update", selectedItem)}
                  style={{ marginTop: "20px", marginRight: "15px" }}
                >
                  Update
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => onDelete(selectedItem.id)}
                  style={{ marginTop: "20px", marginRight: "15px" }}
                >
                  Delete
                </Button>
              </div>
            )}
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

export default ItemsDisplay;
