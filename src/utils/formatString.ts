export const cutStringWithDash = (text: string): string | null => {

    //REMOVE FILE TYPE
    const rawName = text.replace(/\.xlsx$/, "");
    // SECONDS METHOD SPLIT STRING BY DASH INTO ARRAY THEN PICK VALUE OF LAST OF INDEX 
    const org_name = rawName.split(/[-=_]+/).pop();

    // FIRST METHOD SPLIT STRING BY DASH INTO ARRAY THEN PICK VALUE OF THIRD OF INDEX 
    // if (parts.length > 2) {
    //     const word = parts[2].trim();
    //     return result;

    if (org_name) {
        //REMOVE ANY BRACKET AND VALUE INSIDE IT 
        const result = org_name.replace(/\s*\([^)]*\)/g, ''); // Removes ' (anything inside)'
        return result;
    } else {
        return null
    }

}