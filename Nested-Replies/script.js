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

function recursiveDataAdd(replies, parentElement){
    replies.forEach(reply => {
        const element = document.createElement('div')
        element.style.paddingLeft = `${12}px`
        element.classList.add('reply-container')
        element.appendChild(createReplyBody(reply.msg, element))

        parentElement.appendChild(element)

        if(reply.replies && reply.replies.length) {
            recursiveDataAdd(reply.replies, element)
        }
    })
}

function createReplyBody(text, parentElement){
    const element = document.createElement('div')
    element.classList.add('reply-body')
    element.appendChild(createMessageElement(text))
    element.appendChild(createReplyElement(parentElement))

    return element;

}

function createMessageElement(text) {
    const element = document.createElement('span')
    element.textContent = text
    element.classList.add('text-msg')
    return element
}

function createReplyElement(parentElement) {
    console.log(parentElement)
    const button = document.createElement('button')
    button.textContent = 'Reply'
    button.className = 'reply-btn'
    button.addEventListener('click', () => {
        recursiveDataAdd([
            {msg: 'ADDED'},
        ],
        parentElement
    )
    })
    return button
}

recursiveDataAdd(repliesData, container)

