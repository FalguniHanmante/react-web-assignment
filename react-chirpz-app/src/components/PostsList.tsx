import React from 'react';
import { createPortal } from 'react-dom';

import axios from 'axios';
import Post from './Post';
import Modal from './Modal';

import './Post.css';

const PostsList = ({
    user = ''
}): any => {
    const [posts, setPosts] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [text, setText] = React.useState('');
    const [tagText, setTagText] = React.useState('');
    const [tagList, setTagList] = React.useState<any>([])

    const createPost = () => setShowModal(true);

    const onCloseModal = () => {
        setShowModal(false);
        setTagList([]);
        setText('');
        setTagText('');
    };

    const getPosts = () => {
        axios.get('http://localhost:4000/api/v1/posts?_sort=createdAt&_order=desc')
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.error('Error while fetching posts', err);
            })
    }

    React.useEffect(() => {
        getPosts();
    }, []);

    const handleCreateChange = (event: any) => {
        setText(event.target.value);
    };

    const handleTagChange = (event: any) => {
        setTagText(event.target.value)
    }

    const handleAddTag = () => {
        setTagList([...tagList, `#${tagText}`]);
        setTagText('');
    }

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        axios.post('http://localhost:4000/api/v1/posts', {
            "apiId": "v1",
            "isVerified": true,
            "userName": user,
            "caption": text,
            "tags": tagList,
            "comments": [],
            "createdAt": new Date().toISOString()
        }).then(res => {
            getPosts();
            onCloseModal();
        })
        .catch(error =>{
            console.error('Failed to post chirp', error);
        })
    }

    const renderCreateChirpForm = () => {
        return (
            <form id="createChirpForm" onSubmit={handleFormSubmit}>
                <div className='form-field-container'>
                    <label htmlFor='create'>Create</label>
                    <input type='text' id='create' value={text} onChange={handleCreateChange} placeholder="What's on your mind?" />
                </div>
                <div className='form-field-container'>
                    <label htmlFor='create'>Add Tags</label>
                    <div>
                        <input type='text' id='create' value={tagText} onChange={handleTagChange} placeholder="Write tags" />
                        {tagText.length ? <button className='add-btn' type='button' onClick={handleAddTag}>Add</button> : null}
                        <div className='tag-wrapper'>
                            {tagList.map((tag: any) => {
                                return <span className='tags' key={tag}>{tag}</span>
                            })}
                        </div>
                    </div>
                </div>
                <div className='btn-wrapper'>
                    <button className='create-btn' type='submit' onClick={handleFormSubmit}>Create</button>
                    <button className='cancel-btn' type='button' onClick={onCloseModal}>Cancel</button>
                </div>
            </form>
        )
    };


    return (
        <div className="post-section border">
            <header className='header'>
                <h2>Home</h2>
                <button className='create-btn align-right' onClick={createPost}>Create</button>
            </header>
            {posts.map((post: any) => <div key={post?.id}><Post data={post} /></div>)}

            {
                createPortal(
                    <Modal
                        show={showModal}
                        onClose={onCloseModal}
                        title={<div><span>Create </span><span className='create-chirp-text'>Chirpz</span></div>}
                        children={renderCreateChirpForm()}
                    />,
                    document.getElementById('modal') as HTMLElement
                )
            }
        </div>
    )
};

export default PostsList;
