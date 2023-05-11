import { StaticImageData } from "next/image";

export interface bookData {
  id: number;
  isNew: boolean;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  recommendCount: number;
}
