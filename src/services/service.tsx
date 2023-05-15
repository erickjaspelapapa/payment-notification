import { format } from "date-fns";
import {
  Category,
  DailySummary,
  DailySummaryPayload,
  Identification,
  TransPayload,
  Transaction,
  agents,
  clients,
  payment,
  paymentPayload,
  paymentRecords,
  projectGroups,
  projectedPayment,
  transferTypes,
} from "../types";
import axiosInstance from "./axios-instance";

const getAgents = async () => {
  const resp = await axiosInstance.get<agents[]>("/Agent/AgentList");

  return resp;
};

const addAgents = async (payload: agents) => {
  const resp = await axiosInstance.post("/Agent/InsertAgent", payload);

  return resp;
};

const updateAgents = async (payload: agents) => {
  const resp = await axiosInstance.put("/Agent/UpdateAgent", payload);

  return resp;
};

const deleteAgents = async (id: number) => {
  const resp = await axiosInstance.delete(`/Agent/DeleteAgent?AgentId=${id}`);

  return resp;
};

const getCategory = async () => {
  const resp = await axiosInstance.get<Category[]>("/Category/getCategories");

  return resp;
};

const getIdentification = async () => {
  const resp = await axiosInstance.get<Identification[]>(
    "/Category/getIdentification"
  );

  return resp;
};

const addCategory = async (payload: Category) => {
  const resp = await axiosInstance.post("/Category/insertCategory", payload);

  return resp;
};

const updateCategory = async (payload: Category) => {
  const resp = await axiosInstance.put("/Category/updateCategory", payload);

  return resp;
};

const deleteCategory = async (id: number) => {
  const resp = await axiosInstance.delete(`/Category/deleteCategory?id=${id}`);

  return resp;
};

const getProjectGroups = async () => {
  const resp = await axiosInstance.get<projectGroups[]>(
    "/ProjGroup/PrjGroupList"
  );

  return resp;
};

const addProjectGroups = async (payload: projectGroups) => {
  const resp = await axiosInstance.post("/ProjGroup/InsertPrjGroup", payload);

  return resp;
};

const updateProjectGroups = async (payload: projectGroups) => {
  const resp = await axiosInstance.put("/ProjGroup/UpdatePrjGroup", payload);

  return resp;
};

const deleteProjectGroups = async (id: number) => {
  const resp = await axiosInstance.delete(
    `/ProjGroup/DeletePrjGroup?PrjGroupId=${id}`
  );

  return resp;
};

const getTransferTypes = async () => {
  const resp = await axiosInstance.get<transferTypes[]>(
    "/TransType/TransTypeList"
  );

  return resp;
};

const addTransType = async (payload: transferTypes) => {
  const resp = await axiosInstance.post("/TransType/InsertTransType", payload);

  return resp;
};

const updateTransType = async (payload: transferTypes) => {
  const resp = await axiosInstance.put("/TransType/UpdateTransType", payload);

  return resp;
};

const deleteTransType = async (id: number) => {
  const resp = await axiosInstance.delete(
    `/TransType/DeleteTransType?TransTypeId=${id}`
  );

  return resp;
};

const getClientsById = async (id?: string) => {
  const resp = await axiosInstance.get(`/Client/ClientById?clientId=${id}`);

  return resp;
};

const getClients = async () => {
  const resp = await axiosInstance.get<clients[]>("/Client/ClientList");

  return resp;
};

const addClient = async (payload: clients) => {
  const resp = await axiosInstance.post("/Client/InsertClient", payload);

  return resp;
};

const addPayment = async (payload: paymentPayload) => {
  const resp = await axiosInstance.post("/Payment/insertTransaction", payload);

  return resp;
};

const updatePayment = async (payload: paymentPayload) => {
  const resp = await axiosInstance.put("/Payment/updatePayment", payload);

  return resp;
};

const getPaymentsList = async (clientId?: string) => {
  const resp = await axiosInstance.get<payment[]>(
    `/Payment/getPaymentsList?clientId=${clientId}`
  );

  return resp;
};

const getClientPayment = async (transId?: number) => {
  const resp = await axiosInstance.get<paymentPayload>(
    `/Payment/getTransaction?transId=${transId}`
  );

  return resp;
};

const getPaymentRecords = async () => {
  const resp = await axiosInstance.get<paymentRecords[]>(
    "/Payment/getPaymentRecords"
  );

  return resp;
};

const getPaymentRecordsById = async (clientid?: string) => {
  const resp = await axiosInstance.get<paymentRecords>(
    `/Payment/getPaymentRecordsById?clientId=${clientid}`
  );

  return resp;
};

const getProjectedPayments = async (id: string) => {
  const resp = await axiosInstance.get<projectedPayment[]>(
    `Payment/getProjected?id=${id}`
  );

  return resp;
};

const getDailySummary = async (payload: DailySummaryPayload) => {
  const resp = await axiosInstance.get<DailySummary[]>(
    `/Transaction/getDailySummary?FromDate=${format(
      payload.fromDate,
      "yyyy-MM-dd"
    )}&ToDate=${format(payload.toDate, "yyyy-MM-dd")}`
  );
  console.log(resp.data);

  return resp.data[0];
};

const getTransaction = async () => {
  const resp = await axiosInstance.get<Transaction[]>(
    "/Transaction/getTransactions"
  );

  return resp;
};

const addTransaction = async (payload: TransPayload) => {
  const resp = await axiosInstance.post(
    "/Transaction/InsertTransaction",
    payload
  );

  return resp;
};

const updateTransaction = async (payload: TransPayload) => {
  const resp = await axiosInstance.put(
    "/Transaction/UpdateTransaction",
    payload
  );

  return resp;
};

const deleteTransaction = async (id: number) => {
  const resp = await axiosInstance.delete(
    `/Transaction/DeleteTransaction?TransId=${id}`
  );

  return resp;
};

export default {
  getAgents,
  addAgents,
  updateAgents,
  deleteAgents,
  getCategory,
  getIdentification,
  addCategory,
  updateCategory,
  deleteCategory,
  getProjectGroups,
  addProjectGroups,
  updateProjectGroups,
  deleteProjectGroups,
  getTransferTypes,
  addTransType,
  updateTransType,
  deleteTransType,
  getClients,
  addClient,
  getClientsById,
  addPayment,
  updatePayment,
  getPaymentsList,
  getClientPayment,
  getPaymentRecords,
  getPaymentRecordsById,
  getProjectedPayments,
  getTransaction,
  getDailySummary,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
