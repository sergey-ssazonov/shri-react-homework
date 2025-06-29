/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GeneratorPage from './GeneratorPage';
import { generateCSV } from '../api/generator';

vi.mock('@/shared/components/fileView/FileView', () => ({
  default: ({ file, loading, already, onRemove }: any) => (
    <div data-testid="file-view">
      <span>{file.name}</span>
      {loading && <span data-testid="loading">loading</span>}
      {already && <span data-testid="ready">ready</span>}
      <button onClick={onRemove}>Remove</button>
    </div>
  ),
}));

vi.mock('../api/generator');
const mockedGenerateCSV = vi.mocked(generateCSV);

describe('GeneratorPage', () => {
  const blob = new Blob(['col1,col2\n1,2'], { type: 'text/csv' });

  beforeEach(() => {
    mockedGenerateCSV.mockReset();
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:url'),
      revokeObjectURL: vi.fn(),
    } as any);
  });

  it('изначально показывает кнопку генерации', () => {
    render(<GeneratorPage />);
    expect(screen.getByRole('button', { name: 'Начать генерацию' })).toBeInTheDocument();
  });

  it('при успешной генерации показывает loading, а затем ready', async () => {
    mockedGenerateCSV.mockResolvedValue(blob);
    render(<GeneratorPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Начать генерацию' }));
    expect(screen.getByTestId('file-view')).toBeInTheDocument();
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedGenerateCSV).toHaveBeenCalled();
    });

    expect(screen.queryByTestId('loading')).toBeNull();
    expect(screen.getByTestId('ready')).toBeInTheDocument();
    expect(screen.getByText('report.csv')).toBeInTheDocument();
  });

  it('при ошибке генерации показывает сообщение об ошибке', async () => {
    mockedGenerateCSV.mockRejectedValue(new Error('fail'));
    render(<GeneratorPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Начать генерацию' }));
    await waitFor(() => {
      expect(screen.getByText('Ошибка генерации файла')).toBeInTheDocument();
    });
  });

  it('удаляет файл и возвращает кнопку генерации', async () => {
    mockedGenerateCSV.mockResolvedValue(blob);
    render(<GeneratorPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Начать генерацию' }));
    await waitFor(() => {
      expect(mockedGenerateCSV).toHaveBeenCalled();
      expect(screen.getByTestId('ready')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Remove'));
    expect(screen.getByRole('button', { name: 'Начать генерацию' })).toBeInTheDocument();
  });
});
