export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string|undefined ;
  creatorId: string; //عشان نعرف مين صاحب الكورس (COACH/ADMIN)
  createdAt: Date;
  updatedAt: Date;
}
