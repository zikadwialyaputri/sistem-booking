export default function PageHeader({
  title,
  breadcrumb = [],
  actionLabel,
  onActionClick,
}) {
  return (
    <div className="flex items-center justify-between p-6 bg-transparent">
     
      {/* LEFT */}
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-white">
          {title}
        </span>


        <div className="flex items-center text-sm font-medium space-x-2 mt-2">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className={`${
                  index === breadcrumb.length - 1
                    ? "text-white font-semibold"
                    : "text-blue-100 opacity-80 hover:text-white cursor-pointer"
                }`}
              >
                {item}
              </span>


              {index < breadcrumb.length - 1 && (
                <span className="text-blue-100 opacity-50">/</span>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* RIGHT */}
      {actionLabel && (
        <div>
          <button
            onClick={onActionClick}
            className="bg-white text-blue-600 hover:bg-blue-50 transition-all font-bold px-6 py-2.5 rounded-lg shadow-lg flex items-center active:scale-95"
          >
            <span className="mr-2 text-xl">+</span>
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}