# Домашнее задание по React Сазонов Сергей

Это клиентское приложение для загрузки и анализа `.csv`-файлов с данными о тратах в галактике. Пользователь может загрузить файл, получить промежуточный результат агрегации в реальном времени и просмотреть историю загрузок.

---

## ⚙️ Установка и запуск проекта

```bash
# Установка зависимостей
npm install
yarn

# Запуск в режиме разработки
npm run dev
yarn dev

# Build
npm run build
yarn build

# Предпросмотр production-сборки (после build)
npm run preview
yarn preview
```

## Запуск сервера

В качестве сервера необходимо использовать https://github.com/etozhenerk/shri2025-back

## Генерация файла

По умолчанию файл генерируется без ошибок по 1Гб, если хотите изменить можете это сделать в файле shared/constants/configGenerator.ts

## Архитектура
```
src/
├── assets/ # Статические файлы (иконки, изображения)
├── pages/ # Основные страницы приложения
│ ├── aggregate/ # Загрузка и агрегация CSV-файлов
│ ├── history/ # История запросов
│ └── generator/ # Генерация тестовых данных
│ ├── ui/ # UI-компоненты страницы
│ ├── api/ # API-запросы
│ ├── model/ # Типы и интерфейсы (если нужны)
│ └── storage/ # Zustand-хранилища
├── shared/
│ ├── components/ # Общие переиспользуемые компоненты (Button, Header, FileView и т.д.)
│ ├── constants/ # Константы, включая ключи для LocalStorage
│ ├── styles/ # Глобальные стили
│ ├── types/ # Общие типы проекта (TAggregateData и др.)
│ └── utils/ # Утилиты (например, работа с LocalStorage)
```

## Тестирование

---

## Юнит-тесты (Vitest + Testing Library)

Написаны unit тесты и e2e тесты (vitest и playwright)

### Запуск

#### Playwright (E2E)

лежат в папке /tests

```bash
yarn e2e
```

#### Vitest (Unit)

```bash
yarn test
```

### 1. `UploadFile.test.tsx`

Проверяет компонент загрузки файлов:

- Отображение кнопки и подсказки без выбранного файла
- Загрузку CSV через `<input>` и вызов `onFileUpload`
- Локальную валидацию типа файла (ошибка для не-CSV)
- Удаление файла и сброс состояния стора
- Drag&drop загрузку файла по `data-testid="drop-zone"`

### 2. `aggregate.store.test.ts`

Покрывает Zustand-хранилище `useAggregateStore`:

- Начальное состояние (`chunks = []`, `isLoading = false`, `error = null`)
- Добавление чанка через `addChunk`
- Переключение флага загрузки через `setLoading`
- Сохранение ошибки `setError`
- Сброс состояния через `reset`

### 3. `aggregateFile.test.ts`

Тестирует функцию `aggregateFile` (API-слой потокового чтения):

- Разбиение текста из `fetch().body.getReader()` на JSON-строки и вызов `onChunk` для каждой
- Бросает ошибку, если `response.ok === false` или нет `response.body`

### 4. `handleAggregate.test.ts`

Тестирует orchestration-функцию `handleAggregate`:

- Успешный сценарий: вызовы `reset`, `setLoading`, `addChunk`, запись в LocalStorage со статусом `success`
- Ошибочный сценарий: вызовы `setError` и запись в LocalStorage со статусом `error`

### 5. `GeneratorPage.test.tsx`

Проверяет компонент генератора:

- Отображение кнопки “Начать генерацию”
- Переход через состояние `loading` к `ready` при успешном вызове `generateCSV`
- Обработка ошибки генерации и вывод сообщения
- Удаление сгенерированного файла и возвращение кнопки

### 6. `generator.test.ts`

Тестирует API-функцию `generateCSV`:

- Формирование правильного URL с параметрами
- Возврат `Blob` при `response.ok === true`
- Бросает ошибку при `response.ok === false` или сетевых ошибках

### 7. `history.test.ts`

Покрывает API-модуль работы с LocalStorage:

- `getHistoryFromStorage()` возвращает корректный массив или пустой при ошибках
- `saveHistoryToStorage()` записывает JSON в `localStorage`

### 8. `history.store.test.ts`

Тестирует Zustand-хранилище `useHistoryStore`:

- Загрузка истории из `getHistoryFromStorage()` и реверсирование порядка
- Добавление записи через `addRecord()` и сохранение в `localStorage`
- Удаление одной записи через `deleteRecord()`
- Полная очистка через `clearHistory()`

### 9. `HistoryPage.test.tsx`

Проверяет UI-страницу истории:

- Пустое состояние (заглушка “Здесь появится история запросов”)
- Рендер списка записей
- Открытие модального окна для успешной записи
- Удаление записи и очистка всей истории
- Навигация на генератор

### 10. `FileView.test.tsx`

Покрывает компонент `FileView`:

- Отображение спиннера при `loading=true`
- Рендер имени файла и кнопки удаления
- Применение CSS-классов `error` и `already`

---
