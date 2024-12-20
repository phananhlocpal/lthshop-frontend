// app/product-detail/[nameAlias]/page.js

import ProductDetailClient from './ProductDetailClient'; // Import client-side component

// Fetch product details directly within the server-side component
export async function generateMetadata({ params }) {
  // Await params to ensure it is resolved before accessing its properties
  const { nameAlias } = await params;  // Await params here
  let product = null;

  try {
    const response = await fetch("https://lthshop.azurewebsites.net/api/Products");
    const products = await response.json();
    product = products.find((p) => p.nameAlias === nameAlias);
  } catch (err) {
    console.error("Error fetching product:", err);
  }

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        { url: product.imageURL || "https://res.cloudinary.com/dahzoj4fy/image/upload/v1733244037/fg6rbhwjrx2cyrq6uc7i.png" }
      ],
    },
  };
}

export default async function ProductDetail({ params }) {
  // Await params to ensure it is resolved before accessing its properties
  const { nameAlias } = await params;  // Await params here
  let product = null;

  try {
    const response = await fetch("https://lthshop.azurewebsites.net/api/Products");
    const products = await response.json();
    product = products.find((p) => p.nameAlias === nameAlias);
  } catch (err) {
    console.error("Error fetching product:", err);
  }

  // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  // Trả về client-side component với dữ liệu từ server
  return <ProductDetailClient product={product} />;
}
