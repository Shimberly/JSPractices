export default function TabButton({ children, onSelect, isSelected }) {
  //console.log(props);
  return (
    <li>
      <button className={isSelected ? "active" : ""} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
