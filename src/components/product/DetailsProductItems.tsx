interface DetailsSectionProps {
  title: string;
  items: string[];
}

export function DetailsProductItems({
  title,
  items = [],
}: DetailsSectionProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="space-y-4 w-3/4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="list-none space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex text-[#464646]">
            <span className="mr-2">•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
