
import { Route,Routes } from "react-router-dom";
import App from "./App";
import LLogin from "./login";
import Register from "./register";
import Product from "./SingleProd";
import MyCart from "./Cart";
import Buynow  from "./Buynow";
// import Admin from "./Admin";
export default function Routeit(){
    return(
        <>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/Login" element={<LLogin/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Cart" element={<MyCart/>}/>
            <Route path="/Prod" element={<Product/>}/>
            <Route path="/Buynow" element={<Buynow/>}/>
            {/* <Route path="/AdminPage" element={<Admin/>}/> */}
        </Routes>
        </>
    );
}
