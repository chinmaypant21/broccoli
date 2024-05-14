import { useEffect, useState } from 'react'
import './App.css'
import useCustomComment from './hooks/useCustomComment'

// Add Comment
// Comment => Reply Edit Delete
// Comment Edit => Save Cancel
// Dropdown btn to show/hide children

/**
 * id, text, children: []
 */

function App() {
  const [commentsData, setCommentsData] = useState([])

  const {insertComment, editComment, deleteComment} = useCustomComment(commentsData, setCommentsData);

  function handleAddComment(){
    const newComment = {
      id: new Date().getTime(),
      text: `Something`,
      children: []
    }

    setCommentsData(prevData => [...prevData, newComment])
  }

  return (
    <div>
      <button onClick={handleAddComment}>Add Comment</button>
      <section className='comment-section'>
      {
        commentsData.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            insertComment={insertComment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        ))
      }
      </section>
    </div>
  )
}

function Comment({comment, insertComment, editComment, deleteComment}){
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand(){
    setIsExpanded(prev => !prev)
  }

  function handleReply(){
    insertComment(comment.id, {
      id: new Date().getTime(),
      text: `Something`,
      children: []
    })
  }

  function handleEdit(){
    editComment(comment.id, 'New Textt')
  }

  function handleDelete(){
    deleteComment(comment.id)
  }

  return (
    <div className="comment-container">
      <div className='comment-body'>
        <span className='comment-text'>{comment.text}</span>
        <div className='comment-tools-container'>
          <button onClick={toggleExpand}>{isExpanded ? 'V' : '>'}</button>
          <button onClick={handleReply} className='comment-reply-btn'>Reply</button>
          <button onClick={handleEdit} className='comment-reply-btn'>Edit</button>
          <button onClick={handleDelete} className='comment-reply-btn'>Delete</button>
        </div>
      </div>

      {
        isExpanded &&
        <div className='reply-container'>
          {
            comment.children.map(childComment => <Comment key={childComment.id} comment={childComment} insertComment={insertComment} editComment={editComment} deleteComment={deleteComment} />)
          }
        </div>
      }
    </div>
  )
}

export default App
