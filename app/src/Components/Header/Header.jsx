import { Link } from "react-router-dom"

export default function Header(){
    return (
        <>
       
      
        <Link to={"/Home"}> 
        <img src='https://img.etimg.com/thumb/width-1200,height-900,imgsize-122620,resizemode-1,msid-75214721/industry/services/retail/future-group-negotiates-rents-for-its-1700-stores.jpg'
        style={{ float: "left",width:"100px"}}
        />
        </Link>
        <h1  style={{ color:"darkblue",fontWeight:"bold"}}>Shoe Store</h1>
       
        <Link to={"/AddShoe"}><button style={{ float: "right",backgroundColor:"lightblue"}}>AddShow </button></Link>
   
   <Link to={"/Cart"}><button style={{ float: "right",backgroundColor:"lightblue"}}>Cart </button></Link>
   <br/> <br/>
        </>
    )
}