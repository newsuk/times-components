import get from "lodash.get";

export const getContent = (description) => {
    return description.map(descriptionObject => {
        return get(descriptionObject, "attributes.value") || mapChildValues(descriptionObject.children)
    }).join("");
}

const mapChildValues = (descriptionObject) => {
    return descriptionObject.map(child => child.attributes.value).join("")
}