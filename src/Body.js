import {Space} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import RecentSubmissions from './RecentSubmissions';
import {Body as StyledBody} from './styles';
import SubmitForm from './SubmitForm';

Body.propTypes = {
    user: PropTypes.object,
    onCreateSubmission: PropTypes.func.isRequired,
    onLoadMoreSubmissions: PropTypes.func.isRequired,
    submissions: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdateSubmissions: PropTypes.func.isRequired,
};

function Body(props) {
    return (
        <StyledBody>
            <Space direction='vertical' size={48} style={{width: '100%'}}>
                {!props.user && <SubmitForm onSubmit={props.onCreateSubmission}/>}
                {props.user && <RecentSubmissions onLoadMore={props.onLoadMoreSubmissions} submissions={props.submissions} onUpdateSubmissions={props.onUpdateSubmissions}/>}
            </Space>
        </StyledBody>
    );
}

export default Body;