import styled from "styled-components";
import React from "react";

const SearchBox = styled.form`
  margin: 20px;
`;

const ChooseCityLabel = styled.span`
  color: black;
  margin: 10px auto;
  font-size: 18px;
  font-weight: bold;
`;
const WelcomeWeatherLogo = styled.img`
  width: 100px;
  height: 100px;
  margin: 40px auto;
`;
const CityComponent = (props) => {
  const { updateCity, fetchWeather } = props;
  return (
    <>
      {/* <WelcomeWeatherLogo src={"/icons/perfect-day.svg"} /> */}
      <ChooseCityLabel>Find Weather of your city</ChooseCityLabel>
      <SearchBox onSubmit={fetchWeather}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            onChange={(e) => updateCity(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-dark" type="submit">
              Search
            </button>
          </div>
        </div>
      </SearchBox>
    </>
  );
};
export default CityComponent;