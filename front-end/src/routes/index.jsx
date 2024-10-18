// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'; // Assurez-vous que le chemin est correct
import SignIn from '../pages/SignIn'; // Assurez-vous que le chemin est correct
import User from '../pages/User'; // Assurez-vous que le chemin est correct

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default AppRoutes;
