import React from "react";
import { Routes, Route } from "react-router-dom";
import { EndYear } from "../Pages/EndYear";
import { Topics } from "../Pages/Topics";
import { Sector } from "../Pages/Sector";
import { Region } from "../Pages/Region";
import { Pest } from "../Pages/Pest";
import { Source } from "../Pages/Source";
import { Country } from "../Pages/Country";


const AllRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<EndYear />} />

      <Route path="/topics" element={<Topics />} />

      <Route path="/sector" element={<Sector />} />

      <Route path="/region" element={<Region />} />

      <Route path="/pest" element={<Pest />} />

      <Route path="/source" element={<Source />} />

      <Route path="/country" element={<Country />} />
    </Routes>
  );
};

export default AllRouters;
