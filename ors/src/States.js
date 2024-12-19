import React ,{ useState,useRef } from "react"
export default function Tranfer(){
    const [userDetails,setuserDetails] = useState({
    name:'name',
    email:'email',
    password:'pass',
    contact:'phone',
    address:'address',
    country:'country',
    cart:[0],
})

return {userDetails , setuserDetails}
}
// export function NameRef () {
//     const proNameRef = useRef("Name");
//     const updateProName = (newProName) => {
//         proNameRef.current = newProName;
//       };
//     return{ proNameRef, updateProName}
// }