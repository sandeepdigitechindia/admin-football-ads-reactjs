import React, { createContext, useState, useEffect } from "react";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames.sort());
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <CountryContext.Provider value={{ countries }}>
      {children}
    </CountryContext.Provider>
  );
};
