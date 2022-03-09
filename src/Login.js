import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Col, Form, Input, Modal, Row} from "antd";
import {Spacer} from "./styles";

Login.propTypes = {
    onFinish: PropTypes.func.isRequired,
    setVisible: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const close = () => props.setVisible(false);

    const onClickLogin = async () => {
        await props.onFinish({ email, password });
        close();
    };

    return (
        <Modal
            maskClosable={false}
            okButtonProps={{disabled: !email || !password}}
            okText='Log In'
            onCancel={close}
            onOk={onClickLogin}
            visible={props.visible}
        >
            <Spacer size={32}/>
            <Row>
                <Col span={5}>
                    <h4>Email:</h4>
                </Col>
                <Col span={19}>
                    <Input onChange={e => setEmail(e.target.value)} type='email' value={email}/>
                </Col>
            </Row>
            <Spacer size={12}/>
            <Row>
                <Col span={5}>
                    <h4>Password:</h4>
                </Col>
                <Col span={19}>
                    <Input.Password onChange={e => setPassword(e.target.value)} value={password}/>
                </Col>
            </Row>
        </Modal>
    );
}

export default Login;