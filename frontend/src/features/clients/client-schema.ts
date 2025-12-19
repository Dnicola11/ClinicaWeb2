import { toast } from "react-toastify";
import { z } from "zod";

export const ClientSchema = z
  .object({
    id: z.number(),
    nickname: z.string().min(2, "El nombre de usuario debe tener al menos 2 caracteres.").optional().or(z.literal("")),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().min(1, "El número de teléfono es requerido.").optional().or(z.literal("")),
    note: z.string().optional(),
    email: z.string().optional(),
  })
  .partial()
  .refine((data) => {
    if (data.nickname === "" && data.phoneNumber === "") {
      toast.warn("El nombre de usuario o número de teléfono es requerido.");
      return false;
    }
    return true;
  });
