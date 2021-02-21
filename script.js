const SIGN_UP = 'SIGN_UP';
const SIGN_IN = 'SIGN_IN';
const EMAIL = 'EMAIL';
const NAME = 'NAME';
const PASSWORD = 'PASSWORD';
const RETYPE = 'RETYPE';
const VALIDATE_PASS = 'VALIDATE_PASS';
const SUBMIT = 'SUBMIT';
const SUBMIT_SIGN_IN = 'SUBMIT_SIGN_IN';


const initialState = {
  signUp: true,
  signIn: false,
  email: false,
  emailAdress: undefined,
  validName: false,
  name: '',
  password: '',
  retype: '',
  validPass: false,
  submit: false,
  submitSignIn: false };



function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return Object.assign({}, state, { signUp: true, signIn: false });
    case SIGN_IN:
      return Object.assign({}, state, { signUp: false, signIn: true });
    case EMAIL:
      return Object.assign({}, state, { email: true, emailAdress: action.payload });
    case NAME:
      return Object.assign({}, state, { validName: true, name: action.payload });
    case PASSWORD:
      return Object.assign({}, state, { password: action.payload });
    case RETYPE:
      return Object.assign({}, state, { retype: action.payload });
    case VALIDATE_PASS:
      return Object.assign({}, state, { validPass: true });
    case SUBMIT:
      return Object.assign({}, state, { submit: true });
    case SUBMIT_SIGN_IN:
      return Object.assign({}, state, { submitSignIn: true });
    default:
      return state;}

}

const Select = () => {
  const signUp = () => {
    store.dispatch({ type: SIGN_UP });
  };
  const signIn = () => {
    store.dispatch({ type: SIGN_IN });
  };
  return /*#__PURE__*/(
    React.createElement("div", { className: "select" }, /*#__PURE__*/
    React.createElement("button", { className: store.getState().signUp ? 'btn active' : 'btn', onClick: signUp }, "Sign Up"), /*#__PURE__*/
    React.createElement("button", { className: store.getState().signIn ? 'btn active' : 'btn', onClick: signIn }, "Sign In")));


};

class Password extends React.Component {
  constructor(props) {
    super(props);
    const show = props.label;
    this.state = {
      label: show };

  }
  enterPass(e) {
    const data = e.target.value;
    const containsDigits = /[0-9]/.test(data);
    const containsUpper = /[A-Z]/.test(data);
    const containsLower = /[a-z]/.test(data);
    this.setState({ label: true });
    if (containsDigits && containsUpper && containsLower && data.length >= 6) {
      this.props.enterPass(data);
      this.setState({ label: false });
    }
  }
  checkPass(e) {
    const data = e.target.value;
    this.props.checkPass(data);
  }
  render() {
    const passwordMatch = store.getState().password ? 'Passwords do not match' : 'Retype Password';
    return /*#__PURE__*/(
      React.createElement("div", { className: "password" },
      store.getState().signUp && this.state.label ? /*#__PURE__*/React.createElement("label", null, "Password must contain at least one capital letter, one number and one small letter and have a length of minimum 6 characters") : '', /*#__PURE__*/
      React.createElement("input", {
        className: "form-control",
        placeholder: this.props.retype ? passwordMatch : 'Password',
        type: "password",
        onChange: this.props.retype ? this.checkPass.bind(this) : this.enterPass.bind(this) })));



  }}


class Email extends React.Component {
  handleChange(e) {
    const data = e.target.value;
    const constraints = {
      from: {
        email: true } };



    const valid = validate({ from: data }, constraints);
    let passed = false;

    if (valid === undefined) {
      passed = true;
    }

    if (passed) {
      store.dispatch({ type: EMAIL, payload: data });
    }
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("input", {
        className: "form-control",
        placeholder: "Email Adress",
        type: "email",
        onChange: this.handleChange.bind(this),
        value: store.getState().email ? store.getState().emailAdress : undefined })));




  }}


class Name extends React.Component {
  handleChange(e) {
    const data = e.target.value;
    const capitalized = data.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    store.dispatch({ type: NAME, payload: capitalized });
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("input", {
        className: "form-control",
        placeholder: "Name",
        type: "text",
        onChange: this.handleChange.bind(this),
        value: store.getState().name })));



  }}


class PassSignUp extends React.Component {
  enterPass(data) {
    store.dispatch({ type: PASSWORD, payload: data });
  }
  checkPass(data) {
    store.dispatch({ type: RETYPE, payload: data });
    const constraints = {
      confirmPassword: {
        equality: "password" } };


    const validatePass = validate({ password: store.getState().password, confirmPassword: store.getState().retype }, constraints);

    if (validatePass === undefined) {
      console.log('simillar');
      store.dispatch({ type: VALIDATE_PASS });
    }
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(Password, { enterPass: this.enterPass, label: this.props.label }), /*#__PURE__*/
      React.createElement(Password, { checkPass: this.checkPass, retype: true })));


  }}


class SubmitButton extends React.Component {
  handleClick() {
    const signUp = store.getState().signUp;
    const email = store.getState().email;
    const validName = store.getState().validName;
    const validPass = store.getState().validPass;
    const password = store.getState().password;
    if (signUp && email && validName && validPass) {
      store.dispatch({ type: SUBMIT });
    } else if (email) {
      store.dispatch({ type: SUBMIT_SIGN_IN });
    }
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: store.getState().validPass ? 'btn-wrapper active' : 'btn-wrapper' }, /*#__PURE__*/
      React.createElement("button", {
        className: "btn",
        type: "submit",
        onClick: this.handleClick.bind(this) },
      this.props.text)));


  }}


const SignUpForm = () => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, "Get Started Now"), /*#__PURE__*/
    React.createElement(Name, null), /*#__PURE__*/
    React.createElement(Email, null), /*#__PURE__*/
    React.createElement(PassSignUp, { label: false }), /*#__PURE__*/
    React.createElement(SubmitButton, { text: 'Sign Up' }), /*#__PURE__*/
    React.createElement("p", null, "By clicking 'Sign Up' I agree with the ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", { href: "#" }, "Terms and Conditions"))));


};

class SignUpSuccess extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "signUp-success" }, /*#__PURE__*/
      React.createElement("h1", null, "Thanks For Signing Up ", /*#__PURE__*/React.createElement("br", null), " ", store.getState().name)));


  }}


const SignInForm = () => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, "Sign In To Continue"), /*#__PURE__*/
    React.createElement(Email, null), /*#__PURE__*/
    React.createElement(Password, null), /*#__PURE__*/
    React.createElement("div", { className: "checkbox" }, /*#__PURE__*/
    React.createElement("label", null, /*#__PURE__*/
    React.createElement("input", { type: "checkbox" }), " Remeber Password?")), /*#__PURE__*/


    React.createElement(SubmitButton, { text: 'Sign In' })));


};

const SignInSuccess = () => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "signUp-success" }, /*#__PURE__*/
    React.createElement("h1", null, "Welcome Back")));


};

const SignUp = () => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "signUp-page text-center" },
    store.getState().submit ? /*#__PURE__*/React.createElement(SignUpSuccess, null) : /*#__PURE__*/React.createElement(SignUpForm, null)));


};

const SignIn = () => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "signIn-page text-center" },
    store.getState().submitSignIn ? /*#__PURE__*/React.createElement(SignInSuccess, null) : /*#__PURE__*/React.createElement(SignInForm, null)));


};

class Modal extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "modal-element" },
      store.getState().submit || store.getState().submitSignIn ? /*#__PURE__*/React.createElement("div", null) : /*#__PURE__*/React.createElement(Select, null), /*#__PURE__*/
      React.createElement("div", null,
      store.getState().signUp ? /*#__PURE__*/React.createElement(SignUp, null) : /*#__PURE__*/React.createElement(SignIn, null))));



  }}


class App extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container" }, /*#__PURE__*/
      React.createElement(Modal, null)));


  }}


const { createStore } = Redux;
const store = createStore(reducer);

const render = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(App, null),
  document.getElementById('app'));

};

store.subscribe(render);
render();