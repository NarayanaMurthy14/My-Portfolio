// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

function AboutSection() {
  return (
    <div id="about" className="portfolio-section my-12 lg:my-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="section-title mb-5 mt-5">
           A little about me
          </p>
          <p className="about-copy">
            {personalData.description}&nbsp;That&apos;s all about me,
            <span className=" text-pink-500"><a href="#contact">&nbsp;then what about you !</a></span>
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2 mr-5">
          <Image
            src={personalData.profile}
            width={450}
            height={280}
            alt="Kilari Venkata Narayana murthy"
            className="about-image rounded-3xl transition-all duration-500 md:grayscale hover:grayscale-0 hover:scale-[1.03] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;