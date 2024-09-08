import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/ui/Post";

export default function SortByType() {
    const [posts, setPosts] = useState([]);
    const { type } = useParams(); // Get the type from URL parameters

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/type/${type}`, {
                    credentials: 'include',
                    method: 'GET'
                });
                if (response.ok) {
                    const posts = await response.json();
                    setPosts(posts);
                } else {
                    console.error('Error fetching posts by type');
                }
            } catch (error) {
                console.error('Error fetching posts by type:', error);
            }
        };

        fetchPosts();
    }, [type]);

    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => <Post key={post._id} {...post} />)
            ) : (
                <p>No posts found for this type.</p>
            )}
        </>
    );
}
