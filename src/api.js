async function request(path, options = {}) {
    const url = `http://railway-react-bulletin-board.herokuapp.com${path}`;
    const response = await fetch(url, options);
    return response.json();
}

export async function getThreads(arg = {}) {
    const params = new URLSearchParams(arg);
    return request(`/threads?${params.toString()}`);
}

export async function postThreads(title) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"title": title})
    };
    return request(`/threads`, requestOptions);
}

export async function getThreadPosts(threadId ,arg = {}) {
    const params = new URLSearchParams(arg);
    return request(`/threads/${threadId}/posts?${params.toString()}`);
}