#!/usr/bin/env python3
import csv
import sys
import os

def print_help():
    """
    Выводит справку по использованию скрипта.
    """
    print("Использование: python3 remove_links.py <input_csv> [output_csv] [--overwrite]")
    print("")
    print("Аргументы:")
    print("  input_csv    Путь к входному CSV файлу")
    print("  output_csv   (Опционально) Путь к выходному CSV файлу")
    print("  --overwrite  (Опционально) Перезаписать исходный файл")
    print("")
    print("Примеры:")
    print("  python3 remove_links.py data.csv")
    print("  python3 remove_links.py data.csv output.csv")
    print("  python3 remove_links.py data.csv --overwrite")
    print("  python3 remove_links.py data.csv output.csv --overwrite")

def remove_links(input_file, output_file=None, overwrite=False):
    """
    Удаляет строки, содержащие ссылки на указанный домен из CSV файла.
    
    Args:
        input_file (str): Путь к входному CSV файлу.
        output_file (str, optional): Путь к выходному CSV файлу. 
                                    Если не указан, создается новый файл с префиксом 'cleaned_'.
        overwrite (bool, optional): Перезаписать исходный файл. По умолчанию False.
    """
    if output_file is None:
        if overwrite:
            output_file = input_file
        else:
            # Создаем имя выходного файла с префиксом 'cleaned_'
            base_name = os.path.basename(input_file)
            dir_name = os.path.dirname(input_file)
            output_file = os.path.join(dir_name, 'cleaned_' + base_name)
    
    # Домены, которые нужно удалить
    domains_to_remove = ['linkerstream.online', 'boostlinks.info']
    
    # Счетчик удаленных ссылок
    removed_count = 0
    
    with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
         open(output_file + '.tmp', 'w', newline='', encoding='utf-8') as outfile:
        
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        # Записываем заголовок
        header = next(reader)
        writer.writerow(header)
        
        # Обрабатываем строки
        for row in reader:
            # Проверяем, содержит ли строка указанные домены в любом столбце
            should_remove = False
            for domain in domains_to_remove:
                for cell in row:
                    if domain in cell:
                        print(f"Найдена ссылка для удаления: {cell}")
                        should_remove = True
                        removed_count += 1
                        break
                if should_remove:
                    break
            
            # Если строка не содержит указанные домены, записываем ее в выходной файл
            if not should_remove:
                writer.writerow(row)
            else:
                print("Ссылка удалена")
    
    # Заменяем исходный файл, если указан флаг overwrite
    if os.path.exists(output_file):
        os.replace(output_file + '.tmp', output_file)
    else:
        os.rename(output_file + '.tmp', output_file)
    
    print(f"Ссылки удалены. Всего удалено: {removed_count}. Результат сохранен в {output_file}")

if __name__ == "__main__":
    # Проверяем наличие аргументов командной строки
    if len(sys.argv) < 2 or '--help' in sys.argv or '-h' in sys.argv:
        print_help()
        sys.exit(0)
    
    input_file = sys.argv[1]
    output_file = None
    overwrite = False
    
    # Проверяем наличие флага --overwrite
    if '--overwrite' in sys.argv:
        overwrite = True
        sys.argv.remove('--overwrite')
    
    # Проверяем наличие выходного файла
    if len(sys.argv) > 2:
        output_file = sys.argv[2]
    
    # Вызываем функцию удаления ссылок
    remove_links(input_file, output_file, overwrite) 