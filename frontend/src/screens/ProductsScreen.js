import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import axios from "axios";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";

function ProductsScreen(props) {
  // const [state, setState] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList); // get productList from store
  const { products } = productList; // get products from productList
  const userSignin = useSelector((state) => state.userSignin); // get userSignin from state
  const { userInfo } = userSignin; // Get userInfo from userSignin
  const productSave = useSelector((state) => state.productSave); // Get productSave from store
  // Get loading, success, and error from productSave. Rename
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete); // Get productDelete from state
  // Get loading, success, error from productDelete. Rename
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  // useEffect like componentDidMount
  useEffect(() => {
    if (successSave) {
      setModalVisible(false); // Hide modal
    }
    dispatch(listProducts()); // dispatch action
    return () => {};
  }, [successSave, successDelete]); // Change in input reruns above

  const openModal = (product) => {
    // When modal open, set info
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setDescription(product.description);
    setSellerPhone(product.sellerPhone);
    setSellerEmail(product.sellerEmail);
  };

  const submitHandler = (e) => {
    e.preventDefault(); // don't refresh
    // dispatch action
    dispatch(
      saveProduct({
        _id: id,
        name,
        image,
        price,
        description,
        sellerPhone,
        sellerEmail,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id)); // dispatch action
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0]; // get file
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true); // show uploading text
    // POST request, body is bodyFormData
    // Upload local is /api/uploads. Upload to s3 is /api/uploads/s3
    axios
      .post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data); // got address, set to image
        setUploading(false); // remove uploading text
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  // Return section has the sign in form
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>

      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>

              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>

              <li>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description">Description:</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>

              <li>
                <label htmlFor="sellerPhone">Phone Number to contact:</label>
                <textarea
                  name="sellerPhone"
                  value={sellerPhone}
                  id="sellerPhone"
                  onChange={(e) => setSellerPhone(e.target.value)}
                ></textarea>
              </li>

              <li>
                <label htmlFor="sellerEmail">Email to contact:</label>
                <textarea
                  name="sellerEmail"
                  value={sellerEmail}
                  id="sellerEmail"
                  onChange={(e) => setSellerEmail(e.target.value)}
                ></textarea>
              </li>

              <li>
                {/* If id exists, show Update, else show Create */}
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>

              <li>
                {/* Back button to hide form */}
                <button
                  onClick={() => setModalVisible(false)}
                  type="button"
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      {/* Only if userInfo exists (user logged in) can they see the whole list of all products */}
      {userInfo ? (
        <div className="product-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.sellerPhone}</td>
                  <td>{product.sellerEmail}</td>
                  <td>
                    {/* Edit calls openModal like Create Product, difference is passes in product */}
                    {/* Interate through products, edit and delete products will only show if phone numbers matches with the user who is logged in */}
                    {product.sellerPhone == userInfo.phone ? (
                      <>
                        <button
                          className="button"
                          onClick={() => openModal(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="button"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          Please <Link to="/signin">Sign In Here</Link> To See Your Posts
        </div>
      )}
    </div>
  );
}

export default ProductsScreen;
