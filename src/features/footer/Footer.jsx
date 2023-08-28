import ColorFilters from "./ColorFilters";
import StatusFilter from "./StatusFilter";
import Actions from "./Actions";
import RemainingTodos from "./RemainingTodos";

export default function Footer() {
  return (
    <footer className="footer">
      <Actions />
      <RemainingTodos />
      <StatusFilter />
      <ColorFilters />
    </footer>
  );
}
