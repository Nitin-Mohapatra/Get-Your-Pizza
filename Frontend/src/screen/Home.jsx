import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import CardWrapper from '../components/CardWrapper'
import Footer from './Footer'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Carticon from '../components/Carticon'
import CartModal from './CartModal.jsx'
import { toast } from 'react-toastify';
import { useCart, useDispatch } from '../components/CartProvider.jsx';

export default function Home() {
  
  const [foodData, setFoodData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const cart = useCart();
  
  const handleCartOpen = () => {
     if (cart.length === 0) {
    toast.info("Your cart is empty!");
    return;
    }
    setCartOpen(true)
  }

  const uploadData = async () => {
    try{
      const respose = await axios.get('http://localhost:8080/api/loadFoodData') 
      if(respose.status === 200){
        setFoodData((respose.data.pizzaData))
        setCategoryData((respose.data.categoryData))
        setLoading(true)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() =>{
    uploadData()
  },[])

  return (
    <div>
        {/* endering navbar */}
        <Navbar></Navbar>

        {/* Rendering the carousell */}
        <Carousel></Carousel>

        {/* Rendering card */}
        {
          loading ?
           categoryData.map((category)=>{
            return (
              <div key={category._id}>
                <h1 className='text-bold mt-2 mx-3'>{category.CategoryName}</h1>
                <hr></hr>
                <div className='container-fluid'>
                  <div className='row'>
                    {foodData.filter((item)=> item.category === category.CategoryName).map((ele)=>{
                      return (
                        <div className ='m-3 col-lg col-md-3 col-sm-6 col-xs-12' key={foodData._id}>
                          <CardWrapper foodData={ele}/>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
           })
          : (<div className='flex justify-center items-center h-screen'> Please Wait Your Menu is Loading ... </div>)
        }
        
        {/* Rendering cart icon */}
        <div className='fixed-bottom d-flex justify-content-end m-3' onClick={handleCartOpen}>
          <Carticon></Carticon>
        </div>

        {/* Rendering cart modal */}
        <CartModal open={cartOpen} handleClose={() => setCartOpen(false)}></CartModal>

        {/* Rendering footer */}
        <Footer></Footer> 
    </div>
  )
}
