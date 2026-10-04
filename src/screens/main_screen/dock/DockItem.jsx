const DockItem = ({ name, icon, isOpen, onClick }) => {
    return (
        <button
            type="button"
            className={`dock-item${isOpen ? ' open' : ''}`}
            onClick={onClick}
            aria-label={isOpen ? `${name} (open)` : name}
        >
            <span className="dock-item-label">{name}</span>
            <img src={icon} alt="" draggable="false" />
            <span className="dock-item-indicator" aria-hidden="true"></span>
        </button>
    );
};

export default DockItem;
