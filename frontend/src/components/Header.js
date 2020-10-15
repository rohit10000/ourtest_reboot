import React from "react";
import "./Header.css";
import {Link, useHistory} from "react-router-dom";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useStateValue} from "../contextAPI/StateProvider";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {logout} from "../utility/authenticateUtility";

function Header(){

    const [state, dispatch] = useStateValue();
    const history = useHistory();

    return (
        <div className={"navbar__container"}>
            <Navbar className="header fixed-top" expand="lg" variant={"dark"}>
                <Navbar.Brand href="/">
                    <img className="header__logo"
                         src={require("../images/logo.png")}
                         alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={"navbar-light"}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto header__button__group">
                        <Nav.Link href="/">
                            <span className="header__option">Home</span>
                        </Nav.Link>
                        <Nav.Link href="/about">
                            <span className="header__option">About</span>
                        </Nav.Link>
                        <Nav.Link href="/blogs">
                            <span className="header__option">Blogs</span>
                        </Nav.Link>
                        <Nav.Link href="/contact">
                            <span className="header__option">Contact</span>
                        </Nav.Link>
                    </Nav>
                    <div className={"header__auth__button"}>
                        <div style={{flex:1}}>
                        </div>
                        {
                            state.authorizedUser ? (
                                <div className={"header__login"}>
                                    <a style={{color: "white"}} onClick={()=>{history.push('/yourLogs')}}>Your Logs</a>
                                    <a style={{color: "white"}} onClick={() => logout(dispatch, history)}>Logout</a>
                                    <ExitToAppIcon style={{color: "white", fontSize:"x-large"}}/>
                                </div>
                            ):(
                                <div className={"header__login"}>
                                    <a style={{color: "white"}} onClick={()=>{history.push('/login')}}>Login</a>
                                    <MeetingRoomIcon style={{color: "white", fontSize:"x-large"}}/>
                                </div>
                            )
                        }

                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>


    )
}
export default Header;