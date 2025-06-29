/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoryPage from './HistoryPage';
import { useHistoryStore } from '../storage/history.store';
import { useNavigate } from 'react-router-dom';

vi.mock('../storage/history.store');
vi.mock('react-router-dom', () => ({ useNavigate: vi.fn() }));
const mockedStore = vi.mocked(useHistoryStore);
const mockedNavigate = vi.mocked(useNavigate);

vi.mock('./ModalAggregateData/ModalAggregateData', () => ({
  default: (props: any) => <div data-testid="modal">{props.isOpen ? 'open' : 'closed'}</div>,
}));
vi.mock('./RecordHistory/RecordHistory', () => ({
  default: (props: any) => (
    <div data-testid={`record-${props.id}`}>
      <button data-testid={`open-${props.id}`} onClick={props.onClick}>
        Open
      </button>
      <button data-testid={`del-${props.id}`} onClick={props.onDelete}>
        Del
      </button>
    </div>
  ),
}));
vi.mock('@/shared/components/buttons/button/Button', () => ({
  default: (props: any) => <button {...props} />,
}));

describe('HistoryPage', () => {
  let loadHistory: any;
  let deleteRecord: any;
  let clearHistory: any;

  beforeEach(() => {
    loadHistory = vi.fn();
    deleteRecord = vi.fn();
    clearHistory = vi.fn();
    mockedStore.mockReturnValue({
      records: [],
      loadHistory,
      deleteRecord,
      clearHistory,
      addRecord: vi.fn(),
    } as any);
    mockedNavigate.mockReturnValue(vi.fn());
  });

  it('показывает заглушку при отсутствии записей', () => {
    render(<HistoryPage />);
    expect(loadHistory).toHaveBeenCalled();
    expect(screen.getByText(/Здесь/)).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toHaveTextContent('closed');
  });

  it('рендерит записи и обрабатывает действия', () => {
    const recs = [
      { id: '1', status: 'success', result: { foo: 1 } } as any,
      { id: '2', status: 'error', errorMessage: 'e' } as any,
    ];
    mockedStore.mockReturnValue({
      records: recs,
      loadHistory,
      deleteRecord,
      clearHistory,
      addRecord: vi.fn(),
    } as any);
    render(<HistoryPage />);

    expect(screen.getByTestId('record-1')).toBeInTheDocument();
    expect(screen.getByTestId('record-2')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('open-1'));
    expect(screen.getByTestId('modal')).toHaveTextContent('open');

    fireEvent.click(screen.getByTestId('del-2'));
    expect(deleteRecord).toHaveBeenCalledWith('2');

    fireEvent.click(screen.getByRole('button', { name: 'Очистить все' }));
    expect(clearHistory).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Сгенерировать больше' }));
    expect(mockedNavigate()).toHaveBeenCalledWith('/generator');
  });
});
