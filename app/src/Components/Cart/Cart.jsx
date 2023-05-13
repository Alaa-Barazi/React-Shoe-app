import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleCart.css';
import api from '../../api/api';
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
export default function Cart(){
    const [total, setTotal] = useState('');
    const [count, setCount] = useState('');
   const [cart,setCart] = useState([]);
   const navigate = useNavigate();
    const removeHandler = async(id) =>{
        await api.delete(`/cart/${id}`);
        const newShoesList = cart.filter((shoe)=>{
            return shoe.id!==id;
        });
        setCart(newShoesList);
    }
  const showAll = async () => {
    const response = await api.get("/cart");
    return response.data;
  };
  const calcTotal = (all)=>{
    let sum=0;
    all.map((shoe)=>{
        sum+=(Number)(shoe.price);
    })
    return sum;
   
  }
  useEffect(() => {
    const getAllShoes = async () => {
      const allShoes = await showAll();
      
      if (allShoes) {
        setCount(allShoes.length);
        setTotal(calcTotal(allShoes));
        setCart(allShoes);
       
    }

    };
    getAllShoes();
  }, [])
 
useEffect(()=>{
    setCount(cart.length);
    setTotal(calcTotal(cart));
},[cart])
  return (
    <>

   <table>
    
    <tr>
    <td><img src='https://streaminginfo.ca/wp-content/uploads/2018/03/dollarcosts.png'
      width={"50px"} height={"50px"}
      
      /></td>
      <th><p>Total: {total}$ ==</p></th>
      <th><p>{count} Items</p></th>
    </tr>
   </table>
              

    {/* we Should have a header here */}
    <div className="cardDeck" style={{ display: "flex", flexWrap: "wrap" }}>
       
      {cart.map((shoe, index) => {
              return (
                // <div key={index} className="card" style={{ margin: "1px" ,width:"auto"}}>
                //   <center>
                //   <h4>  {shoe.name}</h4>
                //   <img src={shoe.picture} alt='picture' width={"150px"} height={"150px"} />
                //   <p>{shoe.price}$</p> 
                 
           
           
                //   <button onClick={()=>removeHandler(shoe.id)} className="btn btn-danger">Remove </button>
               
                //   </center>
                // </div>
                <div key={index} className="card">
<h3>{shoe.name}</h3>
<img src={shoe.picture} alt='picture' width={"200px"} height={"200px"} />

<p className="price">{shoe.price}$</p>
<p><button onClick={()=>removeHandler(shoe.id)} >X</button></p>


</div>
               
              );
            })}
      </div>
      <input type="submit" onClick={()=>navigate("/Home")} value="Back"
              />

    </>
  );
}