import { LinkItem } from "@/lib/csvUtils";

interface LinksListProps {
  links: LinkItem[];
  currentPage: number;
  totalPages: number;
}

export function LinksList({ links, currentPage, totalPages }: LinksListProps) {
  // Function to generate pagination display with ellipsis for large ranges
  const getPaginationDisplay = (current: number, total: number) => {
    const result = [];

    // Always show first page
    result.push(1);

    // Logic for pages around current page
    if (current > 3) {
      result.push('...');
    }

    // Pages around current
    for (let i = Math.max(2, current - 2); i <= Math.min(total - 1, current + 2); i++) {
      result.push(i);
    }

    // Add ellipsis if there's a gap before last page
    if (current < total - 3) {
      result.push('...');
    }

    // Always show last page if not already included
    if (total > 1) {
      result.push(total);
    }

    return result;
  };

  const paginationDisplay = getPaginationDisplay(currentPage, totalPages);

  // Create array of page numbers for the jumpbox based on current page
  const getJumpboxNumbers = () => {
    const standardJumps = [10, 50, 100, 500, 1000];
    
    // Добавляем тысячные значения до totalPages
    for (let i = 1000; i <= totalPages; i += 1000) {
      if (!standardJumps.includes(i)) {
        standardJumps.push(i);
      }
    }

    // If the current page is one of the standard jumps, add nearby pages
    if (currentPage > 10 && !standardJumps.includes(currentPage)) {
      // Find the previous and next thousand mark
      const prevThousand = Math.floor(currentPage / 1000) * 1000;
      const nextThousand = Math.ceil(currentPage / 1000) * 1000;

      if (!standardJumps.includes(prevThousand) && prevThousand > 0) {
        standardJumps.push(prevThousand);
      }

      if (!standardJumps.includes(nextThousand) && nextThousand <= totalPages) {
        standardJumps.push(nextThousand);
      }
    }

    return standardJumps.sort((a, b) => a - b);
  };

  const jumpboxNumbers = getJumpboxNumbers();

  // Функция для форматирования URL для отображения
  const formatUrlForDisplay = (url: string): string => {
    try {
      // Удаляем протокол и параметры для более чистого отображения
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/bitrix\/redirect\.php\?.*?goto=/, ' → ')
        .replace(/\?.*$/, '')
        .substring(0, 50) + (url.length > 50 ? '...' : '');
    } catch (e) {
      return url;
    }
  };

  return (
    <div className="bg-white rounded shadow-sm p-6">
      {links.length > 0 ? (
        <ul className="list-disc pl-6 space-y-2">
          {links.map((link, index) => (
            <li key={index} className="text-sm hover:bg-gray-50 p-1 rounded">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                {formatUrlForDisplay(link.url)}
              </a>
              
              {link.source_page && (
                <span className="text-xs text-gray-500 ml-2">
                  (источник: {link.source_page.replace('https://', '')})
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Ссылки не найдены или произошла ошибка при загрузке.</p>
      )}

      <div className="flex flex-wrap gap-2 mt-8 mb-4 text-sm">
        {/* Prev button */}
        {currentPage > 1 && (
          <a
            href={`?page=${currentPage - 1}`}
            className="px-2 py-1 text-blue-600 hover:underline"
          >
            &lt; Предыдущая
          </a>
        )}

        {/* Page numbers */}
        {paginationDisplay.map((num, index) => (
          typeof num === 'number' ? (
            <a
              key={index}
              href={`?page=${num}`}
              className={`px-2 py-1 ${num === currentPage ? 'bg-blue-600 text-white' : 'text-blue-600'} hover:underline`}
            >
              {num}
            </a>
          ) : (
            <span key={index} className="px-2 py-1">
              {num}
            </span>
          )
        ))}

        {/* Next button */}
        {currentPage < totalPages && (
          <a
            href={`?page=${currentPage + 1}`}
            className="px-2 py-1 text-blue-600 hover:underline"
          >
            Следующая &gt;
          </a>
        )}
      </div>

      <div className="mt-4 mb-4 text-sm">
        <p>Всего страниц: {totalPages.toLocaleString()}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-2 text-sm">
        <span className="text-gray-600">Быстрый переход:</span>
        {jumpboxNumbers.map((pageNum) => (
          <a
            key={pageNum}
            href={`?page=${pageNum}`}
            className={`px-2 py-1 ${pageNum === currentPage ? 'bg-blue-600 text-white' : 'text-blue-600'} hover:underline`}
          >
            {pageNum}
          </a>
        ))}
      </div>
    </div>
  );
} 