export interface FileItem {
  id: number;
  fileName: string;
  fileSize: number;
  fileLink: string;
  created_at: string;
}

export interface FolderItem {
  id: number;
  name: string;
  description?: string | null;
  created_at: string;
  Files?: FileItem[];
}
