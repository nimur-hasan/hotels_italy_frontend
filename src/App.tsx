import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ERR404 from './page/404/ERR404';
import Home from './page/Home/Home';
import Signin from './page/Signin/Signin';
import Signup from './page/Signup/Signup';
import Layout from './layout/Layout';
import VerifyEmail from './page/VerifyEmail/VerifyEmail';
import FindHotel from './page/FindHotel/FindHotel';
import SubmitHotel from './page/SubmitHotel/SubmitHotel';


export default function App() {
  const [profile, setProfile] = useState({})
  return (
    <BrowserRouter basename="/">
      <Layout profile={profile} setProfile={setProfile}>
        <Routes>
          <Route path="/" /> {/* 👈 Renders at /app/ */}

          <Route index element={<Navigate to={'/find-hotels'}/>}/> 
          <Route path="/auth/*" element={<Navigate to='/auth/signin'/>}/> 
          <Route path="/auth/signin" element={<Signin setProfile={setProfile}/>}/> 
          <Route path="/auth/signup" element={<Signup/>}/>                   
          <Route path="/auth/verify-email" element={<VerifyEmail/>}/>  

          <Route path="/find-hotels" element={<FindHotel profile={profile}/>}/>                   
          <Route path="/submit-hotels" element={<SubmitHotel/>}/>                   

          <Route path="*" element={<ERR404/>} />
        </Routes>
      </Layout>
      </BrowserRouter>
  )
}