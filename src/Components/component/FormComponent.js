import React from 'react';
import styled from 'styled-components';

const FormComponent = () => {
  return (
    <FormWrapper>
      {/* <h2>Checkout Form</h2> */}
      <form>
        <div className="form-group">
          <label>Total Price</label>
          <input type="text" value="Your Total Price" readOnly />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value="Your Name" readOnly />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email address" />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" placeholder="Enter your address" />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input type="text" placeholder="Enter your pincode" />
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" placeholder="Enter your state" />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" placeholder="Enter your city" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  h2 {
    text-align: center;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 600px;
    margin: 0 auto;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[readonly] {
    background-color: #f7f7f7;
  }

  button {
    grid-column: span 2;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export default FormComponent;
