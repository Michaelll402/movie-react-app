// src/components/Serach.jsx
import React from "react";
import searchIcon from "../assets/search.png";

const Serach = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
<img src={`${import.meta.env.BASE_URL}search.png`} alt="Search Icon" />


        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Serach;
