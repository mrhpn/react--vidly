import React from 'react';

class ListGroup extends React.Component {
  render() {
    const { items, textProperty, valueProperty, selected, onSelect } = this.props;

    return (
      <ul className="list-group" style={{ cursor: 'pointer' }}>
        {items.map((item) => (
          <li key={item[valueProperty]} onClick={() => onSelect(item)} className={`list-group-item ${selected.name === item.name && 'active'}`}>
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default ListGroup;
