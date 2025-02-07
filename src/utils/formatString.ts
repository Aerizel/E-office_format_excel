export const cutStringWithDash = (text: string): string | null => {
    const parts = text.split("-");
    if (parts.length > 2) {
        const word = parts[2].trim();
        const result = word.replace(/\.xlsx$/, "");
        return result;
    } else {
        return null;
    }
}