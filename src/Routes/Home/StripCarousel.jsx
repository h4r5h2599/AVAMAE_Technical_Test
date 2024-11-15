import "./StripCarousel.scss";
import { lineSpinner } from "ldrs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import useAPI from "../../Context/ApiContext";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

lineSpinner.register();

const StripCarousel = () => {
  const { getCarousel } = useAPI();

  useEffect(() => {
    // Timeout added to show loading spinner if internet is slow
    setTimeout(async () => {
      const data = await getCarousel();

      if (data.status < 200 || data.status > 299) {
        setDataError(true);
        return;
      }

      setData(data.data.Details);
    }, 2000);
  }, []);

  const [dataError, setDataError] = useState(false);
  const [data, setData] = useState([]);

  if (dataError) {
    return (
      <div className="slide centre">
        There was an error loading the carousel. Please refresh the page.
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="slide centre">
        <l-line-spinner
          size={100}
          stroke={3}
          speed={1}
          color={"black"}
        ></l-line-spinner>
      </div>
    );
  }

  return (
    <Swiper spaceBetween={0} slidesPerView={1}>
      {data.map((slide, index) => {
        return (
          <SwiperSlide key={"slide" + index}>
            <div className="slide">
              <img
                src={slide.ImageUrl}
                alt={slide.Title}
                className="slideImage"
              />
              <div className="slideOverlay">
                <div className="slideTitle">{slide.Title}</div>
                <div className="slideSubtitle">{slide.Subtitle}</div>
                <Link to="/contact-us" className="slideButton">
                  <CustomButton text={"Contact us"} type={"blue"} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default StripCarousel;
