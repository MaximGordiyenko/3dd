import { CardContent, Typography, Card } from "@mui/material";

export const DragAndDropCard = ({paginatedProducts, dragItem, dragOverItem, handleSort }) => {
  return (
    <div>
      {
        paginatedProducts?.map((item, index) => (
          <Card
            key={item.id}
            sx={{ maxWidth: 600, my: 2, mx: 'auto' }}
            raised={true}
            draggable
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}>
            <CardContent>
              <Typography variant="caption" component="div">{item.id}</Typography>
              <Typography variant="h6" component="div">{item.title}</Typography>
            </CardContent>
          </Card>
        ))
      }
    </div>
  );
};
