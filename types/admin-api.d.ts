declare module '@tryghost/admin-api' {
  export interface Post {
    id: string;
    title: string;
    slug: string;
    url: string;
    html?: string;
    [key: string]: any;
  }

  export interface GhostAdminAPI {
    posts: {
      browse(options?: { limit?: string | number }): Promise<Post[]>;
      add(data: any, options?: any): Promise<Post>;
      delete(data: { id: string }): Promise<void>;
    };
  }

  export default class GhostAdminAPI {
    constructor(config: {
      url: string;
      key: string;
      version: string;
    });
    posts: {
      browse(options?: { limit?: string | number }): Promise<Post[]>;
      add(data: any, options?: any): Promise<Post>;
      delete(data: { id: string }): Promise<void>;
    };
  }
}

