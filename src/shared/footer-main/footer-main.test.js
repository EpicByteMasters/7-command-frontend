import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FooterMain } from './footer-main';

describe('FooterMain Component', () => {
  test('Футер рендерится без ошибок', () => {
    const { getByText, getByAltText } = render(<FooterMain />);

    expect(getByText('Главная')).toBeInTheDocument();
    expect(getByText('Сервисы')).toBeInTheDocument();
    expect(getByAltText('logo')).toBeInTheDocument();
  });
});
