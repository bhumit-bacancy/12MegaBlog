import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../index";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { addPosts } from "../../store/postSlice";


function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(addPosts(posts.documents))
        // setPosts(posts.documents)
      }
    });
    setLoading(false)
  }, [authStatus]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
        <h1>Home</h1>
        <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
              {loading ? <div>Loading.......</div> : "Login to read posts"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <h1>Home</h1>
        {loading ? <div>Loading.......</div> : (<div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
            </div>
          ))}
        </div>)}
      </Container>
    </div>
  );
}

export default Home;
