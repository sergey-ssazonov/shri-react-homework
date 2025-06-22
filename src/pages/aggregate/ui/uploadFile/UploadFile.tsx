import { useState, useRef, type ChangeEvent, type FC, useEffect } from 'react';
import styles from './UploadFile.module.css';
import FileStatus from '../fileStatus/FileStatus';
import { useAggregateStore } from '../../storage/aggregate.store';

type UploadFileProps = {
  onFileUpload: (file: File) => void;
};

const UploadFile: FC<UploadFileProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLocalError, setIsLocalError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { reset, error, isLoading, chunks } = useAggregateStore();

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setFile(selected);
      onFileUpload(selected);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setFile(selected);
      onFileUpload(selected);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    reset();
  };

  useEffect(() => {
    if (file && file.type !== 'text/csv') {
      setIsLocalError(true);
    } else {
      setIsLocalError(false);
    }
  }, [file]);

  const showError = isLocalError || !!error;

  return (
    <div
      className={`${styles.upload_wrap} ${file ? styles.with_file : ''} ${
        showError ? styles.error : ''
      }`}
      onDragEnter={preventDefault}
      onDragLeave={preventDefault}
      onDragOver={preventDefault}
      onDrop={handleDrop}
      onClick={!file ? handleClick : undefined}
      role="button"
      tabIndex={0}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      {!file ? (
        <button className={styles.upload_button}>Загрузить файл</button>
      ) : (
        <FileStatus
          file={file}
          loading={isLoading}
          onRemove={handleRemoveFile}
          isError={showError}
          already={!isLoading && !showError}
        />
      )}
      <p className={`${styles.hint_text} ${showError ? styles.error : ''}`}>
        {showError
          ? 'Упс, не то...'
          : !file
            ? 'или перетащите сюда'
            : isLoading
              ? 'идёт парсинг файла'
              : chunks.length > 0
                ? 'Готово!'
                : 'Файл загружен!'}
      </p>
    </div>
  );
};

export default UploadFile;
