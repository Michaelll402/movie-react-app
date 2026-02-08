// src/components/Serach.jsx
import React from "react";

const Serach = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
<img
  src="/search.png"
  alt="Search Icon"
  className="w-6 h-6"
/>

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
