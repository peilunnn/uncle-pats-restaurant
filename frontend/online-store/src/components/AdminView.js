import React from "react";
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

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    description: "",
  });

  const handleCreate = () => {
    setDialogOpen(true);
  };

  const handleUpdate = (selectedItem) => {
    // Handle the update logic here.
    // Use selectedItem to populate a form similar to the create form and submit changes.
  };

  const handleDelete = (itemId) => {
    // Handle delete logic here
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    // Send formData to backend to create a new item
    // After successful creation, close the dialog and fetch items again
    handleDialogClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ItemsDisplay
        isAdmin={true}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
      >
        <Button className={classes.button} onClick={handleCreate}>
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
        <DialogTitle style={{ color: "orange" }}>Create New Item</DialogTitle>
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
