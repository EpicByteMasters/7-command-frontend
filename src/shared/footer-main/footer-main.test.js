import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { FooterMain } from './footer-main';

describe('FooterMain Component', () => {
  test('Футер рендерится без ошибок', () => {
    const { screen } = render(<FooterMain />);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Сервисы')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });
});
