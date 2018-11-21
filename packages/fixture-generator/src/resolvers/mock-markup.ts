import { Markup } from "../types";


const markupTypes = {
    paragraph: {
        name: "paragraph",
        attributes: {},
        children: [{
            name: "text",
            attributes: {
                value:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            },
            children: []
        }]
    },
    ad: {
            name: "ad",
            attributes: {},
            children: []
    },
    inline: {
        name: "inline",
        attributes: {},
        children: [
          {
            name: "text",
            attributes: {
              value: "inline markup"
            },
            children: []
          }
        ]
    }
}

class MockMarkup {
    markup:Markup
    constructor() {
        this.markup = []
       
    } 

    withXParagraphs(length: number){
        new Array(length).fill(0).map(() => this.withParagraph());
        return this;
    }

    withParagraph() {
        this.markup.push(markupTypes.paragraph)
        return this;
    }

    withAd() {
        this.markup.push(markupTypes.ad)
        return this;
    }
    withInline() {
        this.markup.push(markupTypes.inline)
        return this;
    }

    create() {
        return this.markup;
    }
}

export default MockMarkup;
