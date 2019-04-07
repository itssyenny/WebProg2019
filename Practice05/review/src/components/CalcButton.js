import React from 'react';
import PropTypes from 'prop-types';


function showNotImplemented() {
  console.warn('This function is not implemented yet.');
}

const CalcButton = (props) => {
  const { className, children, onClick, num } = props;
  const extraClass = className || '';
  let handleOnClick = () => {onClick(num)}
  return (
    <button
      className={`calc-btn ${extraClass}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};


CalcButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CalcButton.defaultProps = {
  onClick: showNotImplemented,
};

export default CalcButton;
