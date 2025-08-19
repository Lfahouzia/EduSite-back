declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: {
        role: string;
        name: string
        description: string;
      }[];
        permissions?: {
            id: string;
            name: string;
            description: string;
        }[];
    };
  }
}
