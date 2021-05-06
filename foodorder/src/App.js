import './App.css';
import {useEffect, useState} from 'react';
import pizza from './components/pizza.json';
import burger from './components/burger.json';
import home from './components/home.json';
import items from './components/items.json';

const App=()=> {
  const [pizzadata,setPizza]=useState([]);
  const [burgerdata,setBurger]=useState([]);
  const [homedata,setHome]=useState([]);
  const [cart]=useState([])
  const [count,setCount]=useState(1);
  const [v,setVar]=useState(0);
  
  

  useEffect(()=>
  {
    setHome(home);
  },[])



  const showSub=(id)=>
  {
    console.log("show subitems of", id);
    var nodata=document.getElementById("nodata");
    nodata.style.display="none"
    var sub=document.getElementById("subpizza");
    var subb=document.getElementById("subburger");
    var home=document.getElementById("homepage");
    var back=document.getElementById("back");
    home.style.display="none";
    back.style.display="inline";
    if(id===0)
    {
      sub.style.display="inline";
      setPizza(pizza);
      console.log("Pizza Data:",pizzadata)
    }
    else
    {
      subb.style.display="inline";
      setBurger(burger);
      console.log("Burger data:", burgerdata)
    }
  }
  
  const displayCart=()=>
  {
    console.log("Cart data");
    var back=document.getElementById("back");
    var home=document.getElementById("homepage");
    var subp=document.getElementById("subpizza");
    var subb=document.getElementById("subburger");
    var cart=document.getElementById("cartpage");
    var nodata=document.getElementById("nodata");
    back.style.display="inline"
    if(v===0)
    {
      home.style.display="none";
      subp.style.display="none"
      subb.style.display="none"
      nodata.style.display="inline"
    }
    else{
      home.style.display="none";
      subp.style.display="none"
      subb.style.display="none"
      nodata.style.display="none"
      cart.style.display="inline"  
    }
  }

  const addToCart=(id,name)=>
  {
    console.log(id,name)
    var nodata=document.getElementById("nodata");
    var ct=document.getElementById("count");
    nodata.style.display="none"
    if(id in cart)
    {
      setCount(count+1);
      ct.style.display="inline"
    }
    else{
      if(name ==="Pizza")
      {
        for (var i = 0; i < 6; i++)
        {
          if(i===id)
          {
            cart.push(pizza[id]);
          }
        }
      }
      else if(name==="Burger")
      {
        for ( i = 0; i < 6; i++)
        {
          if(i===id)
          {
            cart.push(burger[id]);
          }
        }
      } 
    }
    
    console.log("Cart items", cart)
    setVar(v+1);
  }

  const removeFromCart=(id)=>
  {
    if(v>0)
      setVar(v-1);
      alert(" item Removed");
    if(v<=1)
    {
      var home=document.getElementById("homepage");
      home.style.display="none";
      var cartitem=document.getElementById("cartpage");
      cartitem.style.display="none"
      var nodata=document.getElementById("nodata");
      nodata.style.display="inline"
    }   
    if(count===1)
    {
      var index=cart.indexOf(id);
      cart.splice(id, id+1);
      console.log(cart,index,id)
    }
    else
    {
      setCount(count-1);
    }
    
  }

  const placeOrder=()=>
  {
    setVar(0);
    alert(" Order Placed");
    var home=document.getElementById("homepage");
    home.style.display="block";
    var cartitem=document.getElementById("cartpage");
    cartitem.style.display="none"
    var back=document.getElementById("back");
    back.style.display="none"
    var nodata=document.getElementById("nodata");
    nodata.style.display="none"
  }

  const backPage=()=>
  {
      var home=document.getElementById("homepage");
      home.style.display="block";
      var cartitem=document.getElementById("cartpage");
      cartitem.style.display="none"
      var subp=document.getElementById("subpizza");
      subp.style.display="none"
      var subb=document.getElementById("subburger");
      subb.style.display="none"
      var back=document.getElementById("back");
      back.style.display="none"
      var nodata=document.getElementById("nodata");
      nodata.style.display="none"
  }

  
  return (
    <>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    {/* Home Page data */}
      <div className="head">
      <div id="back" onClick={backPage} style={styles.container}>&lt;Back</div>
        <div className="food">
        Food Ordering Portal
        </div>
        <div id="cart" onClick={displayCart}>
        <i className="fa fa-shopping-cart" style={cur.container}></i> {v}
        </div>
      </div>
      <div className="homepage" id="homepage" style={cur.container}>
        
          <ul className="home" >
          {homedata.map((item,key) =>(
            <>
            <li className="pizzadiv" key={key}>
                <img className="pizza" src={item.image} alt="Pizza" onClick={()=>showSub(item.id)}/>
                <p id="mainhead">{item.name}</p>
            </li>
            </>
             ))}
          </ul> 
        </div>

        {/* Pizza Data */}
          <div id="subpizza" className="subpizza"style={styles.container}>
          <div className="title">
            <div >{items[0].name}</div>
          </div>
          <hr></hr>
          <ul>
            {pizzadata.map((item,key)=>(
              <>
            <li className="list" key={key}>
              <div className="par">
              <span className="name">{item.name}</span><br/>
              <span className="price"><i className="fa fa-inr" aria-hidden="true"></i> {item.price}</span><br/>
              <span className="des">{item.description}</span><br/><br/>
              <button  style={cur.container} onClick={()=>addToCart(item.id,home[0].name)}>Order now</button>
              </div>
              <div className="image">
              <img className="imgPizza" key={key} src={item.image} alt="pizza"/>
              </div>
            </li>
            <hr></hr>
            </>
            ))}
          </ul>
        </div>
        {/* Burger Data */}
            <div id="subburger" className="subburger"style={styles.container}>
            <div className="title">
              <div>{items[1].name}</div>
            </div>
            <hr></hr>
            <ul>
            {burgerdata.map((item,key)=>(
              <>
            <li className="list" key={key}>
              <div className="par">
              <span className="name">{item.name}</span><br/>
              <span className="price"><i className="fa fa-inr" aria-hidden="true"></i> {item.price}</span><br/>
              <span className="des">{item.description}</span><br/><br/>
              <button  style={cur.container} onClick={()=>addToCart(item.id,home[1].name)}>Order now</button>
              </div>
              <div className="image">
              <img className="imgPizza" key={key} src={item.image} alt="pizza"/>
              </div>
            </li>
            </>
            ))}
            </ul>
            <hr></hr>
          </div>
        
        {/* Cart with no data */}
          <div className="title" id="nodata" style={styles.container}>
            Nothin in cart!!!
            <br/>
            <br/>
            <div className="order">
            <button id="order" style={cur.container} onClick={()=>backPage()}>Add items to cart?</button>
            </div>
          </div>
        {/* Cart with Data */}
          <div id="cartpage" className="cartpage"style={styles.container}>
          <div className="title">
            You have ordered:
          </div>
          <hr></hr>
          <ul >
          {cart.map((item,key)=>(
          <li key={key} className="listitem" >
            <div className="paritem">
            <span className="itemname">{item.name}</span><br/>
            <span className="itemdes">{item.description}</span><br/>
            <span className="itemprice"><b>Price: {item.price}</b><span id="count" style={styles.container}> X {count}
            </span><br/><br/></span><br/>
            <br/>
            <button style={cur.container} onClick={()=>removeFromCart(item.id)}>Remove</button>
            </div>
            <div className="image">
            <img className="imgCart" src={item.image} alt="pizza"/>
            </div>
          </li> 
        ))}
          <hr></hr>
          </ul> 
          {/* Place order */}
            <div className="order">
              <button id="order" style={cur.container} onClick={()=>placeOrder()}>Place Order</button>
            </div>          
          </div>
        </>
  )
}

const styles={
  container:
  {
    display:"none",
    cursor:"pointer"
  }
}
const cur={
  container:
  {
    cursor:"pointer"
  }
}
export default App;
