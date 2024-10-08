"use client";

import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Breakpoints } from "@/app/Types/Enums";
import Image from "next/image";
import Link from "next/link";

import data from "@/HeroBannerData.json";
import { BannerSlide } from "@/app/Types/BannerType";

const heroSectionData: BannerSlide[] = data.data;

const Banner = ({setIsContentClicked} : {setIsContentClicked: Dispatch<SetStateAction<boolean>>}) => {
  const swiperRef = useRef<any>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [screenSize, setScreenSize] = useState<string>();

  const handleCardClicked = () => {
    setIsContentClicked(true)
  }
  
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= Breakpoints.DESKTOP) setScreenSize("desktop");
      else if (window.innerWidth >= Breakpoints.TABLET) setScreenSize("tablet");
      else setScreenSize("mobile");
    };
  
    updateScreenSize();
    window.addEventListener("resize", () => updateScreenSize());
  }, []);

  return (
    <>
      <div className="hero-section relative flex justify-center items-center">
        <div className="hero-content absolute z-40 w-fit h-fit flex flex-col tablet:hidden">
          <h1 className="text-white font-black text-hero-title-mobile">
            Furēmu
          </h1>
          <p className="font-main font-medium leading-4 text-white text-sm w-48 text-center">
            Immerse yourself with the latest and best animes here with us!
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
            bulletClass: "bullet",
            bulletActiveClass: "active-bullet",
          }}
          loop={true}
          slidesPerView={1}
          onSlideChange={(slide) => {
            setActiveSlide(slide.realIndex);
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          initialSlide={0}
        >
          {heroSectionData.map((slide: BannerSlide) => (
            <SwiperSlide key={slide.mal_id}>
              <div className="relative w-screen h-[26.5625rem] tablet:h-[43.8125rem]">
                <div className="relative  w-full h-full">
                  <Image
                    src={slide.imagePathDesktop}
                    alt="banner-image"
                    fill
                    // width={1040}
                    // height={506}
                    className="w-full h-auto object-cover desktop:object-bottom"
                    quality={100}
                    priority={true}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          {heroSectionData.map(
            (slide) =>
              activeSlide === slide.itemIndex && (
                <div
                  key={slide.itemIndex}
                  className="context absolute z-40 left-8 bottom-8 hidden tablet:block desktop:left-16"
                >
                  <h1 className="text-6xl text-accent font-bold w-[39.125rem] mb-6">
                    {slide.description.title}
                  </h1>
                  <p className="text-white w-[28.75rem] text-base leading-6 font-normal mb-6">
                    {slide.description.context}
                  </p>
                  <div onClick={handleCardClicked}>
                    <Link href={`anime/${slide.mal_id}`} scroll={false}>
                      <button className="w-[7.375rem] py-[0.88rem] bg-accent px-[1rem] rounded-lg">
                        <p className="text-sm text-darker-blue leading-5 font-semibold">
                          See More
                        </p>
                      </button>
                    </Link>
                  </div>  
                </div>
              )
          )}
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>
    </>
  );
};

export default Banner;
