import React, { useState, useEffect } from "react";
import countries from "../assets/countries.json"; // Ensure this file exists
import "./CountrySelector.css"; // CSS for styling

const CountrySelector = ({ onSelectCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    // Auto-detect country based on user's locale
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const userCountryCode = locale.split("-").pop().toUpperCase();
    const detectedCountry = countries.find((c) => c.code === userCountryCode);

    if (detectedCountry) {
      setSelectedCountry(detectedCountry);
      onSelectCountry(detectedCountry);
    }
  }, [onSelectCountry]);

  // Handle country selection
  const handleSelect = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(country);
    onSelectCountry(country);
  };

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredCountries(
        countries.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300); // Delay filtering to optimize performance

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="country-selector">
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
        aria-label="Search country"
      />

      <select value={selectedCountry?.name || ""} onChange={handleSelect} aria-label="Select a country">
        {filteredCountries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.emoji} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
