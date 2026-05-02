import { Spinner } from '../ui/spinner';

export const CustomLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Spinner className="w-12 h-12 text-primary" />
      <p className="text-muted-foreground text-sm animate-pulse">Cargando...</p>
    </div>
  );
};
