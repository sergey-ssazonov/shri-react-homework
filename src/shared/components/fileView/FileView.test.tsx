import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FileView from './FileView';

describe('FileView', () => {
  const testFile = new File([''], 'example.csv', { type: 'text/csv' });

  it('показывает спиннер, когда loading=true', () => {
    render(<FileView file={testFile} loading={true} onRemove={() => {}} />);
    const spinner = screen.getByAltText('Загрузка');
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText('example.csv')).toBeNull();
  });

  it('показывает имя файла и кнопку удаления, когда загружено успешно', () => {
    const onRemove = vi.fn();
    render(
      <FileView
        file={testFile}
        loading={false}
        onRemove={onRemove}
        already={false}
        isError={false}
      />
    );
    const name = screen.getByText('example.csv');
    expect(name).toBeInTheDocument();
    expect(name).not.toHaveClass('error');
    expect(name).not.toHaveClass('already');
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(onRemove).toHaveBeenCalled();
  });

  it('добавляет класс error при isError=true', () => {
    render(<FileView file={testFile} loading={false} onRemove={() => {}} isError={true} />);
    const name = screen.getByText('example.csv');
    expect(name).toHaveClass('error');
  });

  it('добавляет класс already при already=true', () => {
    render(<FileView file={testFile} loading={false} onRemove={() => {}} already={true} />);
    const name = screen.getByText('example.csv');
    expect(name).toHaveClass('already');
  });
});
