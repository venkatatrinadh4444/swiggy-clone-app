import { useEffect,useState } from "react";
import axios from 'axios';
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const SearchItems=()=> {
    const [produtsData, setProductsData] = useState(null);
    const [data,setData]=useState([]) 
    const {value}=useParams()

    useEffect(() => {
        fetchingData();
      }, []);

    
      const fetchingData = async () => {
        const response = await axios(
          "https://backend-nodejs-suby.onrender.com/vendor/all-vendors"
        );
        setData(response.data.vendors);
      };
    
      const filteredData =data.filter((eachData) => eachData.firm.length > 0);
    
      const slicedData = filteredData.slice(0, 18);

      const filteredHotel=slicedData.filter(eachData=>eachData.firm[0].firmName.toLowerCase()===value)

      const id=filteredHotel[0]?.firm[0]?._id

      useEffect(() => {
        if(id)
            fetchingProductsData(id)
      }, [id]);
    
    const fetchingProductsData = async (idValue) => {
        const response = await axios(
          `https://backend-nodejs-suby.onrender.com/product/${idValue}/products`
        );
        setProductsData(response.data.products);
      };

    return (
        <div className="container">
            <h3 className="bg-warning text-center mt-5 py-1 fw-bold">Searched Restaurant Items</h3>
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
            {!produtsData && <h3 className="text-center text-danger">No Restaurants Found</h3>}
          </div>
    )
}
export default SearchItems


  