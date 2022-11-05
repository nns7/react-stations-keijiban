async function request(path, options = {}) {
    const url = `http://railway-react-bulletin-board.herokuapp.com/${path}`;
    const response = await fetch(url, options);
    return response.json();
}

export async function getThreads(arg = {}) {
    const params = new URLSearchParams(arg);
    return request(`/threads?${params.toString()}`);
}