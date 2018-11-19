import { Image, Media } from "../types";
import UUID from "./UUID";

class MockImage {
    image: Image

    constructor() {
        this.image = {
            id: UUID(),
            crop: {
                ratio: "16:9",
                url: "url"
            }
        }
    }

    fetch() {
        return this.image;
    }
}

export default MockImage

