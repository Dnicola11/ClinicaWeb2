import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre debe tener al menos 1 caracter."),
  color: z.string().min(1, "Un color debe ser seleccionado."),
  duration: z.number().min(1, "La duración por defecto es requerida."),
});
