import React from 'react';

import "./Post.css";

const Post = ({
    data
}: {
    data: any
}) => {
    const [expand, setExpand] = React.useState(false);
    const { userName, caption, tags = [] } = data;

    const toggleExpand = () => {
        setExpand(!expand);
    }

    return (
        <div className='post-container'>
            <label className='user-name'>{userName}</label>
            <div>
                <p className='caption-text'>
                    {expand ? caption : `${caption.substring(0, 250)}`}
                    {caption.length < 300 ? null : <span className='expand' onClick={toggleExpand}>{expand ? '...Read less' : '...Read more'}</span>}
                </p>
            </div>
            <div className='tags-container'>
                {tags.map((tag: string) => <p key={tag} className='tags'>{tag}</p>)}
            </div>
        </div >
    )
}


export default Post;