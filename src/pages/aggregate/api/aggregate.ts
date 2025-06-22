import type { TAggregateData } from '@/shared/types/aggregate';

type OnChunkCallback = (chunk: TAggregateData) => void;

export const aggregateFile = async (
  file: File,
  rowsPerChunk: number,
  onChunk: OnChunkCallback
): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`http://localhost:3000/aggregate?rows=${rowsPerChunk}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok || !response.body) {
    throw new Error('Ошибка при соединении с сервером');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let newlineIndex = buffer.indexOf('\n');
    while (newlineIndex !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);

      if (line) {
        try {
          const chunk: TAggregateData = JSON.parse(line);
          onChunk(chunk);
        } catch (e) {
          console.error(e);
        }
      }

      newlineIndex = buffer.indexOf('\n');
    }
  }
};
