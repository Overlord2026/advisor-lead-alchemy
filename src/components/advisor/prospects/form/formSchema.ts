
import { z } from "zod";

export const prospectSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().nullable(),
  phone: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  hnw_score: z.string().optional().nullable(),
  stage: z.string().default("Initial Contact").optional().nullable(),
  status: z.string().default("new").optional().nullable(),
  lead_source_id: z.string().uuid().optional().nullable(),
  metadata: z.record(z.any()).optional().default({}),
  next_meeting: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type ProspectFormValues = z.infer<typeof prospectSchema>;

export const defaultValues: ProspectFormValues = {
  first_name: "",
  last_name: "",
  email: null,
  phone: null,
  source: null,
  hnw_score: null,
  stage: "Initial Contact",
  status: "new",
  lead_source_id: null,
  metadata: {},
  next_meeting: null,
  notes: null,
};
