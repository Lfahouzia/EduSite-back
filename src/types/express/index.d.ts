declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      roles: {
        // le nom du champ doit être pluriel "roles"
        id: string;
        name: string;
        description: string;
        permissions?: {
          id: string;
          name: string;
          description: string;
        }[];
      }[];
    };
  }
}
