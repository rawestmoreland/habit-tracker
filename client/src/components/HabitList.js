import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Label,
  Form,
  Input
} from 'reactstrap'
import {
  getHabits,
  deleteHabit,
  updateHabit
} from '../actions/habitActions'
import '../styles/habitList/habitList.css'
import { MoreHoriz } from '@material-ui/icons/'
import { Icon } from '@material-ui/core'

class HabitList extends Component {
  state = {
    modal: false,
    habitState: null,
    habitSelectedName: null,
    habitSelectedId: null
  }

  componentDidMount() {
    this.props.getHabits()
    let now = moment.utc().format()
    console.log(now)
  }

  static propTypes = {
    getHabits: PropTypes.func.isRequired,
    deleteHabit: PropTypes.func.isRequired,
    updateHabit: PropTypes.func.isRequired,
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

    const toggle = (habitName, habitId) => {
      this.setState({
        modal: !this.state.modal,
        habitSelectedName: habitName,
        habitSelectedId: habitId
      })
    }

    const incrementHabit = habitIndex => {
      // Increment the clicked habit by 1 completed
      habits[habitIndex].completed++

      // Some lastCompleted variables
      let lastCompleted = habits[habitIndex].lastCompleted

      // If completed === target, add today's date to lastCompleted variable
      if (
        habits[habitIndex].completed === habits[habitIndex].target
      ) {
        lastCompleted = moment.utc()
      }

      // TODO: Depending on the frequency, update lastCompleted variable if task completed and the streak has not been broken. If the streak was broken, clear lastCompleted and add restart with today's date
      // Switch case for the frequency of the habit.
      switch (habits[habitIndex].frequency) {
        case 'day':
          if (lastCompleted !== null) {
          }
          break
        case 'week':
          if (lastCompleted !== null) {
          }
          break
        case 'month':
          if (lastCompleted !== null) {
          }
          break
        case 'year':
          break
        default:
          break
      }

      // TODO: Update the streak++ if there is still a streak

      // Update in the database and update the state
      const data = {
        id: habits[habitIndex]._id,
        name: habits[habitIndex].name,
        frequency: habits[habitIndex].frequency,
        target: habits[habitIndex].target,
        streak: habits[habitIndex].streak,
        lastCompleted: lastCompleted,
        completed: habits[habitIndex].completed,
        owner: habits[habitIndex].owner
      }

      this.props.updateHabit(data)

      this.setState({})
    }

    const deleteHabit = id => {
      this.props.deleteHabit(id)
      this.setState({
        modal: false
      })
    }

    let renderHabits = () => {
      return habits.map(
        (
          { _id, name, completed, frequency, target, streak },
          index
        ) => (
          <div key={_id} className="progress-wrapper">
            <div
              onClick={() => incrementHabit(index)}
              id="myProgress"
              className="progress"
            >
              <div className="progress-inner">
                <div className="inner-column">
                  <div className="name-row">
                    <div>
                      <h5
                        onClick={event => {
                          event.stopPropagation()
                          toggle(name, _id)
                        }}
                      >
                        {name}
                      </h5>
                    </div>
                  </div>
                  <div className="freq-row">
                    {freq(frequency)} {completed} / {target}
                  </div>
                </div>
                <div className="inner-column edit-column">
                  <div>
                    <h1>{streak}</h1>
                  </div>
                </div>
              </div>
              <div
                id="progress-bar"
                className="progress-bar"
                style={{
                  backgroundColor: 'lightblue',
                  width: `${(completed / target) * 100}%`
                }}
              />
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
          <ModalHeader>{this.state.habitSelectedName}</ModalHeader>
          <ModalBody>
            <Button
              color="danger"
              onClick={() => deleteHabit(this.state.habitSelectedId)}
            >
              delete
            </Button>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  habit: state.habit
})

export default connect(mapStateToProps, {
  getHabits,
  deleteHabit,
  updateHabit
})(HabitList)
