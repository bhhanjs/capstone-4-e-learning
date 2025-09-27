import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

type SuccessModalProp = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SuccessModal({ open, onOpenChange }: SuccessModalProp) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-sm rounded-2xl flex flex-col items-center justify-center space-y-4 py-8"
      >
        <CheckCircle className="w-16 h-16 text-green-500" />
        <DialogHeader>
          <DialogTitle className="text-green-600 text-xl font-semibold text-center">
            Thêm thành công
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
