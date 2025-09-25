export interface Categories {
    results:  number;
    metadata: Metadata;
    data:     category[];
}

export interface category {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}
