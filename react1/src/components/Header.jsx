import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header style={{width:"100vw", height:"50px" , backgroundColor:"lightblue" , display:'flex', alignItems:"center", justifyContent:'center', gap:"10px"}}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
        </header>
    )
}