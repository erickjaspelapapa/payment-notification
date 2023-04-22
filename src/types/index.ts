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
  totalContractPrice: number | string | undefined;
  dateStartMonthlyPay: Date;
  monthsToPay: number;
  transferFee: number;
  transTypeId: number;
  agentId: number;
  projGrpId: number;
  agent?: agents;
  transType?: transferTypes;
  projGroup?: projectGroups;
  id: number;
  created_dt: Date;
  updated_dt: Date;
};

export const paymentTypes: Record<string, string> = {
  Downpayment: "Downpayment",
  Reservation: "Reservation",
  MonthlyPayment: "Monthly Payment",
  AgentCommission: "Agent's Commission",
  NotarialFee: "Notarial Fee",
  Promo: "Promo",
  TransferFee: "Transfer Fee",
};

export type payment = {
  clientId: number;
  clientNumber: string;
  clientName: string;
  transId: number;
  downpayment: number;
  reservation: number;
  monthlyPayment: number;
  agentCommission: number;
  notarialFee: number;
  promo: number;
  transferFee: number;
  paymentDate: Date;
  remarks: string;
  agentId: number;
  id: number;
  created_dt: Date;
  updated_dt: Date;
};

export type paymentPayload = {
  id?: number;
  created_dt?: Date;
  updated_dt?: Date;
  transId?: number;
  paymentDate?: Date;
  remarks?: string;
  clientId?: number;
  agentId?: number;
  lines?: paymentLine[];
};

export type paymentLine = {
  id: number;
  created_dt: Date;
  updated_dt: Date;
  transId: number;
  paymentType: string;
  amount: number;
};
