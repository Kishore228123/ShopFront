
import React,{useState,useEffect} from 'react';
import './index.css';
import searchbar from './components/search.png';
import profile from './components/profile.jpg'
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa6";
import { FaChrome } from "react-icons/fa";
import { SiFirefoxbrowser } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { imgs,imgss } from './prodDesc';
import { emailOver, proName } from './login';
import bombarice from './components/Bombarice.webp';
import Tranfer from './States';
export var loginSwitch = false;
export let dd1=1;

export  var imgs1=JSON.parse(JSON.stringify(imgs));


// -->

export let arr=[];


console.log('email',emailOver);

export const AddCart = async (idd) => {
  // Prevent adding duplicate items
  if (!arr.includes(idd)) {
    arr.push(Number(idd)); // Add item to cart array
    console.log("email : _",emailOver ," gmail");
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000');
        const dataJson = await response.json();

        const user = dataJson.userLogins.find(e => e.email === emailOver);

        if (user) {
          const encodedMail = encodeURIComponent(emailOver);

          const updateUser = await fetch(`http://localhost:8000/${encodedMail}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: arr }), // Send the updated cart
          });

          if (!updateUser.ok) {
            throw new Error(`HTTP error! Status: ${updateUser.status}`);
          }

          const resultPost = await updateUser.json();
          console.log('Updated user:', resultPost);
        } else {
          console.log('User not found');
        }
      } catch (e) {
        console.error('Error:', e);
      }
    };

    fetchData(); // Execute the fetchData function
  }
};


// -->
export let buyid;
// -->
export let selectp;



// --->
export function Catalog(){
 

let catalogarray=[0,1,2,3,4,5,6,7];
let i=catalogarray.map((e )=>
   

<div className='pc1'>
<img className='pci' src={imgs1[e].imgl || bombarice} alt={imgs1[e].name}/>
<h3 className='pcd1'>{imgs1[e].name}</h3>
<div className='pc2'>
<p style={{fontSize:15,fontFamily:'Poppins, sans-serif'}}>quantity:</p>  
<p style={{marginRight:'30px',fontSize:15,fontFamily:'Poppins, sans-serif'}}>{imgs1[e].quantity}kg</p>
<p>|</p>
<p style={{fontSize:15,marginLeft:'auto',fontFamily:'Poppins, sans-serif'}}>price:</p>
 <p style={{fontSize:15,fontFamily:'Poppins, sans-serif'}} >&#8377;{imgs1[e].price}</p>
</div>
<Link style={{color:"black",textDecorationLine:"none",fontFamily:'Poppins, sans-serif'}} to="/Buynow" ><p className='pcd3' onClick={()=>{buyid=imgs1[e].id; selectp=(imgs1[e].id)}}>Buy now</p></Link>
<p className='pcd3' onClick={()=>AddCart(imgs1[e].id)}>add to cart</p>
</div>

);
return (
<div className="catalog" style={{display:'flex',flexWrap:'wrap',flexGrow:"3",flexShrink:"3",justifyContent:"space-around"}}>{i}</div>
);
}



// ------------------------------------------------------------
export default function App() {

  let len=imgss.length;
  let count=0;
  // eslint-disable-next-line
  let [cnt,setCnt]=useState(count);
  const [Dashh,sDashh]=useState(0);
  // eslint-disable-next-line
  const [obj,setObj] = useState([]);
  const {userDetails , setuserDetails} =Tranfer();
  const [inputValue, setInputValue] = useState('');



  function AAr(){
   
    let narr1=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];  
   
    let dashvar=narr1.map((e)=><p style={{paddingLeft:"30px",paddingBottom:"20px"}} onClick={()=>{selectp=e}}><Link style={{fontSize:"20px",color:"white",textDecorationLine:"none"}} to="/Prod" >{imgs[e].name}</Link></p>);
    return(dashvar);
  }

  function DashBoard(){
    return(
      <div className='Dash1'>
        <div className='Dash2'>
          <AAr/>
       </div>
      </div>
    );
  }

  function Ar(){
    let narr=[0,1,2,3,4,5,6];  
    let ii=narr.map((e)=><p onClick={()=>{selectp=e}}><Link style={{color:"white",textDecorationLine:"none"}} to="/Prod" >{imgs[e].name}</Link></p>);

    return(
    <>
    <div  className='flex3'>
      <button className='sh1' onClick={()=>{Dashh===1 ? sDashh(0) : sDashh(1)} }> all</button>
     
         {ii}
    </div>
 
    </>);
  }


//  --> slide img

function Fnright(){
      if(cnt<len-1)
        setCnt(cnt=>cnt+1);
}
 function Fnleft(){
    if(cnt>0)
      setCnt(cnt=>cnt-1);
 }

// --> end slide img

  function Points(){
    function Fnchange(id){
        setCnt(id);
    }
    let p=imgss.map((e)=>{
      if(cnt===e.id-1)
      return <p className='p1 blk'></p>
      else
      return <p onClick={()=>Fnchange(e.id-1)} className='p1'></p>
    })
    return p;
  }

  useEffect( () =>{
      const fetchData = async () =>{
        try{
        const data= await fetch("http://localhost:8000");
        const dataJson= await data.json();
        setObj(dataJson);
        arr=dataJson.userLogins[0].cart; //incomplete - sample 0th user detail is fetched
        }
        catch(e){
          console.error(e);
        }
      }
      fetchData();
  },[])

  function Body(){
    return(
      <>
      <div className='scrolld'>
      <img  className='img1' alt='rice' src={imgss[cnt].name}/>
      <button className='lnext' style={{opacity: cnt===0 && 0.5}} onClick={Fnleft}>&#10094;</button>
      <button className='rnext' style={ {opacity:cnt===imgss.length-1 && 0.5}} onClick={Fnright}>&#10095;</button>
     </div>
   
     <div className='pdiv' >
       <Points/>
       </div>

{/* --> catalog */}
<div className='trenddiv'>
  <p className='trend'>Trending Sale Products:</p>
</div>
<Catalog/>

      </>
    )
  }
// handle search

  const handleSearch = (e) =>{
      setInputValue(e.target.value);
      console.log(e.target.value)
  }
const SearchComponent = (e) =>{
  let searchID=[];
  let len=imgs1.length;
  for(let i=0;i<len;i++){
    let nameLen = imgs[i].name;
    let inputLen=inputValue.length;
    for(let j=0;j<inputLen;j++){
      if(inputValue[j] == imgs[i].name[j]){
        searchID.push=imgs[i].id;
      }
      else{
        break;
      }
    }
  }
  
  for(let i=0;i<searchID.length;i++){
    console.log(searchID[i]);
  }
  
  searchID.map((e)=>{
    return (<p>{imgs[e-1].name}       </p>)
  })
  // let i=searchID.map((e )=>
     
  
  //   <div className='pc1'>
  //   <img className='pci' src={imgs1[e].imgl} alt={imgs1[e].name}/>
  //   <h3 className='pcd1'>{imgs1[e].name}</h3>
  //   <div className='pc2'>
  //   <p style={{fontSize:15,fontFamily:'Poppins, sans-serif'}}>quantity:</p>  
  //   <p style={{marginRight:'30px',fontSize:15,fontFamily:'Poppins, sans-serif'}}>{imgs1[e].quantity}kg</p>
  //   <p>|</p>
  //   <p style={{fontSize:15,marginLeft:'auto',fontFamily:'Poppins, sans-serif'}}>price:</p>
  //    <p style={{fontSize:15,fontFamily:'Poppins, sans-serif'}} >&#8377;{imgs1[e].price}</p>
  //   </div>
  //   <Link style={{color:"black",textDecorationLine:"none",fontFamily:'Poppins, sans-serif'}} to="/Buynow" ><p className='pcd3' onClick={()=>{buyid=imgs1[e].id; selectp=(imgs1[e].id)-1}}>Buy now</p></Link>
  //   <p className='pcd3' onClick={()=>AddCart(imgs1[e].id)}>add to cart</p>
  //   </div>
    
  //   );
  //   return (
  //     <div className="catalog" style={{display:'flex',flexWrap:'wrap',flexGrow:"3",flexShrink:"3",justifyContent:"space-around"}}>{i}</div>
  //     );
  

}



// return funtion
return (
  <div className='maindiv'>
      <div className='fdiv'>
      <nav className="nav1">
      <div className='flex1'>
    <p className="h1">KRShop.in</p>
    <input  onChange={handleSearch} className="h2" name="search" value={inputValue} placeholder="Search" type="text" />
   
    <img className="h3"  src={searchbar} alt="search"/>
    <p style={{color:'white',marginRight:50}}>{proName}</p>
    <img src={profile} style={{width:30,height:30,borderRadius:26}}/>
     </div>
     <div className='flex2'>
     <button className="h4" >{proName === "Name" ? <Link  className="LINK" to="Login"> Sign in </Link> : "Logout" }</button>
     <button className="h5" ><Link to="Cart" style={{textDecoration:"none",color:"#000"}}> Cart </Link></button>
     <p style={{color:"white"}}className="h6">returns & order</p>
  </div>
     </nav>

     
     <nav className='nav2'>
     
      <Ar/>

     </nav>
     </div>


     <div className='ldiv'>
{/* image scroll */}
     {
      inputValue.length == 0 ?
      <Body/> : <SearchComponent/>
     }
{/*  */}
<footer className='foot'>

<div className='fd1'>
  <h3 className='fabt'>About</h3>
  <p className='fabtp'>Our vision is to deliver quality beyond question and convenience that adds something great to your day & to develop a short supply chain so you can experience fresh rice at its finest.</p>
  <p className='fabtc'>©KRShop.com - 2018 | All Rights Reserved</p>
</div>


<div className='fd2'>
<ul className='fdul1'>
  <h3>Menu</h3>
  <li>Home</li>
  <li>Services</li>
  <li>Features</li>
  <li>Pricing</li>
  <li>Blog</li>
</ul>

<ul className='fdul1'>
<h3>social media</h3>
<li><FaInstagram/></li>
<li><FaFacebook/></li>
<li><FaChrome/></li>
<li><FaSpotify/></li>
<li><SiFirefoxbrowser/></li>
</ul>

<ul className='fdul2'>
<h3>Information</h3>
<li>terms & conditions</li>
<li>conditions</li>
<li>privacy</li>
<li>security</li>
</ul>

</div>

</footer>
    </div>
     {Dashh===1 && <DashBoard/>}
    </div>
  );
};















//addCart old code

// const AddCart = async (idd) => {
//   // e.preventDefault();
//   let flag1=0;
//   for(let i=0;i<arr.length;i++){
//     if(arr[i]==idd){
//       flag1=1;
//       break;
//     }
//   }

//   if(flag1==0){
//     arr.push(idd);
//   const fetchData = async () =>{
//       try{

//       const data= await fetch('http://localhost:8000');
//       const dataJson= await data.json();
//       const len = dataJson.userLogins.length;
//       let flag=0;
//       for(let i=0;i<len;i++){
//         if(dataJson.userLogins[i].email === emailOver){
//           flag=1;
//           break;
//         }
//     }
//     if(flag==1){
//       const userMail=emailOver;
//       const encodedMail=encodeURIComponent(userMail);
//       const updateUser = await fetch(`http://localhost:8000/${encodedMail}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({cart:arr}),
//       });
//       if (!updateUser.ok) {
//           throw new Error(`HTTP error! Status: ${updateUser.status}`);
//       }

//       const resultPost = await updateUser.json();
//       console.log('updated user',updateUser);
//     }
//     }

     
     
//       catch(e){
//           console.error(e);
//         }
//     }                

//   fetchData();

//   }
// }