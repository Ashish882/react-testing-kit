import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

describe('Form Validation', () => {
  test('should display validation error messages for empty fields', () => {
    const onSubmitMock = jest.fn();
    render(<Form onSubmit={onSubmitMock} />);

    // Trigger form submission without filling in any fields
    fireEvent.click(screen.getByText('Save'));

    // Assert that validation error messages are displayed for each field
    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
  });

  test('should not display validation error messages when form is valid', () => {
    const onSubmitMock = jest.fn();
    render(<Form onSubmit={onSubmitMock} />);

    // Fill in the form fields with valid data
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234567890' } });

    // Trigger form submission
    fireEvent.click(screen.getByText('Save'));

    // Assert that no validation error messages are displayed
    expect(screen.queryByText('First Name is required')).toBeNull();
    expect(screen.queryByText('Last Name is required')).toBeNull();
    expect(screen.queryByText('Phone is required')).toBeNull();
  });

  // Add more tests for specific validation scenarios if needed
});