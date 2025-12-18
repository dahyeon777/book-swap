interface SearchProps {
  onSearch: (query: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export default function SidebarSearch({ onSearch, onFocus, onBlur }: SearchProps) {
  return (
    <div className="p-4 flex gap-2">
      <input
        type="text"
        placeholder="| 검색"
        className="flex-1 p-2 border-none outline-none bg-white text-sm"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => onSearch(e.target.value)} // 입력할 때마다 실시간 검색
      />
      <button className="w-9 h-9 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 text-xl text-gray-600 shadow-sm">
        +
      </button>
    </div>
  );
}