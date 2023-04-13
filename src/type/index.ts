import { StaticImageData } from "next/image";

export interface bookData {
  isNew: boolean;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  recommendCount: number;
}
