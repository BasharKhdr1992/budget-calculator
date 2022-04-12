import React from 'react';
import { MdSend, MdClear } from 'react-icons/md';

export const ExpenseForm = ({
  charge,
  amount,
  edit,
  handleAmount,
  handleCharge,
  handleSubmit,
  onCancel,
}) => {
  const RenderCancel = ({ onCancel }) => {
    return (
      <button
        type="button"
        style={{ backgroundColor: 'lightblue' }}
        onClick={() => onCancel()}
        className="btn"
      >
        cancel <MdClear className="btn-icon" />
      </button>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            value={charge}
            onChange={handleCharge}
            placeholder="e.g. rent"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">charge</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmount}
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 4000"
          />
        </div>
      </div>
      <div className="btn-collections">
        <div className="btn-container btn-end">
          <button type="submit" className="btn">
            {edit ? 'edit' : 'submit'} <MdSend className="btn-icon" />
          </button>
        </div>
        <div className="btn-container btn-start">
          {edit && <RenderCancel onCancel={onCancel} />}
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
