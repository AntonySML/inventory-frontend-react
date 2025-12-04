import z from "zod";

export const schemaProduct = z
  .object({
    name: z.string("Debe ingresar una cadena de texto").min(1, "El nombre del producto es obligatorio"),
    description: z.string("Debe ingresar una cadena de texto").optional(),
    price: z.string("Debe ingresar un valor numerico").refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "El precio debe ser un número no negativo",
    }),
    quantity: z.string("Debe ingresar un valor numerico").refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
      message: "La cantidad debe ser un número entero no negativo",
    }),
  });

export type ProductFormValues = z.infer<typeof schemaProduct>;