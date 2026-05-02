import { AlertTriangle } from 'lucide-react';

export const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Error al cargar
        </h3>
        <p className="text-muted-foreground">
          Ha ocurrido un error al intentar cargar los datos. Por favor,
          inténtalo de nuevo más tarde.
        </p>
      </div>
    </div>
  );
};
