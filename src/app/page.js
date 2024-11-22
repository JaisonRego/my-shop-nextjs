import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div className="my-2">
          <img
            className="object-contain hover:object-scale-down w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px]"
            src="/images/banner.png"
            alt="Homepage Banner"
          />
        </div>
        <div className="flex flex-col text-center w-full mb-20 mt-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Discover Exclusive Deals & Premium Products
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Explore a wide range of products across categories like fashion,
            electronics, home decor, and more. Enjoy seamless shopping with fast
            delivery and exceptional customer service.
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Trending Products
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Stay ahead of the trends with our curated collection of
              best-selling items, updated weekly to keep you in style.
            </p>
            <a
              href="/trending"
              className="text-indigo-500 inline-flex items-center"
            >
              Shop Now
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Electronics
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Discover the latest gadgets and electronics from top brands at
              unbeatable prices. From smartphones to smart home devices, we’ve
              got it all.
            </p>
            <a
              href="/electronics"
              className="text-indigo-500 inline-flex items-center"
            >
              Explore
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Home & Living
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Transform your space with our collection of modern home decor,
              kitchen essentials, and cozy furniture.
            </p>
            <a
              href="/home-living"
              className="text-indigo-500 inline-flex items-center"
            >
              Browse
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Fashion
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Upgrade your wardrobe with the latest fashion trends. From casual
              wear to formal attire, find outfits for every occasion.
            </p>
            <a
              href="/fashion"
              className="text-indigo-500 inline-flex items-center"
            >
              See More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <Link href="/product">
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Start Shopping
          </button>
        </Link>
      </div>
    </section>
  );
}
