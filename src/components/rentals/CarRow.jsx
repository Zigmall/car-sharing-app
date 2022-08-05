import React from 'react';
import PropTypes from 'prop-types';

const CarRow = ({ car: { model, id, year } }) => {
  return (
    <>
      <tr>
        <td>{model}</td>
        <td>{id}</td>
        <td>{year}</td>
        {/* <td>{car.borrowed ? 'Yes' : 'No'}</td> */}
        {/* <td>
          <button
            onClick={handleEdit}
            className={[style.button__wrapper, style.button__edit].join(' ')}>
            Edit User
          </button>
        </td>
        <td>
          <button
            onClick={handleDelete}
            className={[style.button__wrapper, style.button__delete].join(' ')}>
            Delete User
          </button>
        </td> */}
      </tr>
    </>
  );
};

CarRow.propTypes = {
  car: PropTypes.object,
  model: PropTypes.string,
  id: PropTypes.string,
  year: PropTypes.number
};

export default CarRow;
