"use client";
import React, { useState } from "react";
import FacebookIcon from "../../assets/icons/facebook.svg";
import InstagramIcon from "../../assets/icons/instagram.svg";
import TwitterIcon from "../../assets/icons/twitter.svg";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducers/userSlice";
import { current } from "@reduxjs/toolkit";
import ModalSucess from "../modal/ModalSucess";
import ModalFailure from "../modal/ModalFailure";

const Footer = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalFailureOpen, setModalFailureOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const data = {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phone: currentUser.phone,
    };

    try {
      const response = await fetch(
        "https://lthshop.azurewebsites.net/api/contacts/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setModalContent({
          title: "Success",
          message: `Successfully subscribe ${currentUser.firstName} ${currentUser.lastName} to LTH Store!`,
        });
        setModalSuccessOpen(true); // Reset trạng thái trước khi mở
        setTimeout(() => setModalSuccessOpen(true), 0);
      } else {
        setModalContent({
          title: "Error",
          message: "Error",
        });
        setModalFailureOpen(true); // Reset trạng thái trước khi mở
        setTimeout(() => setModalFailureOpen(true), 0); // Đảm bảo mở lại sau khi reset
        return;
      }
    } catch (error) {
      setModalContent({
        title: "Error",
        message: "Error",
      });
      setModalFailureOpen(true); // Reset trạng thái trước khi mở
      setTimeout(() => setModalFailureOpen(true), 0); // Đảm bảo mở lại sau khi reset
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="footer">
      <div className="footer-section">
        <h3>SHOP</h3>
        <ul>
          <li>
            <Link href="#">Men's sneakers</Link>
          </li>
          <li>
            <Link href="#">Women's sneakers</Link>
          </li>
          <li>
            <Link href="#">Kid's sneakers</Link>
          </li>
          <li>
            <Link href="#">Sale items</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>ABOUT US</h3>
        <ul>
          <li>
            <Link href="#">Our story</Link>
          </li>
          <li>
            <Link href="#">Our team</Link>
          </li>
          <li>
            <Link href="#">Press</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>CUSTOMER SERVICE</h3>
        <ul>
          <li>
            <Link href="#">Shipping & Delivery</Link>
          </li>
          <li>
            <Link href="#">Returns & Exchanges</Link>
          </li>
          <li>
            <Link href="#">FAQs</Link>
          </li>
          <li>
            <Link href="#">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="footer-socials">
        <div className="social-icon-container">
          <Link href="#" onClick={handleSubscribe}>
            <img
              src="https://th.bing.com/th/id/OIP.gUGkQsv8SjrIb-6SLWzOdgHaHa?rs=1&pid=ImgDetMain"
              alt="Subscriber"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
        <div className="social-icon-container">
          <Link href="#">
            <Image src={FacebookIcon} alt="Facebook" />
          </Link>
        </div>
        <div className="social-icon-container">
          <Link href="#">
            <Image src={InstagramIcon} alt="Instagram" />
          </Link>
        </div>
        <div className="social-icon-container">
          <Link href="#">
            <Image src={TwitterIcon} alt="Twitter" />
          </Link>
        </div>
      </div>
      {modalSuccessOpen && (
        <ModalSucess
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => setModalSuccessOpen(false)}
        />
      )}

      {modalFailureOpen && (
        <ModalFailure
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => setModalFailureOpen(false)}
        />
      )}
    </div>
  );
};

export default Footer;
