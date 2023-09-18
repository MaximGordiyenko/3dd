import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/products.action.js";
import { Stack, Pagination, Typography, Button } from '@mui/material';
import { api } from "../apis/index.js";
import { DragAndDropCard } from "../components/DragAndDropCard.jsx";
import { Input } from "../components/Input.jsx";

export const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.productsReducer.products);
  localStorage.setItem('products', JSON.stringify(products));
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  
  const [newProduct, setNewProduct] = useState("");
  const addItem = () => {
    const newItems = [...products];
    newItems.unshift({
      userId: newItems.length + 1,
      id: newItems.length + 1,
      title: newProduct,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    });
    dispatch(setProducts(newItems));
    setNewProduct("");
  };
  
  //const handle drag sorting
  const handleSort = () => {
    let sortedProducts = [...products];
    const draggedProduct = sortedProducts.splice(dragItem.current, 1)[0];
    sortedProducts.splice(dragOverItem.current, 0, draggedProduct);
    dragItem.current = null;
    dragOverItem.current = null;
    dispatch(setProducts(sortedProducts));
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/posts');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.log("Err: ", error);
      }
    };
    
    fetchProducts().then(r => r);
  }, [dispatch]);
  
  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    setPaginatedProducts(currentProducts);
  }, [currentPage, products, productsPerPage]);
  
  return (
    <>
      <Typography>Product List</Typography>
      <Input value={newProduct} onChange={(e) => setNewProduct(e.target.value)}/>
      <Button disabled={!newProduct} onClick={addItem}>Add item</Button>
      
      <DragAndDropCard
        dragItem={dragItem}
        dragOverItem={dragOverItem}
        handleSort={handleSort}
        paginatedProducts={paginatedProducts}
        products={products}
      />
      
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(products?.length / productsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </Stack>
    </>
  );
};
