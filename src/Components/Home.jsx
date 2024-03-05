import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react';
import '../Components/Home.css';
import FormComponent from './Forms';
import TabComponent from './Tabs';
import Response from './Response';
import ErrorScreen from './ErrorScreen';
import { useContext } from 'react';
import { DataContext } from './DataProvider';
import { checkParams } from './Utils';
import SnackBarComponent from './SnackBar';
import {getData} from './API';
const Home = () => {
    const { formData, jsonText, paramData, headerData, tableData, checkBoxData, formBody, urlEncoded, dataSource, authMethod, userName, pass,bearer, id, secret,token, refreshToken, scopeEntry } = useContext(DataContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorResponse, setErrorResponse] = useState(false);
    const [apiResponse, setApiResponse] = useState({});

    
    

    const onSendClick = async () => {
        if (!checkParams(formData, jsonText, paramData, headerData, formBody, urlEncoded, setErrorMessage)) {
            setError(true);
            return false;
        }
        let response = await getData(formData, jsonText, paramData, headerData, tableData, formBody, urlEncoded, checkBoxData);
        if (response === 'error') {
            setErrorResponse(true);
            return;
        }
        setErrorResponse(false);
        setApiResponse(response.data);
        }
    

    return (
        <div className='home'>
            <FormComponent onSendClick={onSendClick} />
            <TabComponent />
            {errorResponse ? <ErrorScreen /> : <Response data={apiResponse} />}
            {error && <SnackBarComponent error={error} setError={setError} errorMessage={errorMessage} />}
        </div>
    );
}

export default Home;
