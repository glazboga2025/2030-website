import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import readline from 'readline';

export interface LinkItem {
  url: string;
  text: string;
  source_page: string;
}

// Функция для обработки строки CSV и извлечения всех ссылок
function processCSVLine(line: string): LinkItem[] {
  try {
    const parts = line.split(',');
    if (parts.length < 3) return [];
    
    const items: LinkItem[] = [];
    
    // Первая ссылка (url)
    if (parts[0]) {
      items.push({
        url: parts[0],
        text: parts[1] || parts[0],
        source_page: parts[2] || ''
      });
    }
    
    // Вторая ссылка (text) - если она содержит URL
    if (parts[1] && (parts[1].includes('http') || parts[1].includes('www.') || parts[1].includes('.ru') || parts[1].includes('.com'))) {
      const url = parts[1].startsWith('http') ? parts[1] : `http://${parts[1]}`;
      items.push({
        url: url,
        text: parts[1],
        source_page: parts[2] || ''
      });
    }
    
    return items;
  } catch (error) {
    console.error('Ошибка при обработке строки CSV:', error);
    return [];
  }
}

// Функция для подсчета строк в файле
async function countLines(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    const readStream = fs.createReadStream(filePath);
    
    readStream.on('error', reject);
    
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });
    
    rl.on('line', () => {
      lineCount++;
    });
    
    rl.on('close', () => {
      resolve(lineCount - 1); // Вычитаем заголовок
    });
  });
}

// Функция для чтения определенного диапазона строк из файла
async function readLinesRange(filePath: string, start: number, count: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const lines: string[] = [];
    let lineCount = 0;
    let headerLine = '';
    
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', reject);
    
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });
    
    rl.on('line', (line) => {
      if (lineCount === 0) {
        // Сохраняем заголовок
        headerLine = line;
      } else if (lineCount >= start && lineCount < start + count) {
        // Добавляем строки в нужном диапазоне
        lines.push(line);
      } else if (lineCount >= start + count) {
        // Если достигли конца нужного диапазона, закрываем поток
        rl.close();
        readStream.destroy();
      }
      
      lineCount++;
    });
    
    rl.on('close', () => {
      // Возвращаем заголовок и строки в нужном диапазоне
      resolve([headerLine, ...lines]);
    });
  });
}

export async function readLinksFromCSV(page: number, itemsPerPage: number = 20): Promise<{
  links: LinkItem[];
  totalPages: number;
}> {
  try {
    // Путь к CSV файлу
    const filePath = path.join(process.cwd(), '111.csv');
    
    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      console.error('CSV файл не найден:', filePath);
      return { links: [], totalPages: 0 };
    }
    
    // Получаем общее количество строк для расчета пагинации
    const totalItems = await countLines(filePath);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Вычисляем диапазон строк для текущей страницы
    const startLine = (page - 1) * itemsPerPage + 1; // +1 для пропуска заголовка
    
    // Читаем только нужные строки из файла
    const selectedLines = await readLinesRange(filePath, startLine, itemsPerPage);
    
    // Обрабатываем каждую строку и извлекаем все ссылки
    const links: LinkItem[] = [];
    for (let i = 1; i < selectedLines.length; i++) { // Пропускаем заголовок
      const lineLinks = processCSVLine(selectedLines[i]);
      links.push(...lineLinks);
    }
    
    return {
      links,
      totalPages
    };
  } catch (error) {
    console.error('Ошибка при чтении CSV файла:', error);
    return { links: [], totalPages: 0 };
  }
} 