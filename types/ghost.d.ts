declare module '@tryghost/content-api' {
  export interface Post {
    id: string;
    title: string;
    slug: string;
    html?: string;
    excerpt?: string;
    feature_image?: string;
    published_at?: string;
    updated_at?: string;
    meta_description?: string;
    tags?: Tag[];
    authors?: Author[];
    custom_excerpt?: string;
    codeinjection_head?: string;
    codeinjection_foot?: string;
  }

  export interface Tag {
    id: string;
    name: string;
    slug: string;
  }

  export interface Author {
    id: string;
    name: string;
    slug: string;
  }

  export interface GhostContentAPI {
    posts: {
      browse(options?: { include?: string[]; limit?: string | number }): Promise<Post[]>;
      read(data: { slug: string }, options?: { include?: string[] }): Promise<Post>;
    };
  }

  export default class GhostContentAPI {
    constructor(config: {
      url: string;
      key: string;
      version: string;
    });
    posts: {
      browse(options?: { include?: string[]; limit?: string | number }): Promise<Post[]>;
      read(data: { slug: string }, options?: { include?: string[] }): Promise<Post>;
    };
  }
}

