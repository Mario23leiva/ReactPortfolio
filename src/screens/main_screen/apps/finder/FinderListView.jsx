import { useI18n } from '../../../../i18n/I18nContext.js';

// Vista de lista: filas con nombre y tipo, rayado alterno como en el Finder
const FinderListView = ({ items, selectedId, getOptionId, onSelect, onOpen }) => {
    const { t } = useI18n();

    return (
        <div className="finder-list" role="presentation">
            <div className="finder-list-header" aria-hidden="true">
                <span>{t('files.columnName')}</span>
                <span>{t('files.columnKind')}</span>
            </div>
            <ul role="presentation">
                {items.map((item) => (
                    <li
                        key={item.id}
                        id={getOptionId(item.id)}
                        role="option"
                        aria-selected={item.id === selectedId}
                        className="finder-list-row"
                        title={item.title}
                        onClick={(event) => { event.stopPropagation(); onSelect(item.id); }}
                        onDoubleClick={() => onOpen(item)}
                    >
                        <span className="finder-list-name">
                            <img src={item.icon} alt="" draggable="false" />
                            <span>{item.name}</span>
                        </span>
                        <span className="finder-list-kind">{item.kind}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinderListView;
