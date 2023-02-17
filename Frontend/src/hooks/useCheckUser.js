import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constant'

const useCheckUser = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUser = async () => {
      const isUser = await axios.get('/api/users')

      console.log(isUser)
      const user = isUser.data
      if (user) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: user,
        })
        setLoading(false)
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
        })
        setLoading(false)
      }
    }
    checkUser()
  }, [dispatch])

  return { loading }
}

export default useCheckUser
