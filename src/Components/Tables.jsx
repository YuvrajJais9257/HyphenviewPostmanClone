import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import AddRowComponent from './Rows';
import { useContext } from 'react';
import { DataContext } from './DataProvider';
import './Table.css';

function TableComponent({ text, data, setData, tableData, setTableData, checkboxData, setCheckBoxData }) {
  const [rows, addRows] = useState([0]);
  
  return (
    <div>
      <label>{text}</label>
      <table>
        <thead>
          <th></th>
          <th className='key'>Key</th>
          <th className='value'>Value</th>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <AddRowComponent
              addRows={addRows}
              rowId={index}
              key={index}
              data={data}
              setData={setData}
              tableData={tableData}
              setTableData={setTableData}
              checkboxData={checkboxData}
              setCheckBoxData={setCheckBoxData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;