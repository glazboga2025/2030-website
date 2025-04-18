# Инструкция по работе с ссылками в CSV файлах

## Удаление ссылок из CSV файла

Скрипт `remove_links.py` позволяет удалять строки, содержащие ссылки на определенные домены из CSV файлов.

### Синтаксис

```bash
python3 remove_links.py <input_csv> [output_csv] [--overwrite]
```

### Аргументы

- `input_csv`: Путь к входному CSV файлу.
- `output_csv`: (Опционально) Путь к выходному CSV файлу.
- `--overwrite`: (Опционально) Флаг для перезаписи исходного файла.

### Примеры использования

1. Удаление ссылок с созданием нового файла с префиксом `cleaned_`:
   ```bash
   python3 remove_links.py 111.csv
   ```

2. Удаление ссылок с указанием имени выходного файла:
   ```bash
   python3 remove_links.py 111.csv output.csv
   ```

3. Удаление ссылок с перезаписью исходного файла:
   ```bash
   python3 remove_links.py 111.csv --overwrite
   ```

4. Удаление ссылок с перезаписью указанного выходного файла:
   ```bash
   python3 remove_links.py 111.csv output.csv --overwrite
   ```

## Обновление приложения после удаления ссылок

После удаления ссылок из CSV файла необходимо выполнить следующие шаги:

1. Убедиться, что в файле `src/lib/csvUtils.ts` указан правильный путь к CSV файлу.

2. Собрать приложение:
   ```bash
   npm run build
   ```

3. Развернуть приложение на Vercel:
   ```bash
   npx vercel --prod
   ```

## Настройка поддомена в Vercel

Для настройки поддомена в Vercel выполните следующие шаги:

1. Войдите в панель управления Vercel.
2. Выберите ваш проект.
3. Перейдите в раздел "Settings" > "Domains".
4. Добавьте новый домен или поддомен.
5. Следуйте инструкциям Vercel для настройки DNS-записей.

## История изменений

- Первоначально: Замена ссылок с домена `https://blog.linkerstream.online` на `https://blog.boostlinks.info`.
- Последнее обновление: Удаление всех ссылок, содержащих домены `linkerstream.online` и `boostlinks.info`. 