export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export type Users = User[];

export type PageInfo = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};
