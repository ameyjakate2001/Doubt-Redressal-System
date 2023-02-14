import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getDoubtAction } from '../Action/doubtAction'
import PageLoader from '../components/PageLoader'
import Doubt from '../components/Doubt'

const DoubtScreen = () => {
  const { myDoubts, loading } = useSelector((state) => state.doubts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDoubtAction())
  }, [])
  return (
    <div>
      {loading && <PageLoader />}
      {myDoubts &&
        myDoubts.map((doubt) => <Doubt key={doubt.id} doubt={doubt} />)}
    </div>
  )
}

export default DoubtScreen
