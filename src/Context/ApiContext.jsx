import { createContext, useContext } from "react";
import axios from "axios";

const APIContext = createContext();

function APIProvider({ children }) {
  const getCarousel = async () => {
    let config = {
      method: "get",
      url: "/api/v1/home/banner-details",
      baseURL: "https://interview-assessment.api.avamae.co.uk",
    };

    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  const submitContactUsForm = async (requestBody) => {
    let config = {
      method: "post",
      data: requestBody,
      url: "/api/v1/contact-us/submit",
      baseURL: "https://interview-assessment.api.avamae.co.uk",
    };

    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <APIContext.Provider value={{ getCarousel, submitContactUsForm }}>
      {children}
    </APIContext.Provider>
  );
}

function useAPI() {
  return useContext(APIContext);
}

export { APIProvider };
export default useAPI;
