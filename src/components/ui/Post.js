import { formatISO9075 } from "date-fns";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Delete from "../../assets/images/icons/delete.jpg";
import { Navigate } from "react-router-dom";
import "../../assets/scss/Post.scss";

export default function Post({ _id, title, description, content, type, author, createdAt }) {
    const typeClass = type ? type.toLowerCase() : 'others';
    const navigate = useNavigate();

    const [redirect, setRedirect] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/post/${_id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });

                if (response.ok) {
                    alert('Post deleted successfully');
                    setRedirect(true);
                } else {
                    const errorData = await response.json();
                    alert(`Failed to delete post: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Error deleting post. Please try again later.');
            }
        }
    };
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <div className={`post ${typeClass}`}>

                <Link to={`/post/${_id}`}>
                    <div className="texts">
                        <div className="title">
                            <p>{title}</p>
                        </div>
                        <div className="content">
                            <p className="description">{description}</p>
                        </div>
                        <div className="info">
                            <a className="author">{author.username}</a>
                            <time>Write time: {formatISO9075(new Date(createdAt))}</time>

                        </div>
                    </div>
                </Link>
                {/* <p className="delete" onClick={handleDelete}>Delete</p> */}
                <img src={Delete} className="delete" alt="Delete" onClick={handleDelete} />
            </div>
        </div>
    );
}
