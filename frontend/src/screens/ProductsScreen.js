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

// import Cookie from "js-cookie"; // Not as good method of getting userInfo
// const userInfo = Cookie.getJSON("userInfo"); // Not as good method of getting userInfo
// if (userInfo) {
//   console.log(userInfo);
//   console.log(userInfo.phone);
// } // New way of getting userInfo is better. Gett the userInfo from userSignin

function ProductsScreen(props) {
  // You can add state to a component by calling React’s useState Hook
  // Calling useState does two things:
  // it creates a “state variable” with an initial value—in this case the state variable is isHungry and its initial value is true
  // it creates a function to set that state variable’s value—setIsHungry
  // SYNTAX: [<getter>, <setter>] = useState(<initialValue>)

  // The useState React HOOK Returns a stateful value, and a function to update it
  // SYNTAX: const [state, setState] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false); // initial value is false
  const [id, setId] = useState(""); //initial state is empty
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [uploading, setUploading] = useState(false);

  // Accessing the productList reducer from the initial state in the store
  const productList = useSelector((state) => state.productList);
  // destructuring loading, products, and error from productList
  const { loading, products, error } = productList;

  // Accessing the userSignin reducer from the initial state in the store
  const userSignin = useSelector((state) => state.userSignin);
  // Destructuring userInfo from userSignin
  const { userInfo } = userSignin;

  // Accessing the productSave reducer from the initial state in the store
  const productSave = useSelector((state) => state.productSave);
  // destructuring loading, success, and error from productSave. Renaming them
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  // Accessing the productDelete reducer from the initial state in the store
  const productDelete = useSelector((state) => state.productDelete);
  // destructuring loading, success, and error from productDelete. Renaming them
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  // To dispatch an action
  const dispatch = useDispatch();

  // useEffect is like componentDidMount. It tells React that your component needs to do something after render
  useEffect(() => {
    // If successSave is true, close modal, and then refresh the data
    if (successSave) {
      setModalVisible(false); // Hide modal
    }
    // dispatch the listProducts action
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]); // 'successSave' & 'successDelete' means rerun the above lines of code if successSave state changes. This array holds all the variables that have this ability. If there is a successSAve or successDelete, want to refresh the list again << It will make the PRODUCT_LIST_REQUEST and PRODUCT_LIST_SUCCESS again!

  // openModal function, takes product as a parameter
  const openModal = (product) => {
    // we use the set methods for the product fields
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setDescription(product.description);
    setSellerPhone(product.sellerPhone);
    setSellerEmail(product.sellerEmail);
  };

  // submitHandler function
  const submitHandler = (e) => {
    e.preventDefault(); // bc we not going to refresh screen
    // dispatch the saveProduct action, pass id, name, image, price, description, sellerPhone, sellerEmail
    dispatch(
      // Set _id to id
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

  // deleteHandler function. Takes product as parameter
  const deleteHandler = (product) => {
    // dispatch the deleteProdcut action, pass the id of the product
    dispatch(deleteProduct(product._id));
  };

  // uploadFileHandler function
  const uploadFileHandler = (e) => {
    // Store file in variable file
    const file = e.target.files[0];
    // Create a new FormData object
    const bodyFormData = new FormData();
    // append a new file, set the file name to image
    bodyFormData.append("image", file);
    // Set setUploading to true for the loading bar
    setUploading(true);
    // make POST request, body is bodyFormData
    // To change from uploading images locally to S3, just changed /api/uploads to /api/uploads/s3
    // Pass bodyFormData and headers
    // When making a POST request, have to encode the data that forms the body of the request, we using the multipart/form-data method
    axios
      .post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Get address (response.data), pass it into setImage fuction (setter)
        setImage(response.data);
        // Get rid of uploading text
        setUploading(false);
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
        {/* Need to call openModal like this with an empty object as the parameter */}
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>

      {/* if modalVisible is true, then show the form, else don't even render it */}
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
                {/* Back button just makes form for Creating Project dissapear */}
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

      {/* Only if userInfo exists (meaning the user is logged in) can they see the whole list of all the products  */}
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
              {/* Need this key or else error*/}

              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.sellerPhone}</td>
                  <td>{product.sellerEmail}</td>
                  <td>
                    {/* Edit just like Create Product, they both call openModal, only difference is Edit passes the product as parameter */}

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
                      <>
                        {/* Interate through products, edit and delete products will only show if phone numbers matches with the user who is logged in */}
                      </>
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
