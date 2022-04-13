import React from 'react'
import '../Css/Footer.css'
import logo from "../Images/logo2.png"

export default function Footer(){
    return(
        
        <footer className='footer-container'>
            <div className='footer'>
            <img className="logoOwn" src={logo} alt="logo" />

                <div>información de contácto:
                    <li className='itemL'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed di.</li>
                    <li className='itemL'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed di.</li>
                    <li className='itemL'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed di.</li>
                </div>
                <div>medios de pago:
                <li className='itemL'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed di.</li>
                </div>
            </div>
        </footer>
       
    )
}