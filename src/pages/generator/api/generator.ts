type GenerateCSVParams = {
  size?: number;
  withErrors?: boolean;
  maxSpend?: string;
};

export const generateCSV = async ({
  size = 0.5,
  withErrors = false,
  maxSpend = '1000',
}: GenerateCSVParams): Promise<Blob> => {
  const params = new URLSearchParams({
    size: size.toString(),
    withErrors: withErrors ? 'on' : 'off',
    maxSpend,
  });

  const response = await fetch(`http://localhost:3000/report?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Ошибка генерации файла');
  }

  return await response.blob();
};
