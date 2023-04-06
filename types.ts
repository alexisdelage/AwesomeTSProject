export interface Book {
  title: string;
  key: string;
  author_name?: string[];
}

export interface Page<T> {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: T[];
  num_found: number;
  q: string;
  offset: number | null;
}
