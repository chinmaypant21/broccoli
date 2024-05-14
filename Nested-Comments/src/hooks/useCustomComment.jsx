function insertNode(commentsData, commentId, newComment){
    return commentsData.map(comment => {
        const newData = {
            id: comment.id,
            text: comment.text
        }

        if (comment.id === commentId){
            const newChildren = structuredClone(comment.children);
            newData.children = [...newChildren, newComment];

        } else {
            newData.children = insertNode(comment.children, commentId, newComment)
        }


        return newData
    })
}

function editNode(commentsData, commentId, text){
    return commentsData.map(comment => {
        const newData = {
            id: comment.id,
        }

        if (comment.id === commentId){
            newData.text = text
            newData.children = structuredClone(comment.children);
        } else {
            newData.text = comment.text;
            newData.children = editNode(comment.children, commentId, text);
        }
        return newData
    })
}

function deleteNode(commentsData, commentId){
    return commentsData.map(comment => {
        if (comment.id === commentId){
            return null;
        }

        const newData = {
            id: comment.id,
            text: comment.text
        }

        newData.children =  deleteNode(comment.children, commentId)
        return newData
    }).filter(val => val)
}

const useCustomComment = (commentsData, setCommentsData) => {
    function insertComment(commentId, newComment){
        const newData = insertNode(commentsData, commentId, newComment)
        setCommentsData(newData)
    }
    
    function editComment(commentId, text){
        const newData = editNode(commentsData, commentId, text)
        setCommentsData(newData)
    }
    
    function deleteComment(commentId){
        const newData = deleteNode(commentsData, commentId)
        setCommentsData(newData)
    }

    return {
        insertComment,
        editComment,
        deleteComment
    }
}

export default useCustomComment