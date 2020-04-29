export const reqiuredField = value => {
    if (value) {
        return undefined;
    }
    return "Field is required.";
};

const maxSize = 255
export const maxSizeValidate = value => {
    if (!value || value.length < maxSize) {
        return undefined;
    }
    return "Max size exceeded!";
}