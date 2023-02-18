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
  const [doubts, setDoubts] = useState(
    myDoubts &&
      myDoubts.filter((doubt) => user && user._id === doubt.user_id._id)
  )
  useEffect(() => {
    dispatch(getDoubtAction())
  }, [dispatch])
  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        doubts && doubts.map((doubt) => <Doubt doubt={doubt} />)
      )}
    </div>
  )
}

export default AskedDoubtScreen
