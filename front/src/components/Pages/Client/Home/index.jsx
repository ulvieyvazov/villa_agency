import React from 'react';
import "./index.scss"
import SwiperHome from "../../SwiperHome"

const Home = () => {
    return (
        <div id='home-container'>
            <div className='home-parent'>
                <div className='home-carousel' style={{ display: "flex" }}>
                    <SwiperHome />
                    <div>
                        <p style={{position: "absolute", zIndex: "777", padding:"10px", top:"40%",left: "20%", width: "10%",display:"flex", fontSize:"20px", backgroundColor: "white", color:"black", paddingLeft:"5px"}}>Toronto, <p style={{color: "#f35525"}}> Canada</p></p>
                        <h1 style={{ position: "absolute", zIndex: "777", color: "white", top: "50%", left: "20%", width: "30%", textTransform: "uppercase", fontSize: "50px" }}>Hurry! <br />
                            Get the Best Villa for you
                        </h1>
                    </div>
                </div>

                <div className='home-best'>
                    <div className='home-best-left'>
                        
                    </div>

                    <div className='home-best-medium'>

                    </div>

                    <div className='home-best-right'>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
