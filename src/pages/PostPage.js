import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../components/ui/UserContext";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/scss/PostPage.scss";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate(); // For redirection

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/post/${id}`, {
                    credentials: 'include',
                    method: 'GET'
                });

                if (response.ok) {
                    const postInfo = await response.json();
                    setPostInfo(postInfo);
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setDescription(postInfo.description);
                } else {
                    toast.error('Failed to fetch post.');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                toast.error('Error fetching post.');
            }
        };

        fetchPost();
    }, [id]);

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/post`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    title,
                    description,
                    content,
                    type: postInfo.type // Assuming postInfo.type is available and should be preserved
                }),
                credentials: 'include'
            });

            if (response.ok) {
                toast.success('Post updated successfully!');
                setTimeout(() => {
                    navigate(`/post/${id}`); // Redirect to post page or another appropriate route
                }, 200); // Wait for 0.2 seconds before redirecting
            } else {
                const errorData = await response.json();
                toast.error(`Failed to update post: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error('Error updating post.');
        }
    };

    if (!postInfo) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="post-page">
                <div className="title">
                    <h5>{postInfo.title} ({postInfo.type})</h5>
                    <div className="author">Written by @{postInfo.author.username}</div>
                    <time className="time">at {formatISO9075(new Date(postInfo.createdAt))}</time>
                    <div className="description">
                        <span className="pdes">Description:</span>
                        <span className="ades">{postInfo.description}</span>
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                </div>
            </div>
            <div className="edit">
                <h5>Edit Post</h5>
                <div className="input">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div className="input">
                    <ReactQuill
                        className="reactquill"
                        value={content}
                        onChange={newValue => setContent(newValue)}
                    />
                </div>
                <div className="input">
                    <button className="btn-save" onClick={handleSaveChanges}>Save changes</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
