export interface Service {
  id: string;
  name: string;
  color: string;
  duration: number;
}

export const DEFAULT_SERVICE: Service = {
  id: "",
  name: "",
  color: "",
  duration: 60,
};
