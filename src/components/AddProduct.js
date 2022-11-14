import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    console.log("isi file adalah ", file);
    try {
      await axios.post("http://localhost:5000/product", formData);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7">
          <Form onSubmit={saveProduct}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" onChange={loadImage} />
            </Form.Group>

            {preview ? (
              <img
                style={{ width: "200px", height: "250px" }}
                src={preview}
                alt="preview"
              />
            ) : (
              ""
            )}

            <Button variant="primary" type="submit" className="d-block mt-2">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
