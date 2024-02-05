import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PageTitle } from './page-title';

describe('PageTitle Component', () => {
  it('Заголовок рендерится без ошибок', () => {
    const title = 'Test Title';
    const { getByText } = render(<PageTitle title={title} />);

    expect(getByText(title)).toBeInTheDocument();

    const titleElement = getByText(title);
    expect(titleElement).toHaveClass('title');
  });
});
