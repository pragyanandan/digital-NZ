import { render } from '@testing-library/react';

import ResultTable from './result-table';

describe('ResultTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResultTable />);
    expect(baseElement).toBeTruthy();
  });
});
