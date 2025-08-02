export const getInitials = (title) => {
    if(!title) return "";
    const words = title.split(" ");
    let initials = "";
    for (let i = 0; i <Math.min(words.length,2);i++){
        initials += words[i][0]
    }

    return initials.toUpperCase();
}


export const validateEmail = (email)=>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export const getToastMessageByType = (type)=>{
    switch (type) {
        case "edit":
            return "Blog post updated successfully!";
        case "draft":
            return "Blog post saved as draft!";
        case "published" :
            return "Blog post published successfully!";

        default:
            return "Action completed successfully!";
    }
}


export const sanitizeMarkdown = (content)=>{
    const markdownBlocRegex = /^```(?:markdown)?\n([\s\S]*?)\n```$/;
    const match = content.match(markdownBlocRegex);
    return match ? match[1] : content;
}