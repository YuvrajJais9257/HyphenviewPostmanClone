import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { DataContext } from './DataProvider';
import './Table.css';

const AddRowComponent = ({ addRows, rowId, data, setData }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [rows, setRows] = useState([0]);
    const {tableData, setTableData, checkBoxData, setCheckBoxData}=useContext(DataContext);
    
    const handleCheck = () => {
        setIsChecked(!isChecked)
        setCheckBoxData(!checkBoxData);
    };
    
    const onKeyChange=(e)=>{
        setTableData({ ...tableData, key: e.target.value });
        updateData(e.target.value, 'key');
    }

    const onTextChange = (e) => {
        setTableData({ ...tableData, value: e.target.value });
        updateData(e.target.value, 'value');
    };

    const updateData = (newValue, type) => {
        if (checkBoxData&&newValue.trim() !== '') {
            const result = data.filter(entry => entry.id === rowId)[0];
            const updatedResult = { ...result, id: rowId, [type]: newValue };
            let index = data.findIndex(value => value.id === rowId);
            if (index === -1) {
                setData(oldArr => [...oldArr, updatedResult]);
                addRows(oldArr => [...oldArr, rowId]); 
            } else {
                const newArr = [...data];
                newArr[index] = updatedResult;
                setData(newArr);
            }
        }
    };

    return (
        <tr>
            <td><Form.Check type="checkbox" checked={isChecked} onChange={handleCheck} name={rowId} /></td>
            <td ><input type='text' placeholder='Key' name='key' value={tableData.key} onChange={(e) => onKeyChange(e)} /></td>
            <td ><input type='text' placeholder='Value' name='value' value={tableData.value} onChange={(e) => onTextChange(e)} /></td>
        </tr>
    );
};

export default AddRowComponent;