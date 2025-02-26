export type Course = {
  id: string
  name: string
  description: string
  paymentType: "None" | "Subscription" | "OneTime"
  createdAt: string
  updatedAt: string
}

export interface Class {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  classes: Class[];
} 