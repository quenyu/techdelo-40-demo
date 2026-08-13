import { z } from "zod";

export const requestSchema = z.object({
  task: z.string().min(2, "Выберите или опишите задачу"),
  address: z.string().min(4, "Укажите район или адрес объекта"),
  date: z.string().min(1, "Выберите дату"),
  details: z.string().max(800, "Не больше 800 символов").optional(),
  name: z.string().min(2, "Укажите имя"),
  phone: z
    .string()
    .regex(/^\+?[\d\s()\-]{10,20}$/, "Проверьте номер телефона"),
  consent: z.literal(true, {
    error: "Подтвердите согласие для демонстрации полного состояния формы",
  }),
});

export type RequestData = z.infer<typeof requestSchema>;
