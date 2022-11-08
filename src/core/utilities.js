export const ReplaceWhiteSpaces = (string) => {
    return string.replace(/\s/g, '')
}

export const RemoveDuplicatesValues = (List) => {
    return [...new Set(List)]
}
