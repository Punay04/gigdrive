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
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-red-300">Create Folder</DialogTitle>
          <DialogDescription className="text-white">
            Create a new folder in the current directory
          </DialogDescription>
        </DialogHeader>
        <FolderForm />
      </DialogContent>
    </Dialog>
  );
};

export default FolderDialog;
