'use client';

import React from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons/icons";
import { usePathname } from "next/navigation"; // Thay thế useRouter
import { useCart } from "../../utils/hooks/useCart";
import { useWishlist } from "../../utils/hooks/useWishlist";
import { searchProducts } from "../../store/reducers/productSlice";
import Link from "next/link";

function Header() {
  const pathname = usePathname(); // Lấy pathname từ usePathname
  const { quantity } = useCart();
  const { wishlistCount } = useWishlist();
  const dispatch = useDispatch();

  const isHome = pathname === "/";
  const isShop = pathname === "/shop";

  const handleSearchChange = (e) => {
    dispatch(searchProducts(e.target.value));
  };

  return (
    <nav>
      <div className="header-second">
        <div className="header-second-msg">
          <p>
            <span>SECURE</span> PAYMENT THROUGH PAYPAL & VNPAY
          </p>
          <p>
            <span>FREE</span> SHIPPING ON ORDERS OVER 1.000.000 VND
          </p>
          <p>
            <span>100%</span> AUTHENTIC
          </p>
        </div>
      </div>
      <div className="header-container">
        <Link className="header-main header-section" href="/">
          <img
            src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1733244037/fg6rbhwjrx2cyrq6uc7i.png"
            style={{ width: "100px", height: "auto" }}
            alt="Logo"
          />
        </Link>

        <ul className="header-section">
          <li>
            <Link href="/shop">SHOP</Link>
          </li>
          <li>
            <Link href="/">CONTACT US</Link>
          </li>
          <li>
            <Link href="/">ABOUT US</Link>
          </li>
        </ul>
        <div className="header-tools header-section">
          <Link href="/account">
            <div className="svg-icon">
              <FontAwesomeIcon icon={icons.user} />
            </div>
          </Link>
          <Link href="/wishlist">
            <div className="svg-icon">
              <FontAwesomeIcon icon={icons.heart} />
              {wishlistCount > 0 && (
                <span>{wishlistCount > 9 ? "9+" : wishlistCount} </span>
              )}
            </div>
          </Link>
          <Link href="/cart">
            <div className="svg-icon">
              <FontAwesomeIcon icon={icons.cart} />
              {quantity > 0 && <span>{quantity > 9 ? "9+" : quantity} </span>}
            </div>
          </Link>
          <div className="burger">
            <FontAwesomeIcon icon={icons.hamburger} />
          </div>
        </div>
      </div>
      <div className={`header-search ${isShop ? "active" : ""}`}>
        <div className="input-wrapper">
          <FontAwesomeIcon icon={icons.search}></FontAwesomeIcon>
          <input
            type="text"
            id="search"
            placeholder="Search..."
            name="search"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className={`header-line ${isHome || isShop ? "active" : ""}`}></div>
    </nav>
  );
}

export default Header;
