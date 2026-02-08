// src/components/Serach.jsx
import React from "react";

const Serach = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="Search Icon" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}                          // ✅ show current text
          onChange={(e) => setSearchTerm(e.target.value)} // ✅ update parent state
        />
      </div>
    </div>
  );
};

export default Serach;
