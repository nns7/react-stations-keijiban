async function getRequest(path, options = {}) {
    const url = `http://railway-react-bulletin-board.herokuapp.com${path}`;
    const response = await fetch(url, options);
    return response.json();
}

async function postRequest(path, options = {}) {
    const url = `http://railway-react-bulletin-board.herokuapp.com${path}`;
    const response = await fetch(url, options);
    return response;
}

export async function getThreads(arg = {}) {
    const params = new URLSearchParams(arg);
    return getRequest(`/threads?${params.toString()}`);
}

export async function postThreads(title) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"title": title})
    };
    return postRequest(`/threads`, requestOptions);
}

export async function getThreadPosts(threadId ,arg = {}) {
    const params = new URLSearchParams(arg);
    return getRequest(`/threads/${threadId}/posts?${params.toString()}`);
}

export async function postThreadPosts(threadId, post) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"post": post})
    };
    return postRequest(`/threads/${threadId}/posts`, requestOptions);
}