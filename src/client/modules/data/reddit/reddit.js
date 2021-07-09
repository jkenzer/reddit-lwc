export const getSubReddit = async (subreddit) => {
    subreddit = subreddit || 'worldnews';
    const resp = await (
        await fetch(`https://www.reddit.com/r/${subreddit}.json`, {
            mode: 'cors',
            headers: { Accept: 'application/json' }
        })
    ).json();
    return resp.data.children.slice(0, 15).map((c) => c.data);
};
