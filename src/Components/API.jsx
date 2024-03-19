import axios from "axios";
import { getHeadersAndParams } from "./Utils";
import { DataContext } from "./DataProvider";
import { useContext } from "react";

export const getData = async (
  formData,
  jsonText,
  paramData,
  headerData,
  /*tableData, checkBoxData,*/ formBody,
  urlEncoded
) => {
  const apiType = formData.type.toLowerCase();
  const apiURl = formData.url;
  const apiHeaders = getHeadersAndParams(headerData);
  const apiParams = getHeadersAndParams(paramData);
  const apiFormBody = getHeadersAndParams(formBody);
  const apiUrlEncoded = getHeadersAndParams(urlEncoded);
  //if(checkBoxData&&(tableData.key&&tableData.value)){
  //    apiURl=`${apiURl}?${tableData.key}=${tableData.value}`;
  //}
  // console.log(apiType, apiURl, apiHeaders, apiParams, apiUrlEncoded, apiFormBody);

  try {
    return await axios({
      method: apiType,
      url: apiURl,
      body: jsonText,
      headers: apiHeaders,
      params: apiParams,
      formData: apiFormBody,
      dataUrlEncoded: apiUrlEncoded,
    });
  } catch (error) {
    console.log("Error while calling getData API", error);
    return error;
  }
};
