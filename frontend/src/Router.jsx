import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/Home/HomePage";
import RegisterPage from "./Pages/Register/RegisterPage";
import LoginPage from "./Pages/Login/LoginPage";
import Logout from "./Pages/Login/Logout";
import BlogDetailPage from "./Pages/BlogDetail/BlogDetailPage";
import MyPage from "./Pages/MyPage/MyPage";
import AddPost from "./Pages/AddPost/AddPost";
import EditPost from "./Pages/EditPost/EditPost";
import SearchResultsPage from "./Pages/SearchResultsPage/SearchResultsPage";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./Pages/Login/AuthContext";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route exact path="/landingpage" element={<LandingPage />} /> */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/blog/:postid" element={<BlogDetailPage />} />
          <Route exact path="/user/posts/:userid" element={<MyPage />} />
          <Route exact path="/user/post/add" element={<AddPost />} />
          <Route exact path="/user/post/edit/:postid" element={<EditPost />} />
          <Route exact path="/search/:query" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
