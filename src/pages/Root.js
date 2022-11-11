import * as React from 'react';
import {Link} from "react-router-dom";
import {getThreads} from "../api";

const RootPage = () => {
  const [threadsList, setThreadsList] = React.useState(null);

  React.useEffect(() => {
    getThreads().then((data) => {
      setThreadsList(data);
    });
  }, [])

  function reloadThreads() {
    getThreads().then((data) => {
      setThreadsList(data);
    });
  }

  return (
    <>
      <p>新着スレッド</p>
      <ul>
        {threadsList == null ? (
          <li>更新ボタンを押してください。</li>
        ) : (
          threadsList.map((threadItem) => {
            return (
            <li>
                <Link to={`/thread/${threadItem.id}`} state={{title: threadItem.title, id: threadItem.id}}>
                    {threadItem.title}
                </Link>
            </li>
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
