import * as React from 'react';
import {Link, useLocation} from "react-router-dom";
import { getThreadPosts } from '../api';
import { postThreadPosts } from '../api';

const ThreadDetail = () => {
    const [postsList, setPostsList] = React.useState(null);
    const location = useLocation();
    const threadTitle = location.state.title;
    const threadId = location.state.id;

    const [post, setPost] = React.useState("");
    const [message, setMessage] = React.useState("投稿結果をここに表示します。");
    
    React.useEffect(() => {
        getThreadPosts(threadId).then((data) => {
          setPostsList(data.posts);
        });
      }, [threadId])

    function handleChange(event) {
        setPost(event.target.value);
    }

    function handleClick() {
        const promise = postThreadPosts(threadId, post);
        promise.then((response) => {
            if (response.ok) {
                setMessage("投稿成功");
            } else {
                const json = response.json();
                if (json.ErrorMessageJP != null) {
                    setMessage("投稿失敗：" + json.ErrorMessageJP);
                }
            }
        })
    }

    return (
        <>
            <p>{threadTitle}</p>
            {postsList == null ? (
                <p>読み込み中</p>
            ) : (
                postsList.map((post) => {
                    return (
                        <li>{post.post}</li>
                    );
                })
            )}
            <p>
                <input type="text" value={post} onChange={(e) => handleChange(e)} placeholder="投稿しよう！" />
                <button onClick={handleClick}>投稿</button>
            </p>
                <p><label>{message}</label></p>
            <p><Link to={`/`}>Topに戻る</Link></p>
        </>
    );
}

export default ThreadDetail;