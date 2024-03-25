import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/AlertDialog";
import { FC } from "react";

interface AlertDialogSimpleProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  contentBottom?: React.ReactNode;
}

export const AlertDialogSimple: FC<AlertDialogSimpleProps> = ({
  title = "Atenção",
  description,
  children,
  onConfirm,
  contentBottom,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {contentBottom}
          {!contentBottom && (
            <>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>
                Confirmar
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
