import { LightningElement, api } from 'lwc';

export default class Media extends LightningElement {
    @api mediaUrl;

    get hasMedia() {
        return this.mediaUrl ? true : false;
    }
}
