import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel .carousel-dark  slide" data-bs-ride="carousel" >
                <div className="carousel-inner" style={{ height: "79vh", borderBottom: "2px dotted black" }}>
                    <div className="carousel-item active" style={{ height: "79vh" }}>
                        <img style={{ filter: "brightness(30%", height: '79vh' }} src="https://plus.unsplash.com/premium_photo-1661762555601-47d088a26b50?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 " alt="..." />
                        <div className='m-1 d-flex justify-content-center'>
                            <input type="text" class="form-control mx-2 w-25" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                            <button className='btn rounded btn-success'>Search</button>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ height: "79vh" }}>
                        <img style={{ filter: "brightness(30%", height: '79vh' }} src="https://media.istockphoto.com/id/1959481213/photo/indian-biryani-food-spicy-mutton-and-chicken-biryani-food-arab-food-kabsah-mandi-or-kabsa.jpg?s=2048x2048&w=is&k=20&c=D11WCqr8Q3DWAFlJYCKL_X0D5OaisqUscFJJFGqOoTw=" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" style={{ height: "79vh" }}>
                        <img style={{ filter: "brightness(30%", height: '79vh' }} src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fHww" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='my-1'>
                <h1 className='apply-font text-center'>View Our Mega Menu</h1>
            </div>
        </div>
    )
}
