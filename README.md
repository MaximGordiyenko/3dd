## Explain how to implement independetn drag and drop on each page in React.

Use array _splice()_ method to **remove** the dragged item from its original position in the **_sortedProducts_** array and assign it to the **_draggedProduct_** variable. The **_dragItem.current_** is the index of the dragged item on the current page.

`const [draggedProduct] = sortedProducts.splice((currentPage - 1) * productsPerPage + dragItem.current, 1);`

Use array _splice()_ method again to **insert** the draggedProduct at the new position in the **_sortedProducts_** array. The **_dragOverItem.current_** is the index of the item where the dragged item is dropped on the current page.

`sortedProducts.splice((currentPage - 1) * productsPerPage + dragOverItem.current, 0, draggedProduct);`
