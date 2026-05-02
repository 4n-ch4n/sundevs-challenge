import { Flame } from 'lucide-react';

export const CustomHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Cartelera de Hype
              </h1>
              <p className="text-xs text-muted-foreground">
                Tu dashboard de conocimiento tech
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
