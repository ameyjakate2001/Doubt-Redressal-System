import { useState, useEffect } from 'react'
import { addAnswerAction } from '../Action/doubtAction'
import { useDispatch, useSelector } from 'react-redux'
import { getDoubtAction } from '../Action/doubtAction'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Doubt from '../components/Doubt'
import Col from 'react-bootstrap/Col'

import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import PageLoader from '../components/PageLoader'

const MyDoubtScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { myDoubts, loading } = useSelector((state) => state.doubts)
  const [answer, setAnswer] = useState('')
  const [doubts, setDoubts] = useState(
    myDoubts && myDoubts.filter((doubt) => doubt.resolved === 0)
  )
  const [doubt, setDoubt] = useState(null)
  const queryParams = new URLSearchParams(window.location.search)
  const id = queryParams.get('id')

  const doubtAcceptHandler = (id) => {
    navigate(`/solveDoubt/?id=${id}`)
    setDoubt(myDoubts.filter((doubt) => doubt._id === id)[0])
  }
  const addAnswerHandler = () => {
    dispatch(addAnswerAction(answer, id))
    navigate('/')
  }

  useEffect(() => {
    dispatch(getDoubtAction())
  }, [dispatch])
  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : id && doubt ? (
        <div className='solve'>
          <Container>
            <Row>
              <Col md={7}>
                <div className='first-dabba '>
                  <Doubt doubt={doubt} />
                </div>
              </Col>
              <Col md={4}>
                <div className='second-dabba bg-secondary'>
                  <form id='submitForm'>
                    <h2>Answer</h2>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Answer'
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <Button variant='success' onClick={addAnswerHandler}>
                      Answer
                    </Button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        doubts &&
        doubts.map((doubt) => (
          <div key={doubt._id} className=' d-flex justify-contend-end'>
            <h3>{doubt.title}</h3>
            <Button onClick={() => doubtAcceptHandler(doubt._id)}>
              Accept
            </Button>
          </div>
        ))
      )}
    </div>
  )
}

export default MyDoubtScreen
