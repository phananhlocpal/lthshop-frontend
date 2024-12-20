"use client"
import React from 'react';
import FacebookIcon from "../../assets/icons/facebook.svg"
import InstagramIcon from "../../assets/icons/instagram.svg"
import TwitterIcon from "../../assets/icons/twitter.svg"
import Link from 'next/link'; 
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-section'>
        <h3>SHOP</h3>
        <ul>
          <li><Link href="#">Men's sneakers</Link></li>
          <li><Link href="#">Women's sneakers</Link></li>
          <li><Link href="#">Kid's sneakers</Link></li>
          <li><Link href="#">Sale items</Link></li>
        </ul>
      </div>
      <div className='footer-section'>
        <h3>ABOUT US</h3>
        <ul>
          <li><Link href="#">Our story</Link></li>
          <li><Link href="#">Our team</Link></li>
          <li><Link href="#">Press</Link></li>
        </ul>
      </div>
      <div className='footer-section'>
        <h3>CUSTOMER SERVICE</h3>
        <ul>
          <li><Link href="#">Shipping & Delivery</Link></li>
          <li><Link href="#">Returns & Exchanges</Link></li>
          <li><Link href="#">FAQs</Link></li>
          <li><Link href="#">Contact Us</Link></li>
        </ul>
      </div>
      <div className='footer-socials'>
        <div className='social-icon-container'><Link href="#"><Image src={FacebookIcon} alt="Facebook" /></Link></div>
        <div className='social-icon-container'><Link href="#"><Image src={InstagramIcon} alt="Instagram" /></Link></div>
        <div className='social-icon-container'><Link href="#"><Image src={TwitterIcon} alt="Twitter" /></Link></div>
        <div className='social-icon-container'><Link href="https://share.hsforms.com/10e2076D8T5eAJ8q7uN7zlQsudj8"><img src="https://th.bing.com/th/id/OIP.gUGkQsv8SjrIb-6SLWzOdgHaHa?rs=1&pid=ImgDetMain" alt="Subscriber" /></Link></div>
      </div>
    </div>
  );
};

export default Footer;
