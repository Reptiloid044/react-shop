export interface Comment {
  id: number;
  productId: number;
  description: string;
  date: Date;
};

export interface InitialStateForComments {
  comments: Array<Comment>;
  loading: boolean;
  error: string;
};
