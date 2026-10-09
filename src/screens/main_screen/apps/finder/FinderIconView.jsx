// Vista de iconos: rejilla con el nombre debajo. Clic selecciona, doble clic abre.
const FinderIconView = ({ items, selectedId, getOptionId, onSelect, onOpen }) => (
    <ul className="finder-icons" role="presentation">
        {items.map((item) => (
            <li
                key={item.id}
                id={getOptionId(item.id)}
                role="option"
                aria-selected={item.id === selectedId}
                className="finder-icon-item"
                title={item.title}
                onClick={(event) => { event.stopPropagation(); onSelect(item.id); }}
                onDoubleClick={() => onOpen(item)}
            >
                <span className="finder-icon-image">
                    <img src={item.icon} alt="" draggable="false" />
                </span>
                <span className="finder-icon-name">{item.name}</span>
            </li>
        ))}
    </ul>
);

export default FinderIconView;
