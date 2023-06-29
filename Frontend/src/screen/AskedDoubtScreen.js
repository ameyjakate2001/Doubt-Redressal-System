import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoubtAction } from '../Action/doubtAction'

import PageLoader from '../components/PageLoader'
import Doubt from '../components/Doubt'

const AskedDoubtScreen = () => {
  const dispatch = useDispatch()
  const { myDoubts, loading } = useSelector((state) => state.doubts)
  const { user } = useSelector((state) => state.userLogin)
  console.log(user)
  function getAskedDoubts() {
    if (myDoubts) {
      return myDoubts.filter((doubt) => doubt.user_id._id === user._id)
    }
  }
  const doubts = getAskedDoubts()
  useEffect(() => {
    dispatch(getDoubtAction())
  }, [dispatch])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className='home_container'>
      {loading ? (
        <PageLoader />
      ) : (
        doubts && doubts.map((doubt) => <Doubt doubt={doubt} />)
      )}
    </div>
  )
}

export default AskedDoubtScreen
