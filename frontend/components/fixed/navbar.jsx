import React from "react";
import { Link } from "react-router-dom";
import CategoryIndexContainer from "../listings/category_index_container";
// import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { GoLocation } from 'react-icons/go'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { GiSBrick } from 'react-icons/gi'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'


class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {search:""}
  }
  handleChange = ()=>(e)=> this.setState({search: e.target.value})

  render(){
    let menu;
    if (this.props.loggedIn) {
      const split_name = props.currentUser.full_name.split(' ')
      menu =  <span className='nav-btn'>Hi, {`${split_name[0]}`} <Link onClick={this.props.logout} to={'/login'}>Logout</Link></span>
    } else {
      menu = <a href="/#/login" className='nav-btn'><p>Sign In</p></a>
    } 
    return (
      <div>
      <div className="header">
        <div className="personal-links">
          <div className="personal-links-inner-wrapper">
            <div className="each-link-set">
              <a href="https://www.linkedin.com/in/pamela-jane/" className="grey icon" ><IoLogoLinkedin /> </a>
              <a href="https://www.linkedin.com/in/pamela-jane/" className="grey" > LinkedIn</a> 
            </div>
            <div className="each-link-set">
              <a href="https://github.com/Pamm-j/MyCoOpt" className="grey icon" ><IoLogoGithub /></a>
              <a href="https://github.com/Pamm-j/MyCoOpt" className="grey" > Github</a>
            </div>
            <div className="each-link-set">
              <a href="https://pamm-j.github.io/circuits/" className="grey icon" id='brick' ><GiSBrick /></a>
              <a href="https://pamm-j.github.io/circuits/" className="grey" > Circuits Game</a>
            </div>
          </div>
        </div>
        <div className="inner-header">
          <div className="inner-header-left">
            <a href="/#/"><img className="logo" src={window.logo} /></a>
            <Link className='shop-btn' to='/'>Shop</Link>
          </div>
                {/* <input 
                  className="search-input"
                  type="text"
                  placeholder="Search for great gear"
                  value={this.state.search} 
                  onChange={this.handleChange()}
                /> */}
          <div className="inner-header-right">
            <a href="/#/stores"> <GoLocation className="icon"/></a>
            <a href="/#/stores" className='nav-btn'><p> Stores</p></a>
            <AiOutlineUser className="icon"/>  
            {menu}
            <a href="/#/cart"><MdOutlineShoppingCart className="icon"/></a>
            <a href="/#/cart" className='nav-btn'><p>Cart</p></a>      
          </div>
        </div>
        <CategoryIndexContainer />
      </div>
      </div>
    )
  }
}
export default NavBar; 