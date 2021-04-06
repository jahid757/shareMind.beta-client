import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './Post.css'
const Post = ({post}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="bg-normal p-2 rounded mb-4">
            <div className="post-author mb-3 d-flex ">
                <div className="authorImg">
                    <img className="admin" src={post.photoURL} alt=""/> 
                </div>
                <div className="author_detail">
                    <span className="fw-bold fs-5 text-white name"> {post.name}</span>
                    <p>{new Date(post.date).toDateString('dd/MM/yyyy')}</p>
                </div>
            </div>
            <div className="post-data">
                <h4 className="text-white">{post.title}</h4>
                <img className="my-2" src={post.imgUrl || 'https://i.ibb.co/Pzqm9fQ/We-are-really-sorry.png'} alt=""/>
                <p className="text-white">{post.description}</p>
            </div>
        </div>
    );
};

export default Post;
