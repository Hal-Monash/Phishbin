import {message, notification, Spin} from 'antd';
import 'antd/dist/antd.css';
import {size} from 'lodash';
import * as queryString from 'querystring';
import React, {useEffect, useState} from 'react';
import client from './api';
import Body from './Body';
import Header from './Header';
import {Viewport} from './styles';
import Login from "./Login";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    /* Perform a request, set loading and error handling */
    const perform = async (action) => {
        try {
            setLoading(true);
            await action();
        } catch (e) {
            notification.error({
                message: 'Error',
                description: e.message,
            });
        } finally {
            setLoading(false);
        }
    };

    /* Load data on mount */
    useEffect(() => {
        perform(fetchSubmissions);
    }, []);

    const logIn = async (payload) => {
        await perform(async () => {
            const res = await client.post('/auth/login', payload);
            message.success('Login successful');
            setUser(res.data.user);
        });
    };

    const fetchSubmissions = async (limit = 30) => {
        const query = queryString.stringify({limit});
        const res = await client.get('/submissions?' + query);
        setSubmissions(res.data);
    };

    const createSubmission = async (payload) => {
        await perform(async () => {
            await client.post('/submissions', payload);
            await fetchSubmissions();
        });
    };

    const loadMoreSubmissions = async () => {
        perform(() => fetchSubmissions(size(submissions) + 30));
    };

    const updateSubmissions = async (payload) => {
        await perform(async () => {
            await client.put('/submissions/'+payload._id, payload);
            await fetchSubmissions();
        });
    }

    return (
        <React.Fragment>
            <Header user={user} onClickLogin={() => setLoginModalOpen(true)} />
            <Viewport>
                <Spin size='large' spinning={loading}>
                    <Body
                        onCreateSubmission={createSubmission}
                        onLoadMoreSubmissions={loadMoreSubmissions}
                        submissions={submissions}
                        user={user}
                        onUpdateSubmissions = {updateSubmissions}
                    />
                    <Login onFinish={logIn} setVisible={setLoginModalOpen} visible={loginModalOpen}/>
                </Spin>
            </Viewport>
        </React.Fragment>
    );
}

export default App;
