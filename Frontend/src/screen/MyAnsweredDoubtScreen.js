import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoubtAction } from '../Action/doubtAction'
import PageLoader from '../components/PageLoader'
import Doubt from '../components/Doubt'

const SolvedDoubtScreen = () => {
  const dispatch = useDispatch()
  const { myDoubts, loading } = useSelector((state) => state.doubts)
  const { user } = useSelector((state) => state.userLogin)

  const getSolvedDoubts = () => {
    if (myDoubts) {
      return myDoubts.filter(
        (doubt) => doubt.resolved === 1 && doubt.answer_id._id === user._id
      )
    }
    return []
  }

  const doubts = getSolvedDoubts()

  useEffect(() => {
    dispatch(getDoubtAction())
  }, [dispatch])

  return (
    <div className='home_container'>
      {loading ? (
        <PageLoader />
      ) : (
        doubts.map((doubt) => <Doubt key={doubt._id} doubt={doubt} />)
      )}
    </div>
  )
}

export default SolvedDoubtScreen
