
import React from 'react';
import './Cart.css';
import { IoLocationSharp } from "react-icons/io5";
import { buyid } from './App';


export default function Buynow(id){
if(buyid == null){
    return("no producted is selected for buying");
}
else{
    return(
      <>
        <div>
              <div className='buy1'>
                <h3 style={{fontSize:"30px",padding:"10px"}}>KRShop.in</h3>
                <h3 style={{fontSize:"30px",padding:"10px"}}>Checkout</h3>
                <h3 style={{fontSize:"20px",paddingTop:"15px"}}>Lock</h3>
              </div>
              <div className='buy2'>

                <div className='buy3'>

                    <pre style={{fontSize:"25px",alignContent:"left",marginBottom:"20px"}}>1   Enter a new Shipping address</pre>

                    <div className='buy4'>
                        <h3 className='buydown1'>Add a new Address</h3>
                        <pre className='buydown1' style={{width:"330px",borderRadius:"5px",padding:"10px",backgroundColor:"lightblue",fontSize:"14px",lineHeight:"20px",border:"0.5px solid lightblue"}}>save time. add your current location        -&#10095; <IoLocationSharp /></pre>
                        <label className='buydown2'>Country</label>
                        <select className='inpbox'>
                            <option value="India">India</option>
                            <option value="Usa">Usa</option>
                            <option value="Germany">Germany</option>
                            <option value="China">China</option>
                        </select>
                        <label className='buydown2' >Full name</label>
                        <input className='buydown1 inpbox'  type='text'/>
                        <label className='buydown2' >Mobile number</label>
                        <input className='inpbox' type='text' maxLength="10"/>
                        <p className='buydown1' >May be used to assist delivery</p>
                        <label className='buydown2' >Pincode</label>
                        <input className='buydown1 inpbox' type='text' maxLength="6"/>
                        <label className='buydown2' >Flat, House no., Building, Company, Apartment</label>
                        <input className='buydown1 inpbox'  type='text'/>
                        <label className='buydown2' >Landmark</label>
                        <input  className='buydown1 inpbox' type="text" placeholder='eg. near apollo hospital'/>
                        <label className='buydown2' >Town/City</label>
                        <input  className='buydown1 inpbox' type='text'/>
                        <label className='buydown2' >State</label>
                        <select style={{marginBottom:"20px"}} className='inpbox' >
                            <option value="TamilNadu">TamilNadu</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Karnataka">Karnataka</option>
                        </select>
                        <p style={{marginBottom:"20px"}} >Make this my default address</p>
                        <p className='buydown1' >Use this address</p>

                    </div>

                    <br/>
                    <hr/>
                    <div className='hid'>
                    <div className='buy5'>
                    <pre style={{fontFamily:"monospace",fontSize:"15px",alignContent:"left",marginBottom:"30px"}}>2  Payment Method</pre>              
                    </div>
                    <hr/>
                    <div className='buy5'>
                    <pre style={{fontFamily:"monospace",fontSize:"15px",alignContent:"left",marginBottom:"30px"}}>3  Items and delivery</pre>              
                    </div>
                    <hr/>
                    <br/>
                    <p style={{fontSize:"10px",fontFamily:"sans-serif"}}>
                    When your order is placed, we'll send you an e-mail message acknowledging receipt of your order. If you choose to pay using an electronic payment method (credit card, debit card or net banking), you will be directed to your bank's website to complete your payment. Your contract to purchase an item will not be complete until we receive your electronic payment and dispatch your item. If you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net banking when you receive your item.
                    </p>
                    <br/>
                    <p style={{fontSize:"10px",fontFamily:"sans-serif"}}>See Amazon.in's Return Policy.</p>
                    <br/>
                    <p style={{fontSize:"10px",fontFamily:"sans-serif"}}>
                    Need to add more items to your order? Continue shopping on the Amazon.in homepage.
                    </p>
                    </div>
                    <br/><br/>
              </div>
              </div>
        </div>
      </>
    );
  }
}