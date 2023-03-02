import { StaticImageData } from "next/image";

export interface bookData {
  bookName: string;
  writer: string;
  category: string;
  like: number;
  img: StaticImageData;
}
