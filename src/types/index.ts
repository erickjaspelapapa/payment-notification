export type agents = {
  id: number;
  agentFirstName: string;
  agentLastName: string;
  created_dt: Date;
  updated_dt: Date;
};

export type projectGroups = {
  id: number;
  projGrpDescription: string;
  created_dt: Date;
  updated_dt: Date;
};

export type transferTypes = {
  id: number;
  transTypeDescription: string;
  created_dt: Date;
  updated_dt: Date;
};

export type clients = {
  clientId: string;
  clientName: string;
  clientContactNumber: string;
  bldgBlock: string;
  bldgLot: string;
  totalContractPrice: number;
  dateStartMonthlyPay: Date;
  transferFee: number;
  transTypeId: number;
  agentId: number;
  projGrpId: number;
  agent: agents;
  transType: transferTypes;
  projGroup: projectGroups;
  id: number;
  created_dt: Date;
  updated_dt: Date;
};
