"use client";

import Image from "next/image";

interface PortfolioItemProps {
  title: string;
  description: string;
  imageUrl: string;
}

function PortfolioItem({ title, description, imageUrl }: PortfolioItemProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const portfolioItems = [
    {
      title: "Проект 1",
      description: "Краткое описание проекта 1.",
      imageUrl: "/project1.jpg",
    },
    {
      title: "Проект 2",
      description: "Краткое описание проекта 2.",
      imageUrl: "/project2.jpg",
    },
    {
      title: "Проект 3",
      description: "Краткое описание проекта 3.",
      imageUrl: "/project3.jpg",
    },
  ];

  return (
    <section id="portfolio" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наше Портфолио</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
