import * as z from 'zod';

export const serverFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
});

export type ServerForm = z.infer<typeof serverFormSchema>;
