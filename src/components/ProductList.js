import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await axios.get("http://localhost:5000/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row  mt-5">
        <div>
          <Link to={"/add"} className="btn btn-info fw-bold text-white mb-2">
            Tambah Data
          </Link>
        </div>
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <Card
              style={{ width: "18rem" }}
              className="mb-3 shadow"
              key={product.id}
            >
              <Card.Img
                variant="top"
                style={{ height: "300px" }}
                src={product.url}
              />
              <Card.Body className="text-center">
                <Card.Title>{product.name}</Card.Title>
                <button
                  className="btn btn-danger me-2 fw-bold text-white"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
                <Link
                  to={`edit/${product.id}`}
                  className="btn btn-info fw-bold text-white"
                >
                  Update
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
