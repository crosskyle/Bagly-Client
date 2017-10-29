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
    width: 125,
  },
  header: {
    marginTop: theme.spacing.unit
  },
  error: {
    color: 'red'
  }
});


class Welcome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      emailError: false,
      emailErrorText: '',
      passwordError: false,
      passwordErrorText: '',
    }
  }

  onSignin() {
    const validEmail = this.emailValidation()
    const validPassword = this.passwordValidation()

    if (validEmail && validPassword) {
      this.props.signinUser(this.state.email, this.state.password)
    }
  }

  onSignup() {
    const validEmail = this.emailValidation()
    const validPassword = this.passwordValidation()

    if (validEmail && validPassword) {
      this.props.signupUser(this.state.email, this.state.password)
    }
  }

  emailValidation() {
    const { email } = this.state

    if (!email.includes('@')) {
      this.setState({ emailError: true, emailErrorText: 'Must be a valid email'})
      return false
    }
    this.setState({ emailError: false, emailErrorText: ''})
    return true
  }

  passwordValidation() {
    const { password } = this.state

    if (password.length < 8) {
      this.setState({ passwordError: true,
        passwordErrorText: 'Must be at least 8 characters'})
      return false
    }
    this.setState({ passwordError: false, passwordErrorText: ''})
    return true
  }

  render() {
    const { classes, auth } = this.props

    let errorMessage = ''

    if (auth.error && auth.error !== '') {
        errorMessage = auth.error
    }

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
              error={this.state.emailError}
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
              helperText={this.state.emailErrorText}
            />
            <TextField
              error={this.state.passwordError}
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
              helperText={this.state.passwordErrorText}
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
          <Typography className={classes.error}>{errorMessage}</Typography>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

Welcome = withStyles(styles)(Welcome)
Welcome = connect(mapStateToProps, { signinUser, signupUser })(Welcome)

export default Welcome