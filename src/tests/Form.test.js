import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

test('Form validation', () => {
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(<Form onSubmit={onSubmit} />);

  fireEvent.click(getByText('Save'));

  expect(onSubmit).not.toHaveBeenCalled();

  // Fill the form with valid data
  fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
  fireEvent.change(getByLabelText('Email'), { target: { value: 'john@example.com' } });

  // Trigger form submission again
  fireEvent.click(getByText('Save'));

  // Check if the onSubmit function is called with the correct data
  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
  });
});