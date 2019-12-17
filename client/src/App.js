import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Container } from 'reactstrap'
import store from './store'
import AppNavbar from './components/AppNavbar'
import HabitList from './components/HabitList'
import HabitModal from './components/HabitModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { loadUser } from './actions/authActions'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container
            className="h-100 fixed-bottom"
            style={{ top: 56 }}
          >
            <HabitList />
            <HabitModal />
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App
