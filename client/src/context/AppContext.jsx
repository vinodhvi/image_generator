import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    // state for user
    const [user, setUser] = useState(false);
    // for login close
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(false)
     // backend url
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    // backend url
    // credit
    const loadCreditsData = async() => {
        try{
            const {data} = await axios.get(backendUrl + '/api/user/credits',
                {headers: {token}})
                if(data.success) {
                    setCredit(data.credits)
                    setUser(data.user)
                }
        }catch(error) {
        console.log(error) 
        toast.error(error.message)
        }
    }
    // for image generate
    const generateImage = async (prompt) => {
       try {
         const {data} =  await axios.post(backendUrl+"/api/image/generate-image", 
                {prompt}, {headers: {token}}
            )
            if(data.success) {
                loadCreditsData()
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }
       } catch (error) {
        toast.error(error.message)
       }
    }

    // logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }

    useEffect(()=> {
        if(token){
            loadCreditsData()
        }
    }, [token])


    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken
        ,credit, setCredit, loadCreditsData, logout, generateImage
    }
    return (
        <AppContext.Provider value={value}>
                {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;