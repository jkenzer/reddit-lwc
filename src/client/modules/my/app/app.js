import { LightningElement, wire } from 'lwc';
import subRedditWire from 'data/subRedditWire';

export default class App extends LightningElement {
    subRedditName = 'formula1';
    subRedditData = [];
    columns = [
        {
            label: 'Score',
            fieldName: 'score',
            type: 'number',
            hideDefaultActions: true
        },
        {
            label: 'Post',
            fieldName: 'url',
            type: 'url',
            hideDefaultActions: true,
            typeAttributes: {
                label: {
                    fieldName: 'title'
                },
                target: '_blank'
            }
        }
    ];

    handleRedditUpdate(event) {
        this.subRedditName = event.detail.reddit;
    }

    get hasData() {
        return this.subRedditData;
    }

    decodeHtml(html) {
        let span = document.createElement('span');
        span.innerHTML = html;
        return span.innerText;
    }

    @wire(subRedditWire, { subRedditName: '$subRedditName' })
    wiredSubredditData({ error, data }) {
        if (!error && data) {
            console.log(data);
            this.subRedditData = data.map((post) => ({
                ...post,
                title: this.decodeHtml(post.title)
            }));
        } else if (error) {
            console.error(error);
        }
    }
}
