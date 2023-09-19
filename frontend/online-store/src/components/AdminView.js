import React, { useState, useEffect } from "react";
import ItemsDisplay from "./ItemsDisplay";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import fetchItems from "../utils/fetchItems";

const backendUrl = process.env.REACT_APP_LOCAL_BACKEND_URL;

const useStyles = makeStyles({
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
});

function AdminView() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNextButton, setShowNextButton] = useState(true);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    description: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateFormData = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!String(formData.price).trim() || isNaN(formData.price)) {
      errors.price = "Valid price is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    fetchItems(backendUrl, currentPage, setItems, setShowNextButton);
  }, [currentPage]);

  const handleDialogOpen = (type, item = null) => {
    setDialogType(type);

    if (type === "update" && item) {
      setFormData({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        imageUrl: item.imageUrl,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
      });
    }

    setDialogOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${backendUrl}/delete/${itemId}`, {
        method: "DELETE",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    fetchItems(backendUrl, currentPage, setItems, setShowNextButton);
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setValidationErrors({});
    setDialogOpen(false);
  };

  const handleConfirm = async () => {
    if (!validateFormData()) {
      return;
    }

    if (dialogType === "create") {
      try {
        const response = await fetch(`${backendUrl}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error("Error creating item:", error);
      }
    } else if (dialogType === "update") {
      try {
        const response = await fetch(`${backendUrl}/update/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
    fetchItems(backendUrl, currentPage, setItems, setShowNextButton);
    handleDialogClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ItemsDisplay
        isAdmin={true}
        onDialogOpen={handleDialogOpen}
        onDelete={handleDelete}
        items={items}
        setItems={setItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        showNextButton={showNextButton}
        setShowNextButton={setShowNextButton}
      />

      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
      >
        <Button
          className={classes.button}
          onClick={() => handleDialogOpen("create")}
        >
          Create
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          style: { backgroundColor: "#222" },
          fontFamily: "Roboto",
        }}
      >
        <DialogTitle style={{ color: "orange" }}>
          <DialogTitle align="center" style={{ color: "orange" }}>
            {dialogType === "create" ? "Create New Item" : "Update Item"}
          </DialogTitle>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            InputProps={{ style: { color: "#eee" } }}
            InputLabelProps={{ style: { color: "#eee" } }}
            helperText={validationErrors.name}
            error={!!validationErrors.name}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            InputProps={{ style: { color: "#eee" } }}
            InputLabelProps={{ style: { color: "#eee" } }}
            helperText={validationErrors.price}
            error={!!validationErrors.price}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            InputProps={{ style: { color: "#eee" } }}
            InputLabelProps={{ style: { color: "#eee" } }}
            helperText={validationErrors.description}
            error={!!validationErrors.description}
          />
          <TextField
            margin="dense"
            label="Image Url"
            fullWidth
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            InputProps={{ style: { color: "#eee" } }}
            InputLabelProps={{ style: { color: "#eee" } }}
            helperText={validationErrors.imageUrl}
            error={!!validationErrors.imageUrl}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            className={classes.button}
            onClick={handleConfirm}
            style={{ color: "black", marginBottom: 10 }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminView;
