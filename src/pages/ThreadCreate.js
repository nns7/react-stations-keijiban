import * as React from 'react';
import {Link} from "react-router-dom";
import { postThreads } from '../api';

const ThreadCreate = () => {
    const [title, setTitle] = React.useState("");
    const [message, setMessage] = React.useState("投稿結果をここに表示します。");
    
    function handleChange(event) {
        setTitle(event.target.value);
    }

    function handleClick() {
        const promise = postThreads(title);
        promise.then((response) => {
            if (response.title == null | undefined) {
                setMessage("投稿失敗：" + response.ErrorMessageJP);
            } else {
                setMessage("投稿成功：" + response.threadId + " : " + response.title);
            }
        })
    }

    return (
        <>
            <p>スレッド新規作成</p>
            <input type="text" value={title} onChange={(e) => handleChange(e)} placeholder="スレッドタイトル" />
            <button onClick={handleClick}>投稿</button>
            <p><label>{message}</label></p>
            <p><Link to={`/`}>Topに戻る</Link></p>
        </>
    );
}

export default ThreadCreate;