import { LightningElement, wire } from 'lwc';
import subRedditWire from 'data/subRedditWire';

const columns = [
    {
        type: 'button',
        typeAttributes: {
            label: 'First Button',
            name: 'first_button',
            variant: 'base'
        }
    },
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
            disabled: false
        }
    }
];

export default class App extends LightningElement {
    columns = columns;
    subRedditName = 'formula1';
    subRedditData = [];

    handleRedditUpdate(event) {
        this.subRedditName = event.detail.reddit;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log(actionName, row);
    }

    get hasData() {
        return this.subRedditData;
    }

    @wire(subRedditWire, { subRedditName: '$subRedditName' })
    wiredSubredditData({ error, data }) {
        if (!error && data) {
            this.subRedditData = data.map((post) => ({
                ...post
            }));
        } else if (error) {
            console.error(error);
        }
    }
}
