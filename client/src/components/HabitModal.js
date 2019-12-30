import { Button, ButtonGroup, Fab } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  Navbar,
  NavItem,
  Row
} from 'reactstrap'
import { clearErrors } from '../actions/errorActions'
import { addHabit } from '../actions/habitActions'
import '../styles/habitModal/habitModal.css'

class HabitModal extends Component {
  state = {
    modal: false,
    name: '',
    frequency: 'day',
    target: null,
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    addHabit: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const { name, frequency, target } = this.state

    const { user } = this.props.auth

    const owner = user.id || user._id

    // Create a habit object
    const newHabit = {
      name,
      frequency,
      target,
      owner
    }

    // Attempt to add habit to db
    this.props.addHabit(newHabit)

    // Close the modal
    if (this.state.msg === null) {
      this.toggle()
    }
  }

  toggle = () => {
    // TODO: clear errors
    // Set the modal to opposite of state
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    const handleFrequency = (event, newFreq) => {
      this.setState({
        frequency: newFreq
      })
    }
    return (
      <>
        {isAuthenticated && (
          <Navbar className="fixed-bottom" style={{ bottom: '5%' }}>
            <Container className="justify-content-end">
              <Nav>
                <NavItem onClick={this.toggle} className="mr-3">
                  <Fab
                    style={{
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'rgb(51, 58, 65)',
                      color: 'white'
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </NavItem>
              </Nav>
            </Container>
          </Navbar>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered={true}
          scrollable={true}
        >
          <ModalHeader>New Habit</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className="ml-1" for="name">
                  Habit Name
                </Label>
                <Input
                  placeholder="work out, study, do yoga, etc."
                  type="name"
                  name="name"
                  id="name"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label className="ml-1" for="frequency">
                  Goal Period
                </Label>
                <br />
                <ToggleButtonGroup
                  size="small"
                  value={this.state.frequency}
                  exclusive
                  onChange={handleFrequency}
                >
                  <ToggleButton value="day">DAILY</ToggleButton>
                  <ToggleButton value="week">WEEKLY</ToggleButton>
                  <ToggleButton value="month">MONTHLY</ToggleButton>
                  <ToggleButton value="year">YEARLY</ToggleButton>
                </ToggleButtonGroup>
                {/* <ButtonGroup variant="text" className="mb-3">
                  <Button
                    style={{ outline: 'none' }}
                    name="frequency"
                    id="daily"
                    value="day"
                    onClick={() =>
                      this.setState({
                        frequency: 'day'
                      })
                    }
                  >
                    DAILY
                  </Button>
                  <Button
                    style={{ outline: 'none' }}
                    name="frequency"
                    id="weekly"
                    value="week"
                    onClick={() =>
                      this.setState({
                        frequency: 'week'
                      })
                    }
                  >
                    WEEKLY
                  </Button>
                  <Button
                    active
                    style={{ outline: 'none' }}
                    name="frequency"
                    id="monthly"
                    value="month"
                    onClick={() =>
                      this.setState({
                        frequency: 'month'
                      })
                    }
                  >
                    MONTHLY
                  </Button>
                  <Button
                    style={{ outline: 'none' }}
                    name="frequency"
                    id="yearly"
                    value="year"
                    onClick={() =>
                      this.setState({
                        frequency: 'year'
                      })
                    }
                  >
                    YEARLY
                  </Button>
                </ButtonGroup> */}
                <br />
                <Label className="ml-1" for="target">
                  Set Your Goal
                </Label>
                <Container className="p-0">
                  <Row>
                    <Col className="col-4">
                      <Input
                        type="number"
                        name="target"
                        id="target"
                        className="mb-3"
                        onChange={this.onChange}
                      />
                    </Col>
                    <Col className="col-8 pl-0">
                      <p className="pt-1">
                        or more times per {this.state.frequency}
                      </p>
                    </Col>
                  </Row>
                </Container>
                <Button
                  disableElevation
                  className="mr-3"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  save
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  onClick={this.toggle}
                >
                  cancel
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  auth: state.auth,
  error: state.error
})

export default connect(mapStateToProps, { addHabit, clearErrors })(
  HabitModal
)
