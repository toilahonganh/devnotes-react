import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from "../components/ui/Post";

export default function SearchPage() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const title = queryParams.get('title') || "";

        setSearch(title);

        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/search?title=${encodeURIComponent(title)}`, {
                    credentials: 'include',
                    method: 'GET'
                });
                if (response.ok) {
                    const posts = await response.json();
                    setPosts(posts);
                } else {
                    console.error('Error fetching search results');
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchPosts();
    }, [location.search]);

    return (
        <>
            <h2 style={{ margin: '20px' }}>Search Results for "{search}"</h2>
            {posts.length > 0 ? (
                posts.map(post => <Post key={post._id} {...post} />)
            ) : (
                <p>No posts found for this query.</p>
            )}
        </>
    );
}
