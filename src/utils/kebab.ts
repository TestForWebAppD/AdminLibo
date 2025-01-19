export function convertKebabToTitleCase(str: string | undefined) {
    return str && str
        .split('-')
        .map(word => {
            if (word.toLowerCase() === 'and' || word.toLowerCase() === 'year') {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}
