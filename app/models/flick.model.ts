// app/models/flick.model.ts

export interface FlickModel {
  id: number;
  genre: string;
  title: string;
  image: string;
  url: string;
  description: string;
  details: {
    title: string;
    body: string;
  }[];
}
