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