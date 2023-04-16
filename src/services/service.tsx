import { agents, projectGroups, transferTypes } from "../types";
import axiosInstance from "./axios-instance";

const getAgents = async () => {
  const resp = await axiosInstance.get<agents>("/Agent/AgentList");

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

const getProjectGroups = async () => {
  const resp = await axiosInstance.get<projectGroups>(
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
  const resp = await axiosInstance.get<transferTypes>(
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

const getClients = async () => {
  const resp = await axiosInstance.get("/Client/ClientList");

  return resp;
};

export default {
  getAgents,
  addAgents,
  updateAgents,
  deleteAgents,
  getProjectGroups,
  addProjectGroups,
  updateProjectGroups,
  deleteProjectGroups,
  getTransferTypes,
  addTransType,
  updateTransType,
  deleteTransType,
  getClients,
};
