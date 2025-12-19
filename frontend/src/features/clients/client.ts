export interface Client {
  id: string;
  nickname: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  note: string;
  // appointmentIds: number[];
}

export const DEFAULT_CLIENT: Client = {
  id: "",
  nickname: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  note: "",
  // appointmentIds: [],
};
