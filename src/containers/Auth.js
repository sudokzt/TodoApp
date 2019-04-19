import { connect } from "react-redux";

import { loginOk, logout } from "../actions/Auth";

import Login from "../components/Login";

const mapStateToProps = state => {
  const authState = state.auth;
  return { ...authState };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount() {
      dispatch(loginOk());
    },
    logout() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
