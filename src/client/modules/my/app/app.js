import { LightningElement, wire } from 'lwc';
import subRedditWire from 'data/subRedditWire';

export default class App extends LightningElement {
    subRedditName = 'formula1';
    subRedditData = [];
    columns = [
        {
            label: 'URL',
            fieldName: 'url',
            type: 'url',
            hideDefaultActions: true,
            typeAttributes: { label: { fieldName: 'title' } }
        },
        {
            label: 'Title',
            fieldName: 'title',
            type: 'text',
            hideDefaultActions: true
        }
    ];
    updateSubReddit(event) {
        this.subRedditName = event.target.value;
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
            this.subRedditData = data.map((post) => ({
                ...post,
                title: this.decodeHtml(post.title)
            }));
        } else if (error) {
            console.error(error);
        }
    }
}
