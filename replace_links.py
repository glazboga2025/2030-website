#!/usr/bin/env python3
import csv
import sys
from pathlib import Path

def remove_links(input_file, output_file=None, overwrite=False):
    """
    Удаляет ссылки на определенный домен из CSV файла.
    
    Args:
        input_file (str): Путь к входному CSV файлу
        output_file (str, optional): Путь к выходному CSV файлу. 
                                    Если не указан, используется имя входного файла с префиксом 'cleaned_'
        overwrite (bool): Перезаписать исходный файл
    """
    if output_file is None:
        if overwrite:
            output_file = input_file
        else:
            input_path = Path(input_file)
            output_file = input_path.parent / f"cleaned_{input_path.name}"
    
    rows = []
    removed_count = 0
    
    # Чтение CSV файла
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            # Проверяем, содержит ли последний столбец ссылку на нежелательный домен
            if len(row) > 0 and 'linkerstream' in row[-1]:
                print(f"Найдена ссылка для удаления: {row[-1]}")
                # Удаляем ссылку (заменяем на пустую строку)
                old_value = row[-1]
                row[-1] = ""
                removed_count += 1
                print(f"Ссылка удалена")
            rows.append(row)
    
    # Запись в новый CSV файл
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(rows)
    
    print(f"Ссылки удалены. Всего удалено: {removed_count}. Результат сохранен в {output_file}")

def print_help():
    """Выводит справку по использованию скрипта"""
    print("Использование: python remove_links.py <input_csv> [output_csv] [--overwrite]")
    print("")
    print("Аргументы:")
    print("  input_csv      Путь к входному CSV файлу")
    print("  output_csv     Путь к выходному CSV файлу (опционально)")
    print("  --overwrite    Перезаписать исходный файл (опционально)")
    print("")
    print("Примеры:")
    print("  python remove_links.py data.csv                    # Создает cleaned_data.csv")
    print("  python remove_links.py data.csv output.csv         # Создает output.csv")
    print("  python remove_links.py data.csv --overwrite        # Перезаписывает data.csv")
    print("  python remove_links.py data.csv output.csv --overwrite  # Перезаписывает output.csv")
    print("  python remove_links.py --help                      # Показывает эту справку")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] == "--help" or sys.argv[1] == "-h":
        print_help()
        sys.exit(0)
    
    input_file = sys.argv[1]
    output_file = None
    overwrite = False
    
    if len(sys.argv) > 2:
        if sys.argv[2] == "--overwrite":
            overwrite = True
        else:
            output_file = sys.argv[2]
            if len(sys.argv) > 3 and sys.argv[3] == "--overwrite":
                overwrite = True
    
    remove_links(input_file, output_file, overwrite) 