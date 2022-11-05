import * as React from 'react';
import {Link} from "react-router-dom";

const RootPage = () => {
  const [threadsList, setThreadsList] = React.useState(null);

  async function fetchThreadsList() {
    const response = await fetch(
      'http://railway-react-bulletin-board.herokuapp.com/threads'
    );
    const data = await response.json();
    return data;
  }

  React.useEffect(() => {
    fetchThreadsList().then((data) => {
      setThreadsList(data);
    });
  }, [])

  function reloadThreads() {
    fetchThreadsList().then((data) => {
      setThreadsList(data);
    });
  }

  return (
    <>
      <p>掲示板</p>
      <p><Link to={`/thread/new`}>スレッドを立てる</Link></p>
      <p>新着スレッド</p>
      <ul>
        {threadsList == null ? (
          <li>更新ボタンを押してください。</li>
        ) : (
          threadsList.map((threadItem) => {
            return (
              <li>{threadItem.title}</li>
            );
          })
        )}
      </ul>
      <p>
        <button type='button' onClick={reloadThreads}>更新</button>
      </p>
    </>
  )
}

export default RootPage;
