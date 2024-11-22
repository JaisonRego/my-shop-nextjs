import React from "react";

const about = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="team"
          src="/images/about.png"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            About Us
          </h1>
          <p className="mb-8 leading-relaxed">
            Welcome to our company! We are dedicated to delivering exceptional
            services and innovative solutions to our clients. Our team consists
            of talented professionals with diverse expertise, working together
            to create impactful results. We pride ourselves on building
            long-term relationships based on trust, quality, and a shared vision
            for success.
          </p>
          <p className="mb-8 leading-relaxed">
            Over the years, we have grown into a trusted name, driven by a
            passion for excellence and a commitment to making a difference.
            Whether you're looking for innovative solutions, expert guidance, or
            unparalleled support, we are here to help you every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default about;
