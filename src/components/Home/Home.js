import React, { useContext, useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import './Home.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Post from '../Post/Post';
import { UserContext } from '../../App';
const Home = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imgUrl,setImgUrl] = useState(null)
    const [postData,setPostData] = useState([])
    const date = new Date()

    const handelImgUpload = event => {
        // console.log(event.target.files[0]);
        const imgData = new FormData()
        imgData.set('key', '2f413609fa0f6350a7270f2078818e5f');
        imgData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',imgData)
        .then(function (response) {
            setImgUrl(response.data.data.display_url);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const onSubmit = data => {
        const postData = {...data, imgUrl, date,...loggedInUser}
        console.log(postData);
        fetch('http://localhost:5000/addPost',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            if(data === true){
                document.getElementById('post').classList.remove('active')
                document.body.classList.remove('active')
                
                location.reload();
            }
        })
    };
    useEffect(() => {
        fetch('http://localhost:5000/post')
        .then(response => response.json())
        .then(data => setPostData(data))
    },[])

    return (
        <div>
            <Menu></Menu>
            <div className="home-content">
                <div className="create-post p-3 rounded" id="post">
                    <h3 className="text-center text-white">Create Post</h3>
                    <div className="post_admin_info">
                        <img className="admin" src={loggedInUser.photoURL} alt=""/> <span className="fw-bold fs-5 text-white name"> {loggedInUser.name}</span>
                    </div>
                    <div className="post-info">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue="" className="form-control my-2" placeholder="Title" {...register("title", { required: true })} />
                            {errors.title && <small>Title is required</small>}
                            
                            <textarea defaultValue="" rows="7" className="form-control my-2" placeholder="Description" {...register("description", { required: true })} ></textarea>
                            {errors.description && <small>Description is required</small>}

                            <input onChange={handelImgUpload} className="d-block my-2 text-white" type ="file"/>

                            <input  type="Submit"  className="btn btn-success px-5" />
                        </form>
                    </div>
                </div>
                <div className="post">
                    {
                        postData.length === 0 && 
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    {
                        postData.map(post => <Post key={post._id} post={post}></Post>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;