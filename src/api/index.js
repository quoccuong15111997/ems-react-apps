import axios from "axios";
import { baseUrl } from "../constants";

const api = (token) =>
  axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      TOKEN: token,
    },
  });

export default api;

const API = axios.create({ baseURL: baseUrl });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("usertoken")) {
    req.headers["TOKEN"] = localStorage.getItem("usertoken");
  }

  return req;
});

const urlListDocuments = "/Api/data/runApi_Data?run_Code=DTA003";
const urlDetailDocument = "/Api/data/runApi_Data?run_Code=DTA005";
const urlDeleteDocument = "/Api/data/runApi_Data?run_Code=DTA009";
const urlLockDocument = "/Api/data/runApi_Data?run_Code=DTA015";
const urlPostDocument = "/Api/data/runApi_Data?run_Code=DTA007";
const urlUpdateDocument = "/Api/data/runApi_Data?run_Code=DTA008";
const urlApprovalProcess = "Api/data/runApi_data?run_Code=DTA013";
const urlReviewProcess = "Api/data/runApi_data?run_Code=DTA017";
const urlCommonList = "/Api/data/runApi_Data?run_Code=DTA002";
const urlCommonFuncList = "/Api/data/runApi_Data?run_Code=DTA018";
const urlCommonData = "/Api/data/runApi_Data?run_Code=DTA004";
const urlCommonDcmn = "/Api/data/runApi_Data?run_Code=DTA017";

export const fetchListDocuments = (body) => API.post(urlListDocuments, body); 
export const fetchDetailDocument = (body) => API.post(urlDetailDocument, body); 
export const deleteDocument = (body) => API.post(urlDeleteDocument, body); 
export const lockDocument = (body) => API.post(urlLockDocument, body); 
export const postDocument = (body) => API.post(urlPostDocument, body); 
export const updateDocument = (body) => API.post(urlUpdateDocument, body); 

export const fetchApprovalProcess = (body) => API.post(urlApprovalProcess, body); 
export const fetchReviewProcess = (body) => API.post(urlReviewProcess, body); 

export const fetchCommonList = (body) => API.post(urlCommonList, body); 
export const fetchCommonFuncList = (body) => API.post(urlCommonFuncList, body); 
export const fetchCommonData = (body) => API.post(urlCommonData, body);

export const fetchCommonDcmn = (body) => API.post(urlCommonDcmn, body); 
