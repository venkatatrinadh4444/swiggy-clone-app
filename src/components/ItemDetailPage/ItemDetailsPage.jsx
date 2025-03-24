import axios from "axios";
import "./ItemDetailPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useContextData } from "../../context/context";
import {toast} from 'react-toastify'
import {firestore} from '../../firebase/firebase'
import {collection,addDoc,doc} from 'firebase/firestore'

const ItemDetailsPage = () => {
  const [produtsData, setProductsData] = useState(null);
  const { id,firmName } = useParams();
  const {user}=useContextData()

  useEffect(() => {
    fetchingProductsData(id);
  }, []);

  const fetchingProductsData = async (idValue) => {
    const response = await axios(
      `https://backend-nodejs-suby.onrender.com/product/${idValue}/products`
    );
    setProductsData(response.data.products);
  };

  const addItemIntoCart=async (data)=> {
    if(user) {
      const userUid=user.uid
      const cartRef=doc(firestore,"carts",userUid)
      const collectionName=collection(cartRef,"cartItems")
      await addDoc(collectionName,data)
      toast('Item added to cart')
    }
    else if(!user) {
      toast("You need to be logged in to add items to your cart")
    }
  }

  return (
    <div className="container">
      <h3 className="bg-warning text-center mt-5 py-1 fw-bold">{firmName}</h3>
      {produtsData ? (
        produtsData.map((eachProduct) => {
          return (
            <div className="itemDetailContainer px-4" key={eachProduct._id}>
              <div className="itemContent">
                <h5>{eachProduct.productName}</h5>
                <p>&#8377;{eachProduct.price}</p>
                <p>{eachProduct.description}</p>
              </div>
              <div className="addItemBox">
                <img
                  src={`https://backend-nodejs-suby.onrender.com/uploads/${eachProduct.image}`}
                  alt={eachProduct.productName}
                  width="100px"
                />
                <button className="addBtn btn shadow btn-light" onClick={()=>addItemIntoCart(eachProduct)}>ADD</button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center mt-3">
          <BeatLoader />
        </div>
      )}
    </div>
  );
};

export default ItemDetailsPage;
