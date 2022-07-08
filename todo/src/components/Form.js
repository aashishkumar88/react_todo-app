import React from 'react'

const Form = ({ handleSubmit, data, setData }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control"
            aria-label="Username"
            value={data}
            aria-describedby="addon-wrapping"
            onChange={setData}
          />
        </div>
        <button type="submit" className="btn btn-light my-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;