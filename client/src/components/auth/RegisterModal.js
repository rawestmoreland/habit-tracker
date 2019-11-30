import React, { Component } from 'react'
import {
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { connect } from 'react-redux'

class RegisterModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (this.props.isAuthenticated) {
        this.toggle()
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors()
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state

    // Create user object
    const newUser = {
      email,
      password
    }

    // Attempt to register
    this.props.register(newUser)
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg && (
              <Alert color="danger">{this.state.msg}</Alert>
            )}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
)
