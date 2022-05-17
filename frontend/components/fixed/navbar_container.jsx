import { connect } from "react-redux";
import React from "react";
import NavBar from "./navbar";
import { logout } from "../../actions/session_actions";


const mSTP = state => ({
  loggedIn: Boolean(state.session.id),
  currentUser: state.entities.users[state.session.id]
})

const mDTP = dispatch => ({
  logout: ()=> dispatch(logout())
})

export default connect(mSTP,mDTP)(NavBar)