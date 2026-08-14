interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
  }
  
  interface BreadcrumbProps {
    items: BreadcrumbItem[];
  }
  
  export const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-4 overflow-x-auto whitespace-nowrap py-1">
        <button
          onClick={() => {
            window.location.hash = '#/';
          }}
          className="hover:text-amber-800 transition cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span>🏠</span>
          <span>ホーム</span>
        </button>
  
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
  
          return (
            <div key={index} className="flex items-center gap-2 shrink-0">
              <span className="text-slate-300">/</span>
              {isLast || !item.onClick ? (
                <span className="text-amber-900 font-black">{item.label}</span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-amber-800 transition cursor-pointer"
                >
                  {item.label}
                </button>
              )}
            </div>
          );
        })}
      </nav>
    );
  };