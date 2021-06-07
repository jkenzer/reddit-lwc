import { LightningElement, wire } from 'lwc';
import subRedditWire from 'data/subRedditWire';

const columns = [
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
    },
    {
        type: 'button-icon',
        typeAttributes: {
            iconName: 'utility:download',
            label: 'Download',
            name: 'download',
            variant: 'bare',
            alternativeText: 'download',
            disabled: { fieldName: 'mediaDisabled' }
        }
    }
];

export default class App extends LightningElement {
    columns = columns;
    subRedditName = 'formula1';
    subRedditData = [];
    mediaURL = '';

    handleRedditUpdate(event) {
        this.subRedditName = event.detail.reddit;
        this.mediaURL = '';
    }

    handleRowAction(event) {
        const row = event.detail.row;
        this.mediaURL = row.preview.images[0].resolutions[
            row.preview.images[0].resolutions.length - 1
        ].url.replaceAll('&amp;', '&');
    }

    get hasData() {
        return this.subRedditData;
    }

    @wire(subRedditWire, { subRedditName: '$subRedditName' })
    wiredSubredditData({ error, data }) {
        if (!error && data) {
            this.subRedditData = data.map((post) => ({
                ...post,
                mediaDisabled: !post.preview?.enabled
            }));
        } else if (error) {
            console.error(error);
        }
    }
}
