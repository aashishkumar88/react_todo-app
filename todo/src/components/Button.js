import React from "react";

const Button = ({ buttonList, title }) => {
  return (
    <>
    
        <button 
          type="button"
          className="btn btn-light mx-2 mt-3"
          onClick={() => {
            buttonList({ type: title });  
          }}
        >
          {title}
        </button> 
    
    </>
  );
};

export default Button;
