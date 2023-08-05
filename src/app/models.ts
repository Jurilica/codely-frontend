export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'right' | 'left' | 'center';
}