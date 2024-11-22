import Link from "next/link";
import React from "react";

const ProductPage = async () => {
  // Fetch data from the Strapi API
  const res = await fetch("http://localhost:1337/api/products?populate=image", {
    cache: "no-store", // Ensures fresh data for every request
  });

  const data = await res.json();

  const products = data.data.map((item) => ({
    id: item.id,
    title: item.title,
    documentId: item.documentId,
    description: item.description,
    category: item.category,
    price: item.price,
    color: item.color,
    image: item.image?.formats?.thumbnail?.url || item.image?.url || null,
  }));

  const colorMap = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    black: "bg-black",
    white: "bg-white",
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Explore Our Exclusive Collection
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Browse through a handpicked assortment of products crafted to suit
            your unique style and needs. From everyday essentials to premium
            picks, we have something for everyone. Start exploring today!
          </p>
        </div>
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div key={product.id} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-60 rounded m-auto mb-6"
                  src={
                    product.image
                      ? `http://localhost:1337${product.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={product.title}
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  {product.category || "Uncategorized"}
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {product.title}
                </h2>
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button
                    className={`border-2 ${
                      colorMap[product.color] || "bg-gray-500"
                    } border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`}
                  ></button>
                </div>
                <p className="leading-relaxed text-base">
                  {product.description || "No description available."}
                </p>
                <p className="text-indigo-500 font-bold">
                  Price: ${product.price}
                </p>
                <Link href={`/product/${product.documentId}`}>
                  <button className="inline-flex text-white bg-indigo-500 my-2 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
