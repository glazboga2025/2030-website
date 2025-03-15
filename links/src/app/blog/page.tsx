import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import CurrentDateTime from "@/components/CurrentDateTime";
import { Suspense } from "react";

interface BacklinkItem {
  url: string;
  target: string;
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const pageParam = searchParams.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  // Updated backlink data with glazboga2030 as the Telegram channel
  const backlinks: BacklinkItem[] = [
    { url: "maps.google.com.ec/url?q=https://t.me/glazboga2030", target: "https://maps.google.com.ec/url?q=https://t.me/glazboga2030" },
    { url: "the4page.blogspot.com/search?label=https://t.me/glazboga2030", target: "https://the4page.blogspot.com/search?label=https://t.me/glazboga2030" },
    { url: "www.rocklandworldradio.com/xlink_head.php?xlink=https://t.me/glazboga2030", target: "http://www.rocklandworldradio.com/xlink_head.php?xlink=https://t.me/glazboga2030" },
    { url: "alt1.toolbarqueries.google.tt/url?q=https://t.me/glazboga2030", target: "https://alt1.toolbarqueries.google.tt/url?q=https://t.me/glazboga2030" },
    { url: "tweak3d.net/proxy.php?link=https://t.me/glazboga2030", target: "http://tweak3d.net/proxy.php?link=https://t.me/glazboga2030" },
    { url: "www.greenmarketing.com/?URL=https://t.me/glazboga2030", target: "http://www.greenmarketing.com/?URL=https://t.me/glazboga2030" },
    { url: "ddom47.ru/redirect?url=https://t.me/glazboga2030", target: "http://ddom47.ru/redirect?url=https://t.me/glazboga2030" },
    { url: "images.google.com.bh/url?q=https://t.me/glazboga2030", target: "https://images.google.com.bh/url?q=https://t.me/glazboga2030" },
    { url: "professor-murmann.info/?URL=https://t.me/glazboga2030", target: "http://professor-murmann.info/?URL=https://t.me/glazboga2030" },
    { url: "titanquest.org.ua/go?https://t.me/glazboga2030", target: "http://titanquest.org.ua/go?https://t.me/glazboga2030" },
    { url: "domain.opendns.com/https://t.me/glazboga2030", target: "http://domain.opendns.com/https://t.me/glazboga2030" },
    { url: "www.retrogames.cz/download_DOS.php?id=714&ROMfile=https://t.me/glazboga2030", target: "http://www.retrogames.cz/download_DOS.php?id=714&ROMfile=https://t.me/glazboga2030" },
    { url: "anapaklining.ru/redirect?url=https://t.me/glazboga2030", target: "http://anapaklining.ru/redirect?url=https://t.me/glazboga2030" },
    { url: "ds20spb.ru/redirect?url=https://t.me/glazboga2030", target: "http://ds20spb.ru/redirect?url=https://t.me/glazboga2030" },
    { url: "download.programmer-books.com/?link=https://t.me/glazboga2030", target: "http://download.programmer-books.com/?link=https://t.me/glazboga2030" },
    { url: "rentonjournal.com/viewblog.php?url=https://t.me/glazboga2030", target: "http://rentonjournal.com/viewblog.php?url=https://t.me/glazboga2030" },
    { url: "images.google.co.mz/url?q=https://t.me/glazboga2030", target: "https://images.google.co.mz/url?q=https://t.me/glazboga2030" },
    { url: "newsdiffs.org/article-history/https://t.me/glazboga2030", target: "http://newsdiffs.org/article-history/https://t.me/glazboga2030" },
    { url: "piteroils.ru/bitrix/redirect.php?goto=https://t.me/glazboga2030", target: "http://piteroils.ru/bitrix/redirect.php?goto=https://t.me/glazboga2030" },
    { url: "www.degreeinfo.com/proxy.php?link=https://t.me/glazboga2030", target: "http://www.degreeinfo.com/proxy.php?link=https://t.me/glazboga2030" },
  ];

  // Create pagination with 5000 pages
  const totalPages = 5000;

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
    const standardJumps = [10, 50, 100, 500, 1000, 2000, 3000, 4000, 5000];

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

  return (
    <>
      <NavBar />
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl mb-6">
            Статистика обратных ссылок от{" "}
            <Suspense fallback={<span>загрузка...</span>}>
              <CurrentDateTime />
            </Suspense>
          </h1>

          <div className="bg-white rounded shadow-sm p-6">
            <ul className="list-disc pl-6 space-y-2">
              {backlinks.map((link, index) => (
                <li key={index} className="text-sm text-blue-700 hover:underline">
                  <a href={link.target} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-8 mb-4 text-sm">
              {/* Prev button */}
              {currentPage > 1 && (
                <a
                  href={`/blog?page=${currentPage - 1}`}
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
                    href={`/blog?page=${num}`}
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
                  href={`/blog?page=${currentPage + 1}`}
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
                  href={`/blog?page=${pageNum}`}
                  className={`px-2 py-1 ${pageNum === currentPage ? 'bg-blue-600 text-white' : 'text-blue-600'} hover:underline`}
                >
                  {pageNum}
                </a>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t text-xs text-gray-500">
              Generated by Webmaster Yandex 2.1. Показано запросов за день: <CurrentDateTime />
              <br />
              Страница {currentPage} из {totalPages.toLocaleString()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
