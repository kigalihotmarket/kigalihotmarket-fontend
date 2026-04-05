export interface IReview {
  id: number;
  propertyId: number;
  count: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAgent {
  id: number;
  userId: number;
  description: string;
  experience: string;
  speciality: string[];
  whatsapp: string;
  joined: string;
  languages: string;
  about: string;
  createdAt: string;
  updatedAt: string;
}