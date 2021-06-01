export interface MovieItemProps {
    url: string;
    title: string
}

export interface APIData {
    public_id: string;
    [key:string] : any
}

export interface BodyProps {
    data: APIData[]
}

export type MovieId = number | string | null | string[]