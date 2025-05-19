type AlertProps = {
  title: string;
  description?: string;
  type: string;
  location: string;
  date: string;
};

export default function AlertCard({ title, description, type, location, date }: AlertProps) {
  const typeColor = {
    Flood: 'bg-blue-100 text-blue-700',
    Fire: 'bg-red-100 text-red-700',
    Health: 'bg-green-100 text-green-700',
    Other: 'bg-gray-100 text-gray-700',
  }[type] || 'bg-gray-100 text-gray-700';

  return (
    <div className={`rounded-xl p-4 shadow-sm border ${typeColor} mb-4`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <div className="flex justify-between text-xs mt-2">
        <span>{location}</span>
        <span>{new Date(date).toLocaleString()}</span>
      </div>
    </div>
  );
}
