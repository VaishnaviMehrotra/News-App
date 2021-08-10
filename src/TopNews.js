import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./App.css";
function TopNews() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getAllTopStories() {
            try {
                const res = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
                const data = res.data;
                const stories = data
                    .slice(0, 10)
                    .map(id =>
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    );
                const result = await Promise.all(stories);
                setPosts(result);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllTopStories()
    }, []);
    return (
        <>
            <div className="container">
                <h1>HackerNews Top 10 Posts</h1>
                {loading ? (
                    <h2>Loading....</h2>
                ) : (
                    <ul>
                        {posts.map((post) => (
                            <li className="widget" key={post.data.id}>
                                <a className="link" href={post.data.url}>{post.data.title}</a>
                                <br />
                                <Link to={`/comment/${post.data.id}`}>
                                    <button className="btn">Views Comments</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
                }
            </div>
        </>
    )
}
export default TopNews;