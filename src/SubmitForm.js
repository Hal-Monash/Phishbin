import {PlusCircleOutlined} from '@ant-design/icons';
import {Button, Input, Row, Col, Space} from 'antd';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {FullWidthInput, FullWidthSpace, Spacer} from './styles';
import _ from "lodash";

SubmitForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

function SubmitForm(props) {
    const [content, setContent] = useState('');
    const [senderNumber, setSenderNumber] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMobile, setContactMobile] = useState('');

    const onIntChange = (e, method) => {
        let valid = true;
        const value = e.target.value;
        if (value) {
            const lastChar = value[value.length - 1]
            if (!(_.isInteger(parseInt(lastChar)) || lastChar === "+")) valid = false;
        }
        if (valid) method(value);
    };

    const onClick = async () => {
        await props.onSubmit({
            content,
            senderNumber,
            contactName,
            contactEmail,
            contactMobile
        });
        setContent('');
        setSenderNumber('');
        setContactName('');
        setContactEmail('');
        setContactMobile('');
    };


    return (
        <React.Fragment>
            <Row>
                <Col flex='auto'>
                    <h4>Report your suspicions SMS message:</h4>
                </Col>
            </Row>
            <Row>
                <Col flex='450px'>
                    <Input.TextArea allowClear autoSize={{minRows: 6, maxRows: 6}}
                                    onChange={e => setContent(e.target.value)} value={content}/>
                </Col>
            </Row>
            <Spacer size={12}/>
            <Row>
                <Col sflex='auto'>
                    <h4>SMS sender number (optional):</h4>
                </Col>
            </Row>
            <Row>
                <Col flex='450px'>
                    <Input
                        onChange={(e) => onIntChange(e, setSenderNumber)}
                        value={senderNumber}
                    />
                </Col>
            </Row>
            <Spacer size={36}/>
            <Row>
                <Col flex='auto'>
                    <h4>Your contact (optional, if you want to hear the feedback)</h4>
                </Col>
            </Row>
            <Row>
                <Col flex='150px'>
                    <h4>Your name (optional): </h4>
                </Col>
                <Col flex='300px'>
                    <Input onChange={e => setContactName(e.target.value)} value={contactName}/>
                </Col>
            </Row>
            <Spacer size={8}/>
            <Row>   
                <Col flex='150px'>
                    <h4>Your email (optional): </h4>
                </Col>
                <Col flex='300px'>
                    <Input onChange={e => setContactEmail(e.target.value)} value={contactEmail}/>
                </Col>
            </Row>
            <Spacer size={8}/>
            <Row>
                <Col flex='220px'>
                    <h4>Your mobile number (optiond): </h4>
                </Col>
                <Col flex='230px'>
                    <Input onChange={e => onIntChange(e, setContactMobile)} value={contactMobile}/>
                </Col>
            </Row>
            <Spacer size={24}/>     
            <Button disabled={!content} onClick={onClick} type='primary'>Submit</Button>
        </React.Fragment>
    );
}

export default SubmitForm;
