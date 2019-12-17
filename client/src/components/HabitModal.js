import React, { Component } from 'react'
import {
  NavLink,
  Navbar,
  Nav,
  Container,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { Fab, ButtonGroup, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

class HabitModal extends Component {
  state = {
    modal: true,
    name: ''
  }

  toggle = () => {
    // TODO: clear errors
    // Set the modal to opposite of state
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <>
        <Navbar className="fixed-bottom" style={{ bottom: '5%' }}>
          <Container className="justify-content-end">
            <Nav>
              <NavItem onClick={this.toggle} className="mr-3">
                <Fab
                  color="primary"
                  style={{ border: 'none', outline: 'none' }}
                >
                  <AddIcon />
                </Fab>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered={true}
          scrollable={true}
        >
          <ModalHeader toggle={this.toggle}>New Habit</ModalHeader>
          <ModalBody>
            <Form>
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
                  onChange={this.onchange}
                />
                <Label className="ml-1" for="frequency">
                  Goal Period
                </Label>
                <br />
                <ButtonGroup variant="text" className="mb-3">
                  <Button
                    name="daily"
                    id="daily"
                    value="daily"
                    onClick={this.onChange}
                  >
                    DAILY
                  </Button>
                  <Button
                    name="weekly"
                    id="weekly"
                    value="weekly"
                    onClick={this.onChange}
                  >
                    WEEKLY
                  </Button>
                  <Button
                    name="monthly"
                    id="monthly"
                    value="monthly"
                    onClick={this.onChange}
                  >
                    MONTHLY
                  </Button>
                  <Button
                    name="yearly"
                    id="yearly"
                    value="yearly"
                    onClick={this.onChange}
                  >
                    YEARLY
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

export default HabitModal
