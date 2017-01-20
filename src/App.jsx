import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Menu, Form, Label,
  Container, Input, Grid, List, Popup } from 'semantic-ui-react';
import { addEvent, markAllRead, clearAll } from './actions'

class App extends React.Component {
  state = {isPopupOpen: false}

  handleOpen = () => {
    this.setState({isPopupOpen: true})
  }

  handleClose = () => {
    this.setState({isPopupOpen: false})
  }

  togglePopup = () => {
    this.setState({isPopupOpen: !this.state.isPopupOpen})
  }

  render() {
    const {title, dispatch} = this.props
    return <Container fluid>
      <Menu>
        <Menu.Item header>{title}</Menu.Item>
        <Menu.Item position='right'>
          <Popup 
              trigger={<NotifyButton />}
              open={this.state.isPopupOpen}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              position='bottom right'
              on='click'
          >
            <RecentEvents />
            <Button onClick={this.togglePopup} fluid>show more</Button>
          </Popup>
        </Menu.Item>
      </Menu>

      <Grid columns={2} divided container>
        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={(e, { formData }) => {
             e.preventDefault(); dispatch(addEvent(formData.title));
             }}>
              <Form.Field>
                <Input name='title' placeholder='Enter event text' 
                    label={<Button content='Send' primary/>}
                    labelPosition='right' required/>
              </Form.Field>
              <Form.Button type='button' onClick={() => {dispatch(markAllRead())}}
                  fluid secondary content='Mark all as read'/>
              <Form.Button type='button' onClick={() => {dispatch(clearAll())}}
                  fluid secondary content='ClearAll'/>
              <Form.Button type='button' onClick={this.togglePopup}
                  fluid secondary content='Show/hide popup'/>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <AllEvents />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  }
};

App = connect()(App);

const EventList = ({events}) => (
  <List celled>
    {events.map(e => (
      <List.Item key={e.id}>
        <List.Header>
        {e.unread &&
          <Label color='red' horizontal circular empty></Label>}
        {e.title}</List.Header>
        <List.Description>
          
        {moment(e.datetime).fromNow()}</List.Description>
      </List.Item>
    ))}
  </List>
);

const AllEvents = connect((state) => ({events: state}))(EventList)

const RecentEvents = connect((state) => ({events: state.slice(0, 5)}))(EventList)

const NotifyButton = connect(
  (events) => ({
    unread: events.reduce((acc, event) => 
      event.unread ? acc + 1 : acc, 0)
  }))(({unread, onMouseEnter, onMouseLeave, onBlur, onClick}) => {
    const props = {
      onMouseEnter,
      onMouseLeave,
      onBlur,
      onClick
    }
    if (unread) {
      props.label = {content: unread, color: 'red', size: 'tiny', basic: false}
    }
    return <Button icon='alarm' {...props} />
})

export default App
