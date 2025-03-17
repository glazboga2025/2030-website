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
    // Разбиваем строку на поля
    const fields = line.split(',');
    
    // Проверяем, что у нас есть как минимум 3 поля
    if (fields.length < 3) {
      return [];
    }
    
    // Извлекаем URL, текст и исходную страницу
    const url = fields[0]?.trim() || '';
    const text = fields[1]?.trim() || url;
    const source_page = fields[2]?.trim() || '';
    
    // Проверяем, что URL существует и имеет правильный формат
    const isValidUrl = url && (
      url.includes('http') || 
      url.includes('www.') || 
      url.includes('.ru') || 
      url.includes('.com')
    );
    
    // Проверяем, что ссылка не содержит нежелательный текст
    const isNotBanned = !(
      url.includes('@https://t.me/glazboga2030') || 
      text.includes('@https://t.me/glazboga2030') || 
      source_page.includes('@https://t.me/glazboga2030') ||
      url.includes('blog.bestlinker.online') || 
      text.includes('blog.bestlinker.online') || 
      source_page.includes('blog.bestlinker.online')
    );
    
    // Если URL валидный и не содержит нежелательный текст, добавляем его в список
    if (isValidUrl && isNotBanned) {
      return [{
        url,
        text,
        source_page
      }];
    }
    
    return [];
  } catch (error) {
    console.error('Ошибка при обработке строки CSV:', error);
    return [];
  }
}

// Функция для подсчета строк в файле
async function countLines(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      });
      
      resolve(records.length);
    } catch (error) {
      console.error('Ошибка при подсчете строк в CSV:', error);
      reject(error);
    }
  });
}

// Функция для чтения определенного диапазона строк из файла
async function readLinesRange(filePath: string, start: number, count: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const lines: string[] = [];
    let headerLine = '';
    
    // Используем csv-parse для корректной обработки CSV
    const fileContent = fs.readFileSync(filePath, 'utf8');
    try {
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });
      
      // Получаем заголовок
      headerLine = 'url,text,source_page';
      
      // Получаем нужный диапазон записей
      const startIndex = start - 1; // Корректируем индекс
      const endIndex = Math.min(startIndex + count, records.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        if (i >= 0 && i < records.length) {
          const record = records[i];
          // Формируем строку CSV из записи
          const line = `${record.url || ''},${record.text || ''},${record.source_page || ''}`;
          lines.push(line);
        }
      }
      
      resolve([headerLine, ...lines]);
    } catch (error) {
      console.error('Ошибка при чтении CSV:', error);
      reject(error);
    }
  });
}

export async function readLinksFromCSV(page: number, itemsPerPage: number = 100): Promise<{
  links: LinkItem[];
  totalPages: number;
}> {
  try {
    // Путь к CSV файлу с новыми ссылками
    const filePath = path.join(process.cwd(), 'redirected_links.csv');
    
    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      console.error('CSV файл не найден:', filePath);
      return { links: [], totalPages: 0 };
    }
    
    // Получаем общее количество строк для расчета пагинации
    const totalItems = await countLines(filePath);
    console.log(`Всего записей в CSV: ${totalItems}`);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Проверяем, что страница находится в допустимом диапазоне
    const validPage = Math.max(1, Math.min(page, totalPages || 1));
    console.log(`Запрошена страница: ${page}, Валидная страница: ${validPage}`);
    
    try {
      // Читаем весь файл в память
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Парсим CSV
      const allRecords = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relaxColumnCount: true // Добавляем для более гибкой обработки CSV
      });
      
      // Получаем нужный диапазон записей
      const startIndex = (validPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, allRecords.length);
      const pageRecords = allRecords.slice(startIndex, endIndex);
      console.log(`Получено записей для страницы ${validPage}: ${pageRecords.length}`);
      
      // Преобразуем записи в LinkItem и фильтруем нежелательные ссылки
      const links: LinkItem[] = [];
      let filteredCount = 0;
      
      for (const record of pageRecords) {
        // Получаем URL из первого поля, независимо от названия колонки
        const url = Object.values(record)[0]?.toString().trim() || '';
        
        // Проверяем, что ссылка существует и имеет правильный формат
        const isValidUrl = url && (
          url.includes('http') || 
          url.includes('www.') || 
          url.includes('.ru') || 
          url.includes('.com')
        );
        
        if (isValidUrl) {
          links.push({
            url,
            text: url,
            source_page: ''
          });
        } else {
          filteredCount++;
        }
      }
      
      console.log(`Отфильтровано записей: ${filteredCount}, Осталось: ${links.length}`);
      
      return {
        links,
        totalPages: totalPages || 1
      };
    } catch (error) {
      console.error('Ошибка при чтении CSV файла:', error);
      return { links: [], totalPages: 0 };
    }
  } catch (error) {
    console.error('Ошибка при чтении CSV файла:', error);
    return { links: [], totalPages: 0 };
  }
} 