"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [homepageData, setHomepageData] = useState(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/homepage?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch homepage data");
        }
        const data = await response.json();
        setHomepageData({
          bannerImage:
            data?.data?.bannerImage?.formats?.large?.url ||
            data?.data?.bannerImage?.url ||
            null,
          mainTitle: data?.data?.mainTitle || null,
          mainDescription: data?.data?.mainDescription || null,
          categories:
            data?.data?.category?.map((category) => ({
              title: category?.title || "Untitled",
              description:
                category?.description
                  ?.map(
                    (desc) =>
                      desc?.children?.map((child) => child?.text).join("") || ""
                  )
                  .join(" ") || "No description available.",
              linkPath: category?.linkpath || "#",
              linkName: category?.linkname || "Learn More",
            })) || [],
          ctaLink: data?.data?.ctaLink || null,
          ctaText: data?.data?.ctaText || "Learn More",
        });
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchHomepageData();
  }, []);

  if (!homepageData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        {/* Banner Image */}
        <div className="my-2">
          <img
            className="object-contain hover:object-scale-down w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px]"
            src={
              homepageData.bannerImage
                ? `http://localhost:1337${homepageData.bannerImage}`
                : "https://dummyimage.com/400x400"
            }
            alt="Homepage Banner"
          />
        </div>

        {/* Main Title and Description */}
        <div className="flex flex-col text-center w-full mb-20 mt-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            {homepageData.mainTitle || "Welcome to our website"}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {homepageData.mainDescription || "Explore our amazing content."}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap">
          {homepageData.categories.length > 0 ? (
            homepageData.categories.map((category, index) => (
              <div
                key={index}
                className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60"
              >
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                  {category.title}
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  {category.description}
                </p>
                <a
                  href={category.linkPath}
                  className="text-indigo-500 inline-flex items-center"
                >
                  {category.linkName}
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
            ))
          ) : (
            <div className="w-full text-center py-10">
              <p>No categories available.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        {homepageData.ctaLink && homepageData.ctaText ? (
          <Link href={homepageData.ctaLink}>
            <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              {homepageData.ctaText}
            </button>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
