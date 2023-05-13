import { useState } from 'react';
import './styleShoe.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Link } from "react-router-dom"
import api from '../../api/api';
export default function AddShoe() {
    const navigate = useNavigate();
    const [name, nameChange] = useState("");
    const [picture, pictureChange] = useState("");
    const [price, priceChange] = useState("");
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newShoe = {
    //         id: uuidv4(),
    //         name,
    //         picture,
    //         price
    //     }

    //     fetch("http://localhost:3006/shoes", {
    //         method: "POST",
    //         headers: { "content-type": "application/json" },
    //         body: JSON.stringify(newShoe)

    //     }).then((res) => {
    //         navigate('/')

    //     }).catch((err) => {
    //         console.error(err.message)
    //     })
    // }
    const Validation = () => {

        if (name.length > 0 && picture.length > 0 && price > 0)
            return true;
        return false;
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const newShoe = {
            name,
            picture,
            price
        }
        const request = {
            id: uuidv4(),
            ...newShoe
        }
        if (Validation()) {
            const response = await api.post("/shoes", request);
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
                <form onSubmit={handleSubmit2}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required
                        value={name}
                        onChange={(e) => nameChange(e.target.value)}
                    />
                    {name.length == 0 && <span className='text-danger'> Enter Full Name</span>
                    }<br />
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
                    {(price <= 0 || price.length == 0) && <span className='text-danger'> Enter Valid Price</span>
                    } <br /> <br/>
                  <button onClick={()=>navigate("/Home")}>Back</button>
                    <input type="submit" value="Add"  />
                </form>
            </div>

            <div>






            </div>

        </>
    )

}