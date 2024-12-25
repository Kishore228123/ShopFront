
import React, { useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { arr } from "./App.js";
import { imgs } from "./prodDesc.js";
import { emailOver } from './login.js'
import './Cart.css';

let imgs2 = JSON.parse(JSON.stringify(imgs));
// console.log('array ele',arr);
export function Table1() {

    let [arr2, Sarr2] = useState(arr);
    const [prodp, Setprodp] = useState(0);
    const a = arr.length;
    // console.log(arr);
    const deleteprod = async (i, id) => {
        imgs2[i].quantity = 1;
        let newarr = arr2.filter((e, index1) => {
            return index1 !== id;
        })
        arr.splice(id, 1);
        Sarr2(newarr);

        try {
            const response = await fetch(`${process.env.BACKENDLINK}`);
            const dataJson = await response.json();

            console.log("user delete: ", emailOver);
            const user = await dataJson.userLogins.find(e => e.email == emailOver);
            if (user) {
                const encodeMail = encodeURIComponent(emailOver);

                const cartDelete = await fetch(`${process.env.BACKENDLINK}/${encodeMail}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: id,
                        newArray: arr2
                    }),
                })
            } else {
                console.log('User not found');
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }

    if (a <= 0) {
        return (<p style={{ width: '100%', textAlign: 'center' }}>no Product is selected</p>);
    }
    else if (a > 0) {

        function Changefn(qn, id) {

            let prodprice = imgs[id].price;
            imgs2[id].quantity = qn;
            imgs2[id].price = qn * prodprice;
            Setprodp(prodp + 1);
        }

        let i1 = arr2.map((e, index) =>
            <div className="cdiv">
                <div>
                    <img style={{ marginTop: '10px', marginLeft: '20px', height: 200, width: 200, marginRight: 20 }} alt="rice" src={imgs2[e]?.imgl} />
                    <p style={{ marginLeft: '20px', fontSize: '20px', fontFamily: 'san-serif' }}>{imgs2[e]?.name}</p>
                </div>
                <div>
                    <div className="cbtn">
                        <div className="cdiv1">
                            <p className="cgap">quantity</p>
                            <input style={{ width: '40px' }} onChange={(i) => Changefn(i.target.value, imgs2[e].id)} value={imgs2[e]?.quantity} min='1' max='5' type='number' />
                            <span>kg</span>
                        </div>
                        <div>
                            <p className="cgap">Price</p>
                            <p className="price">{imgs2[e]?.price}</p>
                        </div>
                    </div>
                    {/* <p className='pcd3 cbuy'>update pr</p> */}
                    <p className='pcd3 cbuy' onClick={() => deleteprod(e, index)}>delete</p>
                </div>
            </div>
        );

        let i2 = arr2.map((e) =>
            <tr >
                <td style={{ width: 100, height: 100 }}>
                    <p style={{ textAlign: "center" }}>{imgs2[e]?.name}</p>
                </td>
                <td style={{ width: 100, height: 100 }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p >{imgs2[e]?.quantity}</p>
                        <span>kg</span>
                    </div>
                </td>
                <td style={{ width: 100, height: 100 }}>
                    <p style={{ textAlign: "center" }}>{imgs2[e]?.price}</p>
                </td>
            </tr>
        );

        let tot = 0;
        // eslint-disable-next-line
        let total = arr2.map((e) => {
            <tr><td colSpan={3}><hr /></td></tr>
            tot = tot + imgs2[e]?.price;
        });
        // console.log(arr2);
        return (
            <>
                <div className="chtot">

                    <div className="c2">
                        {i1}
                    </div>
                    <div className="chl1">

                        <table className="tab">
                            <tr>
                                <th style={{ width: 100, height: 50 }}>Product</th>
                                <th style={{ width: 100, height: 50 }}>quantity</th>
                                <th style={{ width: 100, height: 50 }}>Price</th>
                            </tr>
                            <tr><td colSpan={3}><hr /></td></tr>
                            {i2}
                            <tr><td colSpan={3}><hr /></td></tr>
                            <tr >
                                <td className="br" style={{ textAlign: "center", padding: "10px" }} colSpan={2}>subtotal:</td>

                                <td style={{ textAlign: "center", padding: "10px" }}>{tot}</td>
                            </tr>
                        </table>


                    </div>
                </div>

            </>
        );
    }
}

export default function MyCart() {
    return (

        <div>
            <div className="c1">
                <MdOutlineShoppingBag style={{ marginTop: 6 }} size={40} />
                <p style={{ fontSize: 40 }}>My Cart</p>
            </div>
            <hr style={{ marginTop: 20, marginBottom: 20 }} />
            <Table1 />
        </div>
    );
}

