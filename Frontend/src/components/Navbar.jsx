import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setIsLoggedIn(false)
            toast.success("Logout successful")
        } catch (error) {
            console.error("Error during logout:", error)
        }
    }
    useEffect(() => {
        const checkValidity = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const res = await axios.get("http://localhost:8080/api/me", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    if (res.status == 200) {
                        setIsLoggedIn(true)
                        console.log("User is logged in")
                    } else {
                        localStorage.removeItem("user")
                        localStorage.removeItem("token")
                        console.log("User is not logged in")
                        setIsLoggedIn(false)
                        toast.success("Logout successful")
                    }
                } catch (err) {
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                    setIsLoggedIn(false)
                    console.log('Token is invalid or expired')
                }
            }
        }
        checkValidity()
    }, [])


    return (
        <div className='position-fixed w-100 d-flex' style={{ zIndex: 100 }}>
            {/* <ToastContainer
                    position="bottom-center"
                    hideProgressBar={true}
                    autoClose={3000} // Optional: Adjust auto-close duration (in ms)
                    newestOnTop={true}
                    closeButton={true} // Optional: Hide close button
                    pauseOnHover={false} // Optional: Disable pause on hover
                    draggable={false} // Optional: Disable drag
                  /> */}
            <nav className="mt-2 w-75 rounded container navbar navbar-expand-lg navbar-dark bg-success">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="justify-content-center collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="mx-1 nav-item nav-link active" to="/Home">My Orders</Link>
                        <Link className="mx-1 navbar-brand" to="/Home">Get Your Pizza</Link>
                        <Link className="mx-1 nav-item nav-link active" to="/Home">My Cart</Link>
                    </div>
                </div>
                <div className='d-flex justify-content-center mx-2 text-white'>
                    {isLoggedIn ? (
                        <button className="mx-1 nav-item nav-link active" onClick={logout}>Logout</button>
                    ) : (
                        <>
                            <Link className="mx-1 nav-item nav-link active" to="/Login">Login</Link>
                            <Link className="mx-1 nav-item nav-link active" to="/SignUp">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}
