import React from 'react';

const Button = (props) => {
  const { buttonStyle } = styles;

  return (
    <div className="button-item Item" style={buttonStyle}>
      <button
        className="ui inverted button"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

const styles = {
  buttonStyle: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Button;
