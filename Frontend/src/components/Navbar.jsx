import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='position-fixed w-100' style={{zIndex:100}}>
            <nav className="mt-2 rounded container navbar navbar-expand-lg navbar-dark bg-success">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="justify-content-center collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="mx-1 nav-item nav-link active" to="/my-orders">My Orders </Link>
                        <Link className="mx-1 navbar-brand" to="/">Get Your Pizza</Link>
                        <Link className="mx-1 nav-item nav-link active" to="/my-orders">My Cart</Link>                                         
                    </div>
                </div>
                <div className='d-flex justify-content-center mx-2 text-white'>
                    <Link className="mx-1 nav-item nav-link active" to="/Form">Login</Link>                     
                    <Link className="mx-1 nav-item nav-link active" to="/my-orders">Sign Up</Link> 
                </div>
            </nav>
        </div>
    )
}
