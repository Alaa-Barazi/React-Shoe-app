import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/api'
import { useParams,useNavigate } from "react-router-dom";
import './styleED.css';
export default function EditShoe(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, nameChange] = useState("");
    const [picture, pictureChange] = useState("");
    const [price, priceChange] = useState("");

    const showAllSpecific = async () => {
        const response = await api.get(`/shoes/${id}`);
        return response.data;
      };
   
      useEffect(() => {
        const getAllDetails = async () => {
            const shoes = await showAllSpecific();
            if (shoes) {
                nameChange(shoes.name);
                pictureChange(shoes.picture);
                priceChange(shoes.price);
            }
          };
      
          getAllDetails();
    //    fetch(`http://localhost:3006/shoes/${id}`).then((res)=>{
    //     return res.json();
    //    }).then((resp)=>{
    //     nameChange(resp.name);
    //     pictureChange(resp.picture);
    //     priceChange(resp.price);

    //    }).catch((err)=>{
    //     console.error(err);
    //    })
   
      }, [])
    const Validation = () => {
        if (name.length > 0 && picture.length > 0 && price > 0)
            return true;
        return false;
    }
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newShoe = {
            id,
            name,
            picture,
            price
        }
        const request = {
            id: uuidv4(),
            ...newShoe
        }
        if (Validation()) {
            const response = await api.put(`/shoes/${id}`, request);
            navigate('/');
        }
        else {
            alert('Enter valid details');
            nameChange("");
            pictureChange("");
            priceChange("");
        }
    }
    return (
              
      <>
      <h3>Add Shoe</h3>
      <div className="container">
           <form  onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required
                  value={name}
                  onChange={(e) => nameChange(e.target.value)}
              />
             <br />
              <label htmlFor="url">ImageURL</label>
              <input type="text" id="url"
                  value={picture}
                  onChange={(e) => pictureChange(e.target.value)}
              />
              <label htmlFor="price">Price</label>
              <input required type="text" id="price"
                  value={price}
                  onChange={(e) => priceChange(e.target.value)}
              />
              <br /> <br/>
              <input type="submit" onClick={()=>navigate("/Home")} value="Back"
              /> &nbsp;
               <input type="submit" value="Update"  />  
          </form>
      </div>
      <div>
      </div>
  </>
 );

}