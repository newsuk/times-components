import get from "lodash.get";


const mapChildValues = (descriptionObject) => descriptionObject.map(child => child.attributes.value).join("")

export default (description) =>
    description.map(descriptionObject => 
        get(descriptionObject, "attributes.value") || mapChildValues(descriptionObject.children))
        .join("")
        .substring(0, 200);