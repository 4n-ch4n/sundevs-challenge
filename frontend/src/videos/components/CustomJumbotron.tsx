interface Props {
  title: string;
  subtitle?: string;
}

export const CustomJumbotron = ({ title, subtitle }: Props) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-2 text-balance">
        {title}
      </h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </section>
  );
};
