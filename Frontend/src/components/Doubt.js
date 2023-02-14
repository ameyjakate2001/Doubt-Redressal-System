import React, { useState } from 'react'

const Doubt = ({ doubt }) => {
  return (
    <div className='doubtCard'>
      <div className='section-1'>
        <h2>{doubt.title}</h2>
        <p>{doubt.description}</p>
        <p>Asked by {doubt.user_id.name}</p>
      </div>
      <hr />
      <div className='section-2'>
        <p>{doubt.comments.length} comments</p>
        <form className='commentSubmitForm'></form>
      </div>
    </div>
  )
}

export default Doubt
