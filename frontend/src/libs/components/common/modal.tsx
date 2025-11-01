import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/libs/components/ui/dialog";
import { Button } from "@/libs/components/ui/button";

interface ReusableModalProps {
  // Trigger props
  trigger?: ReactNode;
  triggerClassName?: string;

  // Dialog state
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Header props
  icon?: ReactNode;
  iconClassName?: string;
  title: string;
  description?: string;
  headerClassName?: string;

  // Content
  children: ReactNode;

  // Footer props
  showFooter?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  confirmClassName?: string;
  footerContent?: ReactNode;

  // Dialog props
  contentClassName?: string;
}

function ReusableModal({
  trigger,
  triggerClassName,
  open,
  onOpenChange,
  icon,
  iconClassName = "w-12 h-12 p-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600",
  title,
  description,
  headerClassName,
  children,
  showFooter = true,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onCancel,
  onConfirm,
  confirmDisabled = false,
  confirmClassName = "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
  footerContent,
  contentClassName = "sm:max-w-[500px]",
}: ReusableModalProps) {
  const dialogProps =
    open !== undefined && onOpenChange !== undefined
      ? { open, onOpenChange }
      : {};

  return (
    <Dialog {...dialogProps}>
      {trigger && (
        <DialogTrigger asChild>
          {typeof trigger === "string" ? (
            <Button className={triggerClassName}>{trigger}</Button>
          ) : (
            trigger
          )}
        </DialogTrigger>
      )}

      <DialogContent className={contentClassName}>
        <DialogHeader className={headerClassName}>
          {icon && (
            <div className="flex justify-center mb-4">
              <div className={iconClassName}>{icon}</div>
            </div>
          )}
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        {showFooter && (
          <DialogFooter>
            {footerContent ? (
              footerContent
            ) : (
              <>
                {onCancel && (
                  <Button variant="outline" onClick={onCancel}>
                    {cancelText}
                  </Button>
                )}
                {onConfirm && (
                  <Button
                    onClick={onConfirm}
                    disabled={confirmDisabled}
                    className={confirmClassName}
                  >
                    {confirmText}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ReusableModal;
