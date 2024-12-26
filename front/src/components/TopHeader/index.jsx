import React from 'react';
import "./index.scss"
import { IoMdMail } from "react-icons/io";
import { FaInstagram, FaLinkedin, FaMap, FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const TopHeader = () => {
    return (
        <div id='topHeader-container'>
            <div className='topHeader-parent'>
                <div className='topHeader-infos'>
                    <div className='topHeader-left'>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0 45px", borderRight: "1px solid #cdcdcd" }}>
                            <IoMdMail style={{
                                color: "#f35525",
                                fontSize: "25px"
                            }} />
                            <p>info@company.com</p>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0 45px" }}>
                            <FaMap style={{
                                color: "#f35525",
                                fontSize: "25px"
                            }} />
                            <p> Sunny Isles Beach, FL 33160</p>
                        </div>

                    </div>

                    <div className='topHeader-right'>
                        <ul>
                            <li>
                                <a href="#">
                                    <FaFacebook />
                                </a>
                            </li>
                            <li>
                            <a href="#">
                                    <FaTwitter />
                                </a>
                            </li>
                            <li>
                            <a href="#">
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                            <a href="#">
                                    <FaInstagram />
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHeader;
