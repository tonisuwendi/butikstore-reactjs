/* eslint-disable */

import { render, screen } from '@testing-library/react';
import Header from './Header';

const headerComponent = () => {
  render(<Header />);
};

describe('Header component', () => {
  test('Memastikan teks "Free Shipping" ada di layar', () => {
    headerComponent();

    const textElement = screen.getByText('Free Shipping', { exact: false });
    expect(textElement).toBeInTheDocument();
  });

  test('Memastikan teks "NEW ARRIVALS" ada di layar', () => {
    headerComponent();

    const listItemElement = screen.getByText('NEW ARRIVALS');
    expect(listItemElement).toBeInTheDocument();
  });
});
