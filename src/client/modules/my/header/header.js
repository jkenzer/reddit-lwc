import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {
    @api subRedditName = 'formula1';

    updateSubReddit(event) {
        const updateReddit = new CustomEvent('updatereddit', {
            detail: { reddit: event.target.value }
        });
        this.dispatchEvent(updateReddit);
    }
}
