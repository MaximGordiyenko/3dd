import { CardContent, Typography, Card, TextField, Button } from "@mui/material";
import { useState } from "react";
import { setProducts } from "../redux/actions/products.action.js";
import { useDispatch } from "react-redux";

export const DragAndDropCard = ({
                                  paginatedProducts,
                                  dragItem,
                                  dragOverItem,
                                  handleSort,
                                  products,
                                }) => {
  const dispatch = useDispatch();
  const [editedItem, setEditedItem] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  
  const handleDoubleClick = (item) => {
    setEditedItem(item);
    setEditedTitle(item.title);
  };
  
  const handleBlur = () => {
    setEditedItem(null);
  };
  
  const saveChanges = (item) => {
    item.title = editedTitle;
    const newItem = [...products];
    for (let i = 0; i < newItem.length; i++) {
      if (newItem[i].id === item.id) {
        newItem[i] = item;
        break;
      }
    }
    dispatch(setProducts(newItem));
    setEditedItem(null);
  };
  
  const handleKeyDown = (event, item) => {
    if (event.key === 'Enter') {
      saveChanges(item);
    }
  };
  
  const handleChange = (event) => {
    setEditedTitle(event.target.value);
  };
  
  const handleDelete = (itemId) => {
    const newItem = [...products];
    const updatedItems = newItem.filter((item) => item.id !== itemId);
    dispatch(setProducts(updatedItems));
  };
  
  return (
    <div>
      {
        paginatedProducts?.map((item, index) => (
          <Card
            key={item.id}
            sx={{ maxWidth: 600, my: 2, mx: 'auto', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
            raised={true}
            draggable
            onDragStart={() => dragItem.current = index}
            onDragEnter={() => dragOverItem.current = index}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}>
            <CardContent>
              {
                editedItem === item ? (
                  <TextField
                    autoFocus
                    fullWidth
                    value={editedTitle}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography
                    variant="div"
                    onDoubleClick={() => handleDoubleClick(item)}>
                    {item.id} {item.title}
                  </Typography>
                )}
            </CardContent>
            <Button key={item.id} onClick={() => handleDelete(item.id)}>🗑️</Button>
          </Card>
        ))
      }
    </div>
  );
};
