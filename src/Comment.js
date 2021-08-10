import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import "./App.css";
import { Link } from "react-router-dom";
export default function Comments() {
    const params = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getAllComments() {
            try {
                const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`);
                const data = res.data.kids;
                const comments = data
                    .slice(0, 20)
                    .map(id =>
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    );
                const result = await Promise.all(comments);
                setComments(result);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllComments();
    }, [params.id]);
    return (
        <div>
             <h1>Comments</h1>
            {loading ? (
                <h2 style={{textAlign:"center"}}>Loading....</h2>
            ) : (
                <div>
                   
                    <Link to='/'>
                        <button className="btn">Go Back</button>
                    </Link>
                    <ul>
                        {comments.map(comments => (
                            <li className="comments" key={comments.data.id}>
                                <p dangerouslySetInnerHTML={{ __html: comments.data.text }}></p>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}