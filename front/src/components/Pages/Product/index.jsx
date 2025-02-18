import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Product = () => {

    const [data, setData] = useState([])
    
    const getData = async()=>{
        const res =  await axios.get("http://localhost:5000/villas")

        setData(res.data)
    }

    data.map((item) => console.log(item.name));
    

    useEffect(()=>{
        getData()
    },[])

    return (
        <div>
            {
               data.map((d)=>(
                <div>
                    <h1>{d.name}</h1>
                </div>
               ))
            }            
        </div>
    );
}

export default Product;
