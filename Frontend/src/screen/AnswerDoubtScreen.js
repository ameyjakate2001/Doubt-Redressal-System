import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAnswerAction, getDoubtAction } from '../Action/doubtAction'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../components/PageLoader'
import Doubt from '../components/Doubt'

const MyDoubtScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { myDoubts, loading } = useSelector((state) => state.doubts)
  const [answer, setAnswer] = useState('')
  const [doubts, setDoubts] = useState([])
  const [doubt, setDoubt] = useState(null)
  const queryParams = new URLSearchParams(window.location.search)
  const id = queryParams.get('id')

  const handleDoubtAccept = (doubtId) => {
    navigate(`/solveDoubt/?id=${doubtId}`)
    setDoubt(myDoubts.find((doubt) => doubt._id === doubtId))
  }

  const handleAnswerSubmission = () => {
    dispatch(addAnswerAction(answer, id)).then(() => {
      navigate('/')
    })
  }
  const renderDoubtList = () =>
    doubts.map((doubt, i) => (
      <Card key={doubt._id} className='mb-3' style={{ maxWidth: '50^' }}>
        <Card.Body className='d-flex justify-content-center align-items-center'>
          <Card.Title>
            {i + 1}) {doubt.title}
          </Card.Title>
          <Button
            variant='success'
            onClick={() => handleDoubtAccept(doubt._id)}
          >
            Accept
          </Button>
        </Card.Body>
      </Card>
    ))

  const renderSolvedDoubtView = () => (
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
                <Button variant='success' onClick={handleAnswerSubmission}>
                  Answer
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )

  useEffect(() => {
    dispatch(getDoubtAction())
  }, [dispatch])

  useEffect(() => {
    setDoubts(myDoubts.filter((doubt) => doubt.resolved === 0))
  }, [myDoubts])

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : id && doubt ? (
        renderSolvedDoubtView()
      ) : (
        doubts.length > 0 && renderDoubtList()
      )}
    </div>
  )
}

export default MyDoubtScreen
