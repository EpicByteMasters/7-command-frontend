import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { PageTitle } from './page-title';

describe('PageTitle Component', () => {
  it('Заголовок рендерится без ошибок', () => {
    const title = 'Test Title';

    expect(screen.getByText(title)).toBeInTheDocument();

    const titleElement = screen.getByText(title);
    expect(titleElement).toHaveClass('title');
  });
});
