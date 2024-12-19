import React from "react";
import profilepic from './components/profile.jpg'
import './Profit.css'
export default function Profile(){


    return(
        <div className='Main'>
            <div className='Middle'>
                <img style={{width:100,height:100}} src={profilepic}/>
            <table className='Table'>
                <tr className='TableRow'>
                    <td><label>Name</label></td>
                    <td>Kishore</td>
                </tr>
            </table>

            </div>
        </div>
    )
}