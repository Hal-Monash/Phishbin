import React from 'react';
import {Header as StyledHeader} from './styles';
import {Button} from "antd";
import PropTypes from "prop-types";


Header.propTypes = {
    onClickLogin: PropTypes.func.isRequired,
    user: PropTypes.object,
};

function Header(props) {
    const showUser =()=>{
        console.log(props.user)
    }
    return (
        <StyledHeader>
            <h1>PhishBin</h1>
            {!props.user && <Button onClick={props.onClickLogin}>Log In</Button>}
        </StyledHeader>
    );
}

export default Header;
