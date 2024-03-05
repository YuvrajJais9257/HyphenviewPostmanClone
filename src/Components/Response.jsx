import React, { useState, useEffect } from 'react';
import './Response.css';
import { useContext } from 'react';
import { DataContext } from './DataProvider';


const Response=({data})=>{
    const { formData, jsonText, paramData, headerData, tableData, checkBoxData, formBody, urlEncoded, dataSource, authMethod, userName, pass,bearer, id, secret,token, refreshToken, scopeEntry } = useContext(DataContext);
    let obj = data;
    let readableObj = '{\n';

    const onSave=()=>{
        console.log(JSON.stringify(dataEntries, null, 2));
        console.log(data);
    }

    const dataEntries={
        "DataSource": dataSource,
        "RequestType":formData.type,
        "ApiURL":formData.url,
        ...(authMethod !== 'none' && { "AuthenticationType": authMethod }),
        ...(authMethod === 'Basic Auth' && {"Username":userName,"Password": pass}),
        ...(authMethod === 'Bearer Token' && {"bearerToken":bearer}),
        ...(authMethod === 'OAuth2.0' && {"clientId": id, "clientSecret": secret, "tokenUrl": token, "refreshTokenUrl":refreshToken, "scope": scopeEntry}),
        "InputJSON":jsonText
    };

    for (let [key, value] of Object.entries(obj)) {
        readableObj += ` ${typeof value === 'string' ? `'${value}'` : JSON.stringify(value)},\n`;
    }

    readableObj += '}';

    return(
        <>
        <div className='output-container params-container'>
      <label>Output</label>
      <div className='param-item'>
          <textarea
            placeholder=''
            readOnly
            className="textarea-no-list-style"
            value={readableObj}
            disabled
          ></textarea>
        </div>
        {obj && Object.keys(obj).length > 0 && (
                <div className="btn-save">
                    <button className='btn btn-success' onClick={onSave}>Save</button>
                </div>
            )}
    </div>
        </>
    )
}

export default Response;
