function toBoolean(value: string): boolean|null {
    return value ? value.toLowerCase() === "true" : null;
}

export {
    toBoolean
}