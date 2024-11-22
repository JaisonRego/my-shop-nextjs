"use client";

import React, { useEffect, useState } from "react";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/about?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        console.log(data.data.title);
        setAboutData({
          title: data?.data?.title,
          description1: data?.data?.description1,
          description2: data?.data?.description2,
          image:
            data?.data?.image?.formats?.thumbnail?.url ||
            data?.data?.image?.url ||
            null,
        });
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="team"
          src={
            aboutData.image
              ? `http://localhost:1337${aboutData.image}`
              : "https://dummyimage.com/400x400"
          }
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {aboutData?.title}
          </h1>
          <p className="mb-8 leading-relaxed">{aboutData?.description1}</p>
          <p className="mb-8 leading-relaxed">{aboutData?.description2}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
