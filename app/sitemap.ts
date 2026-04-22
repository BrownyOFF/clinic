import { MetadataRoute } from 'next';
import { newsData } from './data/news';
import { newsDataEn } from './data/newsEn';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vitrylazhyttia.com.ua';

  // Динамічні посилання для кожної УКРАЇНСЬКОЇ новини
  const ukrNewsUrls: MetadataRoute.Sitemap = newsData.map((news) => ({
    url: `${baseUrl}/novyny/${news.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Динамічні посилання для кожної АНГЛІЙСЬКОЇ новини
  const engNewsUrls: MetadataRoute.Sitemap = newsDataEn.map((news) => ({
    url: `${baseUrl}/en/news/${news.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    // ==========================================
    // УКРАЇНСЬКА ВЕРСІЯ (Основна)
    // ==========================================
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/pro-nas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/napryamky`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/komanda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/novyny`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/kontakty`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/vakansiyi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/dlya-patsiyenta/dokumenty`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/dlya-patsiyenta/reabilitatsiya`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/dlya-patsiyenta/platni-poslugy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...ukrNewsUrls, // Додаємо всі українські статті

    // ==========================================
    // АНГЛІЙСЬКА ВЕРСІЯ
    // ==========================================
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/en/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/directions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/en/contacts`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/vacancy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/for-patient/documents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/en/for-patient/rehabilitation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/en/for-patient/paid-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...engNewsUrls, // Додаємо всі англійські статті
  ];
}