import React, { useEffect, useState } from "react";
import { Route, Routes,Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import api from '../../api/api';
import Header from "../Header/Header";
const Home = () => {
  
    const [shoes, setShoes] = useState([])
  const showAll = async () => {
    const response = await api.get("/shoes");
    return response.data;
  };
  const AddToCartHandler = async(shoe) =>{
    const request = {
      id:uuidv4(),
      ...shoe
  }
  const response = await api.post("/cart",request);
  if(response){
  alert('Added Succefully')}
  else{
    alert('Error Try Again');
  }
  //setCart([...shoes,response]);
  }
  const addShoeHandler = async(shoe) =>{
    console.log(shoe);
    const request = {
        id:uuidv4(),
        ...shoe
    }
    const response = await api.post("/shoes",request);
    setShoes([...shoes,response]);
}
const removeHandler = async(id) =>{
    await api.delete(`/shoes/${id}`);
    const newShoesList = shoes.filter((shoe)=>{
        return shoe.id!==id;
    });
    setShoes(newShoesList);
}
  useEffect(() => {
    const getAllShoes = async () => {
      const allShoes = await showAll();
      if (allShoes) setShoes(allShoes);

    };

    getAllShoes();
  }, [])


  return (
    <>
   
   

  
    <div className="cardDeck" style={{ display: "flex", flexWrap: "wrap" }}>
      {shoes.map((shoe, index) => {
              return (
                <div key={index} className="card" style={{ margin: "1px",width:"auto"}}>
                  <center>
                  <h4>  {shoe.name}</h4>
                  <img src={shoe.picture} alt='picture' width={"150px"} height={"150px"} />
                  <p>{shoe.price}$</p> 
                  <Link to={{
                   pathname: `/EditShoe/${shoe.id}`,
                   state: { shoes: shoes}
                } }>
                <button className="btn btn-success">Edit</button>
            </Link>
            &nbsp;
                  <button onClick={()=>removeHandler(shoe.id)} className="btn btn-danger">Delete </button>
                 &nbsp;
                  <button onClick={()=>AddToCartHandler(shoe)} className="btn btn-primary">Cart </button>

                  </center>
                </div>
               
              );
            })}
      </div>
     

    </>
  );
};

export default Home;

