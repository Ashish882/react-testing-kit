import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';

describe('Form Component', () => {
  test('renders form with input fields and submit button', () => {
    const onSubmitMock = jest.fn();
    render(<Form onSubmit={onSubmitMock} />);

    // Check if form elements are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('submits form with correct data', () => {
    const onSubmitMock = jest.fn();
    render(<Form onSubmit={onSubmitMock} />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234567890' } });

    // Trigger form submission
    fireEvent.click(screen.getByText('Save'));

    // Check if the form submission function is called with the correct data
    expect(onSubmitMock).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
    });
  });
});