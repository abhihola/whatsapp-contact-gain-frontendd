import React, { useState, useEffect } from "react";
import countries from "../assets/countries.json"; // Make sure to have a countries.json file
import "./CountrySelector.css"; // CSS for styling

const CountrySelector = ({ onSelectCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Auto-detect country using browser settings
    const userCountry = navigator.language.slice(-2).toUpperCase();
    const defaultCountry = countries.find((c) => c.code === userCountry);
    if (defaultCountry) {
      setSelectedCountry(defaultCountry.name);
      onSelectCountry(defaultCountry);
    }
  }, [onSelectCountry]);

  const handleChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    const country = countries.find((c) => c.name === countryName);
    onSelectCountry(country);
  };

  return (
    <div className="country-selector">
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <select value={selectedCountry} onChange={handleChange}>
        {countries
          .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((country) => (
            <option key={country.code} value={country.name}>
              {country.emoji} {country.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CountrySelector;
