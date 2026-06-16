export default function PageHeader({
  title,
  breadcrumb,
  actionLabel,
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-gray-200">
          {breadcrumb.join(" / ")}
        </p>

        <h1 className="text-3xl font-bold text-white mt-1">
          {title}
        </h1>
      </div>
    </div>
  );
}