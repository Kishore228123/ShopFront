


import React from 'react';

import './Cart.css';
import { imgs } from './prodDesc';
import { selectp, AddCart } from './App';

const Addcart = (id) => {
    AddCart(id);
}
export function Prodfn() {
    if (selectp == null) {
        return (<p>no product is selected</p>);
    }
    else {
        let iarr = [0, 1, 2, 3];
        let i = iarr.map((e) => <p style={{ marginBottom: "30px" }}>{Object.values(imgs[selectp].nutrient[e])}</p>);
        return (
            <div className='sp1'>
                <div className='sp2'>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <img style={{ width: "20vw", height: "250px", marginBottom: '20px' }} alt="rice" src={imgs[selectp].imgl} />
                        <h3 style={{ fontSize: "25px", width: "200px", textAlign: 'center' }}>{imgs[selectp].name}</h3>
                    </div>
                    <div style={{ width: '15%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '80px', marginTop: '100px', display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <p>Quantity</p>
                                <p style={{ textAlign: 'center' }}>{imgs[selectp].quantity}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p>Price</p>
                                <p style={{ textAlign: 'center' }}>{imgs[selectp].price}</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <button style={{ marginBottom: '30px', width: '100px' }}>Buynow</button>
                            <button onClick={() => Addcart(selectp)} style={{ width: '100px' }}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className='sp3'>

                    <h3>About:</h3>
                    <p style={{ width: "fit-content", marginTop: "20px", marginBottom: '30px' }}>{imgs[selectp].description}</p>
                    <h3 style={{ marginBottom: "30px" }}>Nutrient Benifits:</h3>
                    {i}
                </div>
            </div>
        );
    }
}
export default function Product() {
    return (
        <>
            <Prodfn />
        </>
    );
}