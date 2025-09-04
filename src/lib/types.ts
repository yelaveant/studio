export type SearchResultFile = {
  name: string;
  type: 'XML' | 'CDR';
  path: string;
};

export type SearchState = {
  message?: string | null;
  files?: {
    xml: SearchResultFile | null;
    cdr: SearchResultFile | null;
  } | null;
  errors?: {
    ruc?: string[];
    documentType?: string[];
    voucherNumber?: string[];
  } | null;
};
