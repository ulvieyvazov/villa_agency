import React, { useEffect, useState } from 'react';
import "./index.scss"
import SwiperHome from "../../SwiperHome"
import axios from "axios"

const Home = () => {

    const [data, setData] = useState([])


    const getData = async () => {
        const res = await axios.get("http://localhost:5000/villas")

        setData(res.data)
    }


    
    
    useEffect(() => {
        getData()
    }, [])


    return (
        <div id='home-container'>
            <div className='home-parent'>
                <div className='home-carousel' style={{ display: "flex" }}>
                    <SwiperHome />
                    <div>
                        <p style={{ position: "absolute", zIndex: "777", padding: "10px", top: "40%", left: "20%", width: "10%", display: "flex", fontSize: "20px", backgroundColor: "white", color: "black", paddingLeft: "5px" }}>Toronto, <p style={{ color: "#f35525" }}> Canada</p></p>
                        <h1 style={{ position: "absolute", zIndex: "777", color: "white", top: "50%", left: "20%", width: "30%", textTransform: "uppercase", fontSize: "50px" }}>Hurry! <br />
                            Get the Best Villa for you
                        </h1>
                    </div>
                </div>

                <div className='home-best'>
                    <div className='home-best-left'>
                        <div style={{ position: "relative" }}>
                            <img src="https://templatemo.com/templates/templatemo_591_villa_agency/assets/images/featured.jpg" alt="" />
                            <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#f35525", position: "absolute", top: "90%", left: "-3%", zIndex: "777" }}>
                                <img style={{ margin: "20px 25px" }} src="https://templatemo.com/templates/templatemo_591_villa_agency/assets/images/featured-icon.png" alt="" />
                            </div>
                        </div>

                    </div>

                    <div className='home-best-medium'>
                        <div className='best-medium-top'>
                            <h4>Featured</h4>
                            <h2>Best Appartment & Sea view</h2>
                        </div>

                        <div className='best-medium-bottom'>
                            <span>Best useful links ?</span>
                            <p>Get the best villa website template in HTML CSS and Bootstrap for your business. TemplateMo provides you the best free CSS templates in the world. Please tell your friends about it.</p>
                            <a href="#">
                                How does this work ?
                            </a>
                            <br />
                            <a href="#">
                                Why is Villa Agency the best ?
                            </a>
                        </div>
                    </div>

                    <div className='home-best-right'>
                        <div className='best-card'>
                            250m
                        </div>

                        <div className='best-card'>

                        </div>
                    </div>
                </div>




                <div className='properties-parent'>
                    <div className='properties-text'>
                        <h3>We Provide The Best Property You Like</h3>
                    </div>

                    <div className='properties-card'>
                        {
                            data.map((d) => (
                                <div className='properties-card-child'>
                                    <img src={d.img} alt="" />

                                    <div className='card-text'>
                                        <div className='card-text-top'>
                                            <span>dsds</span>
                                            <h6></h6>
                                            <h4></h4>
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>

                                        <div className='card-text-bottom'>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
