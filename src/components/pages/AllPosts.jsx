import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../index";
// import { useDispatch } from 'react-redux'
// import { addPosts } from "../../store/postSlice";
// import appwriteService from "../../appwrite/config"
import { useSelector } from "react-redux";


function AllPosts() {
  // const [posts, setPosts] = useState([])
  // const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.posts);
  console.log("all", posts)

  // useEffect(() => {
  //   appwriteService.getPosts([]).then((posts) => {
  //     if (posts) {
  //       dispatch(addPosts(posts.documents))
  //       // setPosts(posts.documents)
  //     }
  //   });
  // }, []);
  
  return (
    <div className="w-full py-8">
      <Container>
        <h1>All Posts</h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
