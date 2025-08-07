interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FolderForm from "./folder-form";

const FolderDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-neutral-900/90 via-neutral-800/80 to-neutral-900/90 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-red-300 tracking-tight">
            Create Folder
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new folder in the current directory
          </DialogDescription>
        </DialogHeader>
        <FolderForm />
      </DialogContent>
    </Dialog>
  );
};

export default FolderDialog;
