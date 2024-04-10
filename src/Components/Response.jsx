import React, { useState, useEffect } from "react";
import "./Response.css";
import { useContext } from "react";
import { DataContext } from "./DataProvider";
import { useNavigate } from "react-router-dom";

const Response = ({ data }) => {
  const {
    formData,
    jsonText,
    paramData,
    headerData,
    tableData,
    checkBoxData,
    formBody,
    urlEncoded,
    dataSource,
    authMethod,
    userName,
    pass,
    bearer,
    id,
    secret,
    token,
    refreshToken,
    scopeEntry,
  } = useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(33);
  const navigate = useNavigate();

  let obj = data;
  let readableObj = "{\n";

  const onSave = () => {
    console.log(JSON.stringify(dataEntries, null, 2), "dataEntries");
    console.log(data, "data");
    const currentPageData = Object.fromEntries(currentItems);
    const queryString = encodeURIComponent(JSON.stringify(currentPageData));

    // Use useNavigate hook for navigation

    navigate(`/json-to-ui?jsonData=${queryString}`);
  };

  const dataEntries = {
    DataSource: dataSource,
    RequestType: formData.type,
    ApiURL: formData.url,
    ...(authMethod !== "none" && { AuthenticationType: authMethod }),
    ...(authMethod === "Basic Auth" && { Username: userName, Password: pass }),
    ...(authMethod === "Bearer Token" && { bearerToken: bearer }),
    ...(authMethod === "OAuth2.0" && {
      clientId: id,
      clientSecret: secret,
      tokenUrl: token,
      refreshTokenUrl: refreshToken,
      scope: scopeEntry,
    }),
    InputJSON: jsonText,
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Object.entries(obj).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  for (let [key, value] of currentItems) {
    readableObj += ` ${
      typeof value === "string" ? `'${value}'` : JSON.stringify(value)
    },\n`;
  }

  readableObj += "}";
  const totalPages = Math.ceil(Object.keys(obj).length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="output-container params-container">
        <label>Output</label>
        <div className="param-item">
          <textarea
            placeholder=""
            readOnly
            className="textarea-no-list-style"
            value={readableObj}
            disabled
          ></textarea>
        </div>
        {obj && Object.keys(obj).length > 0 && (
          <>
            <div className="pagination">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  id="page"
                  onClick={() => handlePageChange(number)}
                  className={currentPage === number ? "active" : ""}
                >
                  <span className="btn-text">{number}</span>
                </button>
              ))}
            </div>
            <div className="btn-save">
              <button className="btn btn-success" onClick={onSave}>
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Response;
