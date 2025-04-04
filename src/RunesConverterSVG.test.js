import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this for toBeInTheDocument
import RunesConverterSVG from './RunesConverterSVG';

describe('RunesConverterSVG', () => {
  it('renders the default message when number is null', () => {
    render(<RunesConverterSVG number={null} />);
    const textElement = screen.getByText(/Enter 1-9999/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the default message when number is out of range', () => {
    render(<RunesConverterSVG number={10000} />);
    const textElement = screen.getByText(/Enter 1-9999/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the correct SVG elements for a valid number', () => {
    render(<RunesConverterSVG number={1234} />);
    const stemElement = screen.getByTestId('stem-base');
    expect(stemElement).toBeInTheDocument();

    const thousandElement = screen.getByTestId('thousand-1');
    const hundredElement = screen.getByTestId('hundred-2');
    const tenElement = screen.getByTestId('ten-3');
    const unitElement = screen.getByTestId('unit-4');

    expect(thousandElement).toBeInTheDocument();
    expect(hundredElement).toBeInTheDocument();
    expect(tenElement).toBeInTheDocument();
    expect(unitElement).toBeInTheDocument();
  });

  it('does not render unused symbols for numbers with missing parts', () => {
    render(<RunesConverterSVG number={5} />);
    const unitElement = screen.getByTestId('unit-5');
    expect(unitElement).toBeInTheDocument();

    const tenElement = screen.queryByTestId('ten-1');
    const hundredElement = screen.queryByTestId('hundred-1');
    const thousandElement = screen.queryByTestId('thousand-1');

    expect(tenElement).not.toBeInTheDocument();
    expect(hundredElement).not.toBeInTheDocument();
    expect(thousandElement).not.toBeInTheDocument();
  });
});