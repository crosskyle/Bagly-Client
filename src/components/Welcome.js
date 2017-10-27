import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signinUser, signupUser } from '../actions'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui-next/styles'
import Paper from 'material-ui-next/Paper'
import Typography from 'material-ui-next/Typography'
import TextField from 'material-ui-next/TextField'
import Button from 'material-ui-next/Button'


const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: theme.mixins.gutters({
    paddingTop: 40,
    paddingBottom: 30,
    marginLeft: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 6,
    marginTop: theme.spacing.unit * 6,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  }),
  form:{
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: theme.spacing.unit,
    paddingRight: 45,
    paddingLeft: 45,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit * 3,
    width: 175,
  },
  header: {
    marginTop: theme.spacing.unit
  }

});


class Welcome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  onSignin() {
    this.props.signinUser(this.state.email, this.state.password)
  }

  onSignup() {
    this.props.signupUser(this.state.email, this.state.password)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <Typography className={classes.header} type="headline" component="h3">
            Welcome to Bagly
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              margin="normal"
              value={this.state.email}
              onChange={(event) => {
                this.setState({
                  email: event.target.value
                })
              }}
            />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={this.state.password}
              onChange={(event) => {
                this.setState({
                  password: event.target.value
                })
              }}
            />
          </form>
          <Button
          raised
          color="primary"
          className={classes.button}
          onClick={() => this.onSignin()}
        >
          signin
        </Button>
          <Button
            raised
            color="primary"
            className={classes.button}
            onClick={() => this.onSignup()}
          >
            signup
          </Button>
        </Paper>
      </div>
    );
  }
}


Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

Welcome = withStyles(styles)(Welcome)
Welcome = connect(null, { signinUser, signupUser })(Welcome)

export default Welcome