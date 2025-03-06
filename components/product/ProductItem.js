"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { icons } from "../../assets/icons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWishlist } from "../../utils/hooks/useWishlist";
import { formatPrice } from "../../utils/hooks/useUtil";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

function ProductCard({ product, index }) {
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const itemExists = wishlistItems.find(
    (item) => item.nameAlias === product.nameAlias
  );

  // Motion values for tilt effect
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className="product-card relative h-96 w-72 rounded-xl bg-gradient-to-br"
    >
      <FontAwesomeIcon
        icon={itemExists ? icons.heartFull : icons.heart}
        onClick={() => toggleWishlistItem(product)}
        className="absolute top-4 right-4 z-10 text-white cursor-pointer"
      />

      <div className="product-img">
        <Link href={`/product-detail/${product.nameAlias}`}>
          <img
            src={product.imageURL}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
      </div>

      <div className="product-info p-4">
        <Link href={`/product-detail/${product.nameAlias}`}>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;
