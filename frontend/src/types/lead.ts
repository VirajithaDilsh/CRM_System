export type Lead = {
  _id: string;
  leadName: string;
  companyName: string;
  email: string;
  phone: string;
  leadSource: string;
  assignedSalesPerson: string;
  status: string;
  estimatedDealValue: number;

  notes?: {
    _id?: string;
    content: string;
   createdBy: {
      _id: string;
      name: string;
      email?: string;
    };
    createdAt: string;
  }[];

  createdAt: string;
  updatedAt: string;
};