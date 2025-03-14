"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">
          © {currentYear} Мой Прекрасный Сайт. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
