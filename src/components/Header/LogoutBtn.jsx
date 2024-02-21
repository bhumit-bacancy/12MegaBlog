import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removePosts } from '../../store/postSlice';
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post.posts);

  const dispatch = useDispatch()

  const logoutHandler = () => {
    console.log(posts)

    authService.logout().then(() => {
      dispatch(logout())
      dispatch(removePosts([]))
      navigate("/");
    })
  }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn