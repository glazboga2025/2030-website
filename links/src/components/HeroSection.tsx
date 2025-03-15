"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Добро пожаловать на мой сайт!
            </h1>
            <p className="text-lg text-gray-700">
              Здесь вы найдете много интересного и полезного. Мы предлагаем лучшие
              решения для ваших задач.
            </p>
            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
              <Link href="#services">Узнать больше</Link>
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full h-[300px]">
              <Image
                src="/hero-image.jpg"
                alt="Изображение для главной страницы"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
