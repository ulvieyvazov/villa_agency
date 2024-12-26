import React from 'react';
import "./index.scss"
import { FaCalendar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div id='header-container'>
            <div className='header-parent'>
                <div className='header-nav'>
                    <div className='header-left'>
                        villa
                    </div>

                    <div className='header-right'>
                        <ul className='ul'>
                            <li><NavLink to={"/"}>Home</NavLink></li>
                            <li><NavLink to={"/properties"}>Properties</NavLink></li>
                            <li>Contact Us</li>
                            <li className='visit'>
                                <div style={{width: "40px", height: "40px", backgroundColor: "#f35525", borderRadius: "50%", position: "relative"}}>
                                    <FaCalendar style={{ color: "white", position: "absolute", top:"25%", left: "30%" }} />
                                </div>
                                Schedule a visit</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
