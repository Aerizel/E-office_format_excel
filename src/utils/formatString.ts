export const cutStringWithDash = (text: string): string | null => {

    //REMOVE FILE TYPE
    const rawName = text.replace(/\.xlsx$/, "");
    // SECONDS METHOD SPLIT STRING BY DASH INTO ARRAY THEN PICK VALUE OF LAST OF INDEX 
    const org_name = rawName.split(/[-= _]+/).pop();

    // FIRST METHOD SPLIT STRING BY DASH INTO ARRAY THEN PICK VALUE OF THIRD OF INDEX 
    // if (parts.length > 2) {
    //     const word = parts[2].trim();
    //     return result;
    
    if(org_name) {
        return org_name
    } else {
        return null
    }
    
}