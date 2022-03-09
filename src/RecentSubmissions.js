import {Button, Dropdown, Table} from 'antd';
import { size } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { LoadMoreContainer } from './styles';
import DropdownList from './DropdownList';




RecentSubmissions.propTypes = {
	onLoadMore: PropTypes.func.isRequired,
	submissions: PropTypes.arrayOf(PropTypes.object).isRequired,
	onUpdateSubmissions: PropTypes.func.isRequired,
};



function RecentSubmissions(props) {


	const COLUMNS = [
		{
			title: 'From',
			dataIndex: 'senderNumber',
			key: 'senderNumber',
		},
		{
			title: 'Content',
			dataIndex: 'content',
			key: 'content',
			width: '55%',
		},
		{
			title: 'Submission Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (value) => moment(value).format('DD/MM/yyyy'),
		},
		{
			title: 'Review Result',
			// dataIndex: 'evaluation',
			key: 'review',
			// render: (value) => <DropdownList onUpdate={RecentSubmissions.onUpdateSubmissions} value={value}></DropdownList>,
			render: (object) => <DropdownList onUpdate={props.onUpdateSubmissions} value={object}/>,
		},
	];


	const dataSource = props.submissions.map(s => ({ key: s._id, ...s }));

	function renderFooter() {
		return size(props.submissions) >= 30 ? (
			<LoadMoreContainer>
				<Button onClick={props.onLoadMore}>Load more...</Button>
			</LoadMoreContainer>
		) : null;
	}

	return (
		<React.Fragment>
			<h3>Recent Submissions</h3>
			<Table
				bordered
				columns={COLUMNS}
				dataSource={dataSource}
				footer={renderFooter}
				pagination={false}
				size='small'
			/>
		</React.Fragment>
	);
}

export default RecentSubmissions;