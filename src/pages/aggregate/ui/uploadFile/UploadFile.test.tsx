import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadFile from './UploadFile';
import { useAggregateStore } from '../../storage/aggregate.store';
import type { TAggregateData } from '@/shared/types/aggregate';
vi.mock('../../storage/aggregate.store');
const mockedUseAggregateStore = vi.mocked(useAggregateStore);

vi.mock('../../../../shared/components/fileView/FileView', () => ({
  default: ({
    file,
    onRemove,
    isError,
  }: {
    file: File;
    onRemove: () => void;
    isError: boolean;
  }) => (
    <div data-testid="file-view">
      <span>{file.name}</span>
      {isError && <span data-testid="error-indicator">error</span>}
      <button onClick={onRemove}>Remove</button>
    </div>
  ),
}));

describe('UploadFile', () => {
  const onFileUpload = vi.fn();
  const baseStore = {
    reset: vi.fn(),
    error: null,
    isLoading: false,
    chunks: [] as TAggregateData[],
  };

  beforeEach(() => {
    onFileUpload.mockClear();
    baseStore.reset = vi.fn();
    mockedUseAggregateStore.mockReturnValue(baseStore);
  });

  it('отображает кнопку загрузки и подсказку без файла', () => {
    render(<UploadFile onFileUpload={onFileUpload} />);
    expect(screen.getByText('Загрузить файл')).toBeInTheDocument();
    expect(screen.getByText('или перетащите сюда')).toBeInTheDocument();
  });

  it('вызывает onFileUpload и рендерит FileView при выборе CSV через input', () => {
    render(<UploadFile onFileUpload={onFileUpload} />);
    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['1,2'], 'test.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(onFileUpload).toHaveBeenCalledWith(file);
    expect(screen.getByTestId('file-view')).toBeInTheDocument();
  });

  it('показывает локальную ошибку при загрузке не-CSV файла', () => {
    render(<UploadFile onFileUpload={onFileUpload} />);
    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    const badFile = new File([], 'doc.pdf', { type: 'application/pdf' });
    fireEvent.change(input, { target: { files: [badFile] } });

    expect(screen.getByTestId('error-indicator')).toBeInTheDocument();
    expect(screen.getByText('Упс, не то...')).toBeInTheDocument();
  });

  it('удаляет файл и сбрасывает стор при клике Remove', () => {
    render(<UploadFile onFileUpload={onFileUpload} />);
    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['x'], 'data.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByText('Remove'));
    expect(baseStore.reset).toHaveBeenCalled();
    expect(screen.getByText('Загрузить файл')).toBeInTheDocument();
  });

  it('поддерживает drag&drop загрузку файла', () => {
    render(<UploadFile onFileUpload={onFileUpload} />);
    const dropZone = screen.getByTestId('drop-zone');
    const file = new File(['a,b'], 'drop.csv', { type: 'text/csv' });
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });

    expect(onFileUpload).toHaveBeenCalledWith(file);
    expect(screen.getByTestId('file-view')).toBeInTheDocument();
  });
});
