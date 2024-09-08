import { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "../assets/scss/CreatePost.scss";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    const [category, setCategory] = useState('none'); // Thêm state cho category
    const [redirect, setRedirect] = useState('');

    async function createNewPost(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, content, type: category }), // Gửi category lên server
                credentials: 'include',
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                // Xử lý lỗi nếu phản hồi không thành công
                const errorData = await response.json();
                console.error('Failed to create post:', errorData);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    if (redirect) {
        return <Navigate to='/' />;
    }

    return (
        <div className="create-post">
            <div className="heading">
                <p>New task</p>
            </div>
            <form onSubmit={createNewPost} className="form">
                <input
                    type="text"
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <ReactQuill
                    className="content"
                    type="text"
                    placeholder='Content'
                    value={content}
                    onChange={newValue => setContent(newValue)}
                />
                <div className="categories">
                    <div
                        className={`category others ${category === 'others' ? 'selected' : ''}`}
                        onClick={() => setCategory('others')}
                    ></div>
                    <p className="type">Others</p>
                    <div
                        className={`category css ${category === 'css' ? 'selected' : ''}`}
                        onClick={() => setCategory('css')}
                    >
                    </div>
                    <p className="type">Css/Scss</p>
                    <div
                        className={`category html ${category === 'html' ? 'selected' : ''}`}
                        onClick={() => setCategory('html')}
                    >
                    </div>
                    <p className="type">Html</p>
                    <div
                        className={`category javascript ${category === 'javascript' ? 'selected' : ''}`}
                        onClick={() => setCategory('javascript')}
                    >
                    </div>
                    <p className="type">Javascript</p>
                </div>
                <button type="submit" style={{ marginTop: '20px' }} className="add-btn">Add task</button>
            </form>
        </div>
    );
}
