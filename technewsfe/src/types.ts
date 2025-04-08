export interface Article {
    id: string;
    title: string;
    description?: string;
    summary?: string;
    translation?: string;
    sourceUrl: string;
    publishedAt: Date;
    thumbnailUrl?: string;
    tags: string[];
}

export type User = {
    id: string
    email: string
    password?: string | null  // optional because of String?
    oauthId?: string | null  // optional because of String?
    createdAt: Date
    role: string
}
