"use client";

import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center text-center">
      <div className="relative w-16 h-16 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function ServicesSection() {
  const services = [
    {
      title: "Услуга 1",
      description: "Краткое описание услуги 1. Добавьте здесь подробности о том, что вы предлагаете и какую пользу это принесет клиентам.",
      imageUrl: "/service1.jpg",
    },
    {
      title: "Услуга 2",
      description: "Краткое описание услуги 2. Добавьте здесь подробности о том, что вы предлагаете и какую пользу это принесет клиентам.",
      imageUrl: "/service2.jpg",
    },
    {
      title: "Услуга 3",
      description: "Краткое описание услуги 3. Добавьте здесь подробности о том, что вы предлагаете и какую пользу это принесет клиентам.",
      imageUrl: "/service3.jpg",
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наши Услуги</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
