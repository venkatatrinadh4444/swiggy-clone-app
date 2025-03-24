import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { useContextData } from "../../context/context";
import { collection, onSnapshot,deleteDoc,doc } from "firebase/firestore";
import "./Cart.css";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContextData();
  const backToHome=useNavigate()

  const fetchingCartItems = () => {
    if (!user) return;
    const userUid = user.uid;
    const collectionName = collection(firestore, "carts", userUid, "cartItems");
    return onSnapshot(collectionName, (snapshot) => {
      const storedCartItem = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(storedCartItem);
    });
  };

  const removeCartItems=async (value)=> {
    if(!user) return;
    const userUid=user.uid
    const document=doc(firestore,"carts",userUid,"cartItems",value)
    await deleteDoc(document)
    toast("Item removed from the cart")
  }

  const goHomeFuntion=()=> {
    toast("Redired to home page")
    backToHome('/')
  }

  useEffect(() => {
    const unsubscribe = fetchingCartItems();
    return () => unsubscribe && unsubscribe();
  }, [user]);

  return (
    <div className="container mt-2">
      <h3 className="text-center text-success">Cart</h3>
      <hr />
      <div className="sectionContainer">
        {cartItems.length > 0 ? (
          cartItems.map((eachItem) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center container cartContainer shadow mb-2"
                key={eachItem._id}
              >
                <img
                  src={`https://backend-nodejs-suby.onrender.com/uploads/${eachItem.image}`}
                  alt={eachItem.description}
                  width="80px"
                />
                <div>
                  <h5>{eachItem.productName}</h5>
                  <h6>Price:&#8377;{eachItem.price}</h6>
                </div>
                <button className="btn btn-danger" onClick={()=>removeCartItems(eachItem.id)}>Remove</button>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <img
              src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?t=st=1740720165~exp=1740723765~hmac=2b73df6e9492d558399354a3f61517c904a82b20db37c1e6d6ba34aa349e49ce&w=1380"
              alt="empty cart"
              width="180px" height="200px"
            />
          </div>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="d-flex justify-content-between align-items-center footer">
          <div className="d-flex align-items-center">
            <h6>Total Cart Items:</h6>
            <h5>{cartItems.length}</h5>
          </div>
          <div>
            <button className="btn btn-primary">Checkout</button>
          </div>
        </div>
      ) : (
        <div className="text-center">
        <button className="btn btn-primary" onClick={goHomeFuntion}>Go Home</button>
        </div>
      )}
    </div>
  );
};
export default Cart;
