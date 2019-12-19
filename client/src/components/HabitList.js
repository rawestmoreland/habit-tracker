import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import { getHabits } from '../actions/habitActions'
import '../styles/habitList/habitList.css'

class HabitList extends Component {
  state = {
    modal: false,
    habitSelected: null
  }

  componentDidMount() {
    this.props.getHabits()
  }

  toggle = event => {
    this.setState({
      modal: !this.state.modal
    })
  }

  static propTypes = {
    getHabits: PropTypes.func.isRequired,
    habit: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  render() {
    const { habits } = this.props.habit
    const { isAuthenticated } = this.props.auth

    // Function for the frequency in the list item
    const freq = frequency => {
      switch (frequency) {
        case 'day':
          return 'TODAY:'
          break
        case 'week':
          return 'THIS WEEK:'
          break
        case 'month':
          return 'THIS MONTH:'
          break
        case 'year':
          return 'THIS YEAR:'
          break
        default:
          break
      }
    }

    const toggle = habitName => {
      this.setState({
        modal: !this.state.modal,
        habitSelected: habitName
      })
    }

    let renderHabits = () => {
      return habits.map(
        ({ _id, name, completed, frequency, target }) => (
          <div
            onClick={() => toggle(name)}
            key={_id}
            id="myProgress"
            className="progress"
          >
            <div
              id="progress-bar"
              className="progress-bar"
              style={{
                backgroundColor: 'lightblue',
                width: `${(completed / target) * 100}%`
              }}
            >
              <Container>
                <Row className="name-row progress-inner">{name}</Row>
                <Row className="freq-row progress-inner">
                  {freq(frequency)} {completed} / {target}
                </Row>
              </Container>
            </div>
          </div>
        )
      )
    }

    return (
      <Container className="mt-3">
        {isAuthenticated && renderHabits()}
        <Modal
          centered
          isOpen={this.state.modal}
          toggle={() => toggle()}
        >
          <ModalHeader>{this.state.habitSelected}</ModalHeader>
          <ModalBody></ModalBody>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  habit: state.habit
})

export default connect(mapStateToProps, { getHabits })(HabitList)
