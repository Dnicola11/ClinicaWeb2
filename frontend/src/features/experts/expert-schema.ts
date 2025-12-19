import { z } from "zod";

export const ExpertSchema = z.object({
  id: z.string(),
  nickname: z.string().min(2, "El nombre de usuario debe tener al menos 2 caracteres."),
  color: z.string().min(1, "Un color debe ser seleccionado."),
});
