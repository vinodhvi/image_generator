import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import {AppContext} from './../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const BuyCredit = () => {
  const {user,backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)

  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount :order.amount,
      currency:order.currency,
      name:"Credits Payment",
      description : "Credits Payment",
      order_id:order.id,
      receipt:order.receipt,
      handler: async (response) => {
        console.log(response);
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  } 
  const paymentRazorpay = async(planId) => {
    try{
      if(!user) {
        setShowLogin(true)
      }
      
  const {data} =  await axios.post(backendUrl+'/api/user/pay-razor', 
    { planId}, {headers:{token}}) 
    if(data.success) {
      initPay(data.order)
    }

    }catch(error) {
      toast.error(error.message, "test")
    }
  }
  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Our Plans
      </button>
      <h1 className='tex-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((cost, index) =>(
          <div key={index} 
          className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600
          hover:scale-105 transition-all duration-500 '>
              <img src={assets.logo_icon} alt='logo' width={40}/>
              <p className='mt-3 mb-1 font-semibold'>{cost.id}</p>
              <p className='text-sm'>{cost.desc}</p>
              <p className='mt-6'>
                <span className='text-3xl font-medium'>${cost.price} </span>/ {cost.credits} credits</p>
              <button onClick={()=> paymentRazorpay(cost.id)}
               className='w-full bg-gray-800 text-white
              mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase' : 'Get Started'}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit;