import { LightningElement, api } from 'lwc';

export default class Media extends LightningElement {
    @api media;
    mediaURL = '';
    embedContent = '';

    get hasEmbedMedia() {
        const mydiv = this.template.querySelector('.embeddedDiv');
        console.log(mydiv);
        this.embedContent = this.media.media_embed?.content;
        if (mydiv) {
            mydiv.innerHTML = this.htmlDecode(this.embedContent);
        }
        return !this.media?.mediaDisabled;
    }

    get hasImageMedia() {
        console.log(JSON.parse(JSON.stringify(this.media, undefined, 2)));
        this.mediaURL = this.htmlDecode(
            this.media.preview?.images[0].resolutions[
                this.media.preview?.images[0].resolutions.length - 1
            ].url
        );
        return this.media?.preview?.enabled ? true : false;
    }

    htmlDecode(input) {
        const doc = new DOMParser().parseFromString(input, 'text/html');
        return doc.documentElement.textContent;
    }
}
