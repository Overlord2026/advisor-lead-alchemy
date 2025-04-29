
export interface Prospect {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initial?: string;
}

export interface Question {
  id: string;
  text: string;
  type: "text" | "multiple_choice" | "checkbox" | "date";
  options?: string[];
  required: boolean;
  section?: string;
}

export interface Questionnaire {
  id: string;
  name: string;
  type: string;
  description?: string;
  questions: Question[];
  completionPercentage: number;
  status: "draft" | "active" | "completed" | "archived" | "pending" | "in-progress";
  prospect?: Prospect;
  createdAt?: Date;
  updatedAt?: Date;
  sentDate?: string;
  dueDate?: string;
  duration?: string;
}
