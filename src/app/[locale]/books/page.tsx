import { generateLocalizedMetadata } from '@/lib/metadata'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { BookCard } from './_components/book-card'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return await generateLocalizedMetadata(locale, 'books')
}

export default function BooksPage() {
  const t = useTranslations('books')

  const books = [
    {
      id: 'clean-code',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      imageUrl: 'https://m.media-amazon.com/images/I/71dH97FwGbL._SY385_.jpg',
      amazonUrl: 'https://amzn.to/4q6i3Em',
    },
    {
      id: 'refactoring',
      title: 'Refactoring',
      author: 'Martin Fowler',
      imageUrl: 'https://m.media-amazon.com/images/I/81sTm5M7wjL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/3XJlCnI',
    },
    {
      id: 'pragmatic-programmer',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      imageUrl: 'https://m.media-amazon.com/images/I/61hewOW+8zL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/3YkrKD3',
    },
    {
      id: 'software-architecture',
      title: 'Fundamentals of Software Architecture',
      author: 'Mark Richards, Neal Ford',
      imageUrl: 'https://m.media-amazon.com/images/I/718UG0KPHpL._SL1457_.jpg',
      amazonUrl: 'https://amzn.to/3MsoVgG',
    },
    {
      id: 'grokking-algorithms',
      title: 'Grokking Algorithms',
      author: 'Aditya Bhargava',
      imageUrl: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._SL1296_.jpg',
      amazonUrl: 'https://amzn.to/4aG9XNY',
    },
    {
      id: 'cracking-code',
      title: 'Cracking the Coding Interview',
      author: 'Gayle Laakmann McDowell',
      imageUrl: 'https://m.media-amazon.com/images/I/61mIq2iJUXL._SL1360_.jpg',
      amazonUrl: 'https://amzn.to/4iTmP5A',
    },
    {
      id: 'system-design-interview',
      title: 'System Design Interview',
      author: 'Alex Xu',
      imageUrl: 'https://m.media-amazon.com/images/I/51vZ6t5W4gL._SL1499_.jpg',
      amazonUrl: 'https://amzn.to/4iPS41b',
    },
    {
      id: 'mythical-man-month',
      title: 'The Mythical Man-Month',
      author: 'Frederick P. Brooks Jr.',
      imageUrl: 'https://m.media-amazon.com/images/I/71HNGP3tJbL._SL1428_.jpg',
      amazonUrl: 'https://amzn.to/4a9RcT4',
    },
    {
      id: 'sicp',
      title: 'Structure and Interpretation of Computer Programs',
      author: 'Harold Abelson, Gerald Jay Sussman',
      imageUrl: 'https://m.media-amazon.com/images/I/71BBXQnykuL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/48Nkqoi',
    },
    {
      id: 'extreme-programming',
      title: 'Extreme Programming Explained',
      author: 'Kent Beck',
      imageUrl: 'https://m.media-amazon.com/images/I/61Jdrn9cfpL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/4pq4XSh',
    },
    {
      id: 'ddia',
      title: 'Designing Dataf-Intensive Applications',
      author: 'Martin Kleppmann',
      imageUrl: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/4oQjnd7',
    },
    {
      id: 'tanenbaum-os',
      title: 'Modern Operating Systems',
      author: 'Andrew S. Tanenbaum',
      imageUrl: 'https://m.media-amazon.com/images/I/81TqQbBQKPL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/3KKXn5t',
    },
    {
      id: 'k-and-r',
      title: 'The C Programming Language',
      author: 'Brian W. Kernighan, Dennis M. Ritchie',
      imageUrl: 'https://m.media-amazon.com/images/I/71bEFrADiUL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/48NhzM4',
    },
    {
      id: 'ddd-red-book',
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      imageUrl: 'https://m.media-amazon.com/images/I/61Y0IuO7XTL._SL1001_.jpg',
      amazonUrl: 'https://amzn.to/4oIA763',
    },
    {
      id: 'microservices-patterns',
      title: 'Microservices Patterns',
      author: 'Chris Richardson',
      imageUrl: 'https://m.media-amazon.com/images/I/612SvfNVfdL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/3KP8Ktj',
    },
    {
      id: 'cormen',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      imageUrl: 'https://m.media-amazon.com/images/I/61Pgdn8Ys-L._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/4q5m6kf',
    },
    {
      id: 'knuth',
      title: 'The Art of Computer Programming',
      author: 'Donald E. Knuth',
      imageUrl: 'https://m.media-amazon.com/images/I/61tIrzRmFdL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/44W0WN1',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto text-center mb-10 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            description={t(`recommendations.${book.id}`)}
            imageUrl={book.imageUrl}
            amazonUrl={book.amazonUrl}
            ctaText={t('buyOnAmazon')}
          />
        ))}
      </div>
    </div>
  )
}
