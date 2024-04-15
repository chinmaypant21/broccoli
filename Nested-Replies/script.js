let repliesData = [
    {
        msg: 'abc',
        replies: [
            {msg: 'nest1'},
            {msg: 'nest2'},
        ]
    },
    {
        msg: 'def',
        replies: [
            {
                msg: 'nest3', 
                replies: [
                    {msg: 'more nest 1'}
                ]
            },
            {
                msg: 'nest4', 
                replies: [
                    {msg: 'more nest 2'},
                    {msg: 'more nest 3'}
                ]
            }
        ]
    }
]

const container = document.getElementById('container');

function addReply(reply) {
    const element = document.createElement('div')
    element.style.paddingLeft = `${12}px`
    element.classList.add('reply-container')

    const replyBody = createReplyBody(reply.msg, element)
    element.appendChild(replyBody)

    return element

}

function createReplyBody(text, parentElement){
    const element = document.createElement('div')
    element.classList.add('reply-body')

    const messageElement  = createMessageElement(text)
    const replyButton     = createReplyButton(parentElement)
    element.appendChild(messageElement)
    element.appendChild(replyButton)

    return element;

}

function createMessageElement(text) {
    const element = document.createElement('span')
    element.textContent = text
    element.classList.add('text-msg')
    return element
}

function createReplyButton(parentElement) {
    const button = document.createElement('button')
    button.textContent = 'Reply'
    button.className = 'reply-btn'
    button.addEventListener('click', () => {
        const replyElement = addReply({msg: 'ADDED'})
        parentElement.appendChild(replyElement)
    })
    return button
}


function recursiveDataAdd(replies, parentElement){
    replies.forEach(reply => {
       const replyElement = addReply(reply)
        parentElement.appendChild(replyElement)

        if(reply.replies && reply.replies.length) {
            recursiveDataAdd(reply.replies, replyElement)
        }
    })
}

recursiveDataAdd(repliesData, container)

