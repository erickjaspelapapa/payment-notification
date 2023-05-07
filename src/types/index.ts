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

export type paymentRecords = {
  id: number;
  forProcessing: boolean;
  clientId: string;
  client: string;
  latestPayment: Date;
  firstMonthlyPay: Date;
  firstMonthlyPayFormatted: string;
  totalContractPrice: number;
  projectedMonPaymentAmt: number;
  monthsToPay: number;
  monthsPayLeft: number;
  agent: string;
  downpayment: number;
  downpaymentPerc: number;
  reservation: number;
  monthlyPayment: number;
  agentCommission: number;
  agentCommsPerc: number;
  notarialFee: number;
  promo: number;
  transferFee: number;
  totalBalance: number;
  totalPaid: number;
  transferFeePaid: number;
  created_dt: Date;
  updated_dt: Date;
};

export type projectedPayment = {
  clientId: string;
  monthPay: number;
  yearPay: number;
  amount: number;
  id: number;
  created_dt: Date;
  updated_dt: Date;
};

export type Category = {
  id: number;
  created_dt: Date;
  updated_dt: Date;
  catDescription: string;
  identifications: Identification[];
};

export type Identification = {
  id?: number;
  created_dt?: Date;
  updated_dt?: Date;
  idenDescription?: string;
  catId?: number;
};
