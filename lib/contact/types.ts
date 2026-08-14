export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  product: string | null;
  createdAt: number | null;
  read: boolean;
};

export type NewContactSubmission = {
  name: string;
  email: string;
  message: string;
  product?: string | null;
};
