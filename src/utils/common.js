export const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toReadableKebabCase = (str) => {
    return str.split("-").map(capitalizeFirst).join(" ");
}