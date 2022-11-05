import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alerts from '../Alerts';
import AlertState from '../../../context/alert/AlertState';

it('renders Alerts component', () => {
  render(
    <AlertState>
      <Alerts />
    </AlertState>
  );
  //   const alertElement = screen.findByText(/a/i);
  //   expect(await alertElement).toBeInTheDocument(); TODO: fix this test
});
