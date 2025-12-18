import SidebarList from "./SidebarList";

export default function Sidebar() {
  return (
    <aside className="w-100 bg-[#ededed] flex flex-col border-r h-full">
      <div className="p-4">
        <input
          type="text"
          placeholder="| 검색"
          className="w-full p-2 border-none outline-none bg-white"
        />
      </div>
      <SidebarList></SidebarList>
    </aside>
  );
}
