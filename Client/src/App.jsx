import { Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import Community from "./pages/Community";
import ReviewResume from "./pages/ReviewResume";
import BlogTitles from "./pages/BlogTitles";
import WriteArticle from "./pages/WriteArticle";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast"

function App() {
  console.log(useParams())
  const {getToken}=useAuth()

  useEffect(()=>{
    getToken()
  },[])

  console.log(getToken().then((token)=>(console.log(token))))
  return (
    <>
    <Toaster/>
    {/* All routes are defined here*/}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Nested Routes are defined here */}
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="community" element={<Community />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="blog-title" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="write-article" element={<WriteArticle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
