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

  const techBooks = [
    {
      id: 'clean-code',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      imageUrl: 'https://m.media-amazon.com/images/I/71dH97FwGbL._SY385_.jpg',
      amazonUrl: 'https://amzn.to/4q6i3Em',
      stars: 4,
    },
    {
      id: 'refactoring',
      title: 'Refactoring',
      author: 'Martin Fowler',
      imageUrl: 'https://m.media-amazon.com/images/I/81sTm5M7wjL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/3XJlCnI',
      stars: 5,
    },
    {
      id: 'pragmatic-programmer',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      imageUrl: 'https://m.media-amazon.com/images/I/61hewOW+8zL._SL1500_.jpg',
      amazonUrl: 'https://amzn.to/3YkrKD3',
      stars: 5,
    },
    {
      id: 'software-architecture',
      title: 'Fundamentals of Software Architecture',
      author: 'Mark Richards, Neal Ford',
      imageUrl: 'https://m.media-amazon.com/images/I/718UG0KPHpL._SL1457_.jpg',
      amazonUrl: 'https://amzn.to/3MsoVgG',
      stars: 4,
    },
    {
      id: 'grokking-algorithms',
      title: 'Grokking Algorithms',
      author: 'Aditya Bhargava',
      imageUrl: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._SL1296_.jpg',
      amazonUrl: 'https://amzn.to/4aG9XNY',
      stars: 3.5,
    },
    {
      id: 'cracking-code',
      title: 'Cracking the Coding Interview',
      author: 'Gayle Laakmann McDowell',
      imageUrl: 'https://m.media-amazon.com/images/I/61mIq2iJUXL._SL1360_.jpg',
      amazonUrl: 'https://amzn.to/4iTmP5A',
      stars: 4.5,
    },
    {
      id: 'system-design-interview',
      title: 'System Design Interview',
      author: 'Alex Xu',
      imageUrl: 'https://m.media-amazon.com/images/I/51vZ6t5W4gL._SL1499_.jpg',
      amazonUrl: 'https://amzn.to/4iPS41b',
      stars: 4,
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
      title: 'Designing Data-Intensive Applications',
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
      stars: 5,
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

  const nonTechBooks = [
    {
      id: 'hobbit',
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      imageUrl: 'https://m.media-amazon.com/images/I/91M9xPIf10L._SY466_.jpg',
      amazonUrl: 'https://amzn.to/4pmmGcA',
      stars: 5,
    },
    {
      id: 'gatsby',
      title: 'O Grande Gatsby',
      author: 'F. Scott Fitzgerald',
      imageUrl: 'https://m.media-amazon.com/images/I/71Lwg0Bc3TL._SY466_.jpg',
      amazonUrl: 'https://amzn.to/4qeBM51',
      stars: 5,
    },
    {
      id: 'hitchhikers-guide-to-the-galaxy',
      title: 'O guia do mochileiro das galáxias',
      author: 'Douglas Adams',
      imageUrl: 'https://m.media-amazon.com/images/I/91NAJgaUlKL._SY466_.jpg',
      amazonUrl: 'https://amzn.to/4sowGEP',
      stars: 5,
    },
    {
      id: 'ruido',
      title: 'Ruído',
      author: 'Daniel Kahneman',
      imageUrl: 'https://m.media-amazon.com/images/I/81I6rfFOM-S._SY425_.jpg',
      amazonUrl: 'https://amzn.to/4pirnUN',
      stars: 4.5,
    },
    {
      id: 'habitos-atomicos',
      title: 'Hábitos Atômicos',
      author: 'James Clear',
      imageUrl: 'https://m.media-amazon.com/images/I/81eT2pjx4jL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/3YjeG0T',
      stars: 4.5,
    },
    {
      id: 'a-arte-de-fazer-acontecer',
      title: 'A Arte de Fazer Acontecer',
      author: 'David Allen',
      imageUrl: 'https://m.media-amazon.com/images/I/51UPDrneytL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/45s0FBP',
      stars: 5,
    },
    {
      id: 'antifragil',
      title: 'Antifrágil',
      author: 'Nassim Nicholas Taleb',
      imageUrl: 'https://m.media-amazon.com/images/I/8119xmkJ3IL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/4qtjfBM',
      stars: 5,
    },
    {
      id: 'meditacoes',
      title: 'Meditações',
      author: 'Marcus Aurelius',
      imageUrl: 'https://m.media-amazon.com/images/I/612B0id4gNL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/3L8GHoV',
      stars: 4,
    },
    {
      id: 'estrangeiro',
      title: 'O Estrangeiro',
      author: 'Albert Camus',
      imageUrl: 'https://m.media-amazon.com/images/I/91Sb5HdDL3L._SY425_.jpg',
      amazonUrl: 'https://amzn.to/4beusSa',
      stars: 5,
    },
    {
      id: 'bebado',
      title: 'O Andar do Bebado',
      author: 'Leonard Mlodinow',
      imageUrl: 'https://m.media-amazon.com/images/I/81KdmY4M-7L._SY385_.jpg',
      amazonUrl: 'https://amzn.to/49lHqem',
      stars: 4.5,
    },
    {
      id: '10-percent',
      title: '10% Mais Feliz',
      author: 'Dan Harris',
      imageUrl: 'https://m.media-amazon.com/images/I/71USnLguEOL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/4q2JmPY',
      stars: 4.5,
    },
    {
      id: 'wall-street-random-walk',
      title: 'Um passeio aleatório por Wall Street',
      author: 'Burton G. Malkiel',
      imageUrl: 'https://m.media-amazon.com/images/I/812KSljPMbL._SY385_.jpg',
      amazonUrl: 'https://amzn.to/4svt7Nh',
      stars: 4.5,
    },
    {
      id: 'intelligent-investor',
      title: 'O investidor inteligente',
      author: 'Benjamin Graham',
      imageUrl: 'https://m.media-amazon.com/images/I/61Q2pK79yWL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/4svt9ET',
      stars: 4,
    },
    {
      id: 'fahrenheit-451',
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      imageUrl: 'https://m.media-amazon.com/images/I/51tAD6LyZ-L._SY466_.jpg',
      amazonUrl: 'https://amzn.to/3N9HkPy',
      stars: 4,
    },
    {
      id: 'almanaque-naval-ravikant',
      title: 'O Almanaque de Naval Ravikant',
      author: 'Eric Jorgenson',
      imageUrl: 'https://m.media-amazon.com/images/I/51BHDRSC0xL._SY522_.jpg',
      amazonUrl: 'https://amzn.to/49anz1y',
      stars: 4,
    },
    {
      id: 'trabalho-focado',
      title: 'Trabalho Focado',
      author: 'Cal Newport',
      imageUrl: 'https://m.media-amazon.com/images/I/61XDczCKI0L._SY385_.jpg',
      amazonUrl: 'https://amzn.to/4pssIbz',
      stars: 4,
    },
    {
      id: 'oceano-azul',
      title: 'A estratégia do oceano azul',
      author: 'W. Chan Kim, Renée Mauborgne',
      imageUrl: 'https://m.media-amazon.com/images/I/71zvq8BIkmL._SY385_.jpg',
      amazonUrl: 'https://amzn.to/3YiCT7z',
      stars: 3.5,
    },
    {
      id: 'pai-rico-pai-pobre',
      title: 'O pai rico e o pai pobre',
      author: 'Robert Kiyosaki',
      imageUrl: 'https://m.media-amazon.com/images/I/71V4lNR2gKL._SY385_.jpg',
      amazonUrl: 'https://amzn.to/3Lrs2Fq',
      stars: 3,
    },
    {
      id: 'one-up-on-wall-street',
      title: 'One Up on Wall Street',
      author: 'Peter Lynch',
      imageUrl: 'https://m.media-amazon.com/images/I/71sNaCDncJL._SY466_.jpg',
      amazonUrl: 'https://amzn.to/49jtTEd',
      stars: 4.5,
    },
    {
      id: 'alice-in-wonderland',
      title: 'Alice no País das Maravilhas',
      author: 'Lewis Carroll',
      imageUrl: 'https://m.media-amazon.com/images/I/81eAcV387dL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/4aBUYVs',
      stars: 4,
    },
    {
      id: '4h-workweek',
      title: 'Trabalhe 4 horas por semana',
      author: 'Tim Ferriss',
      imageUrl: 'https://m.media-amazon.com/images/I/818FxH52VaL._SY425_.jpg',
      amazonUrl: 'https://amzn.to/49kq7KS',
      stars: 3.5,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-[1600px] mx-auto text-center mb-10 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t('title')}
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
              {t('techBooksTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {techBooks
                .sort((a, b) => (b.stars || 0) - (a.stars || 0))
                .map((book) => {
                  const recommendationKey = `recommendations.${book.id}`
                  const hasRecommendation = t.has(recommendationKey)

                  return (
                    <BookCard
                      key={book.id}
                      title={book.title}
                      author={book.author}
                      description={
                        hasRecommendation ? t(recommendationKey) : ''
                      }
                      imageUrl={book.imageUrl}
                      amazonUrl={book.amazonUrl}
                      ctaText={t('buyOnAmazon')}
                      stars={book.stars}
                    />
                  )
                })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
              {t('nonTechBooksTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {nonTechBooks
                .sort((a, b) => (b.stars || 0) - (a.stars || 0))
                .map((book) => {
                  const recommendationKey = `recommendations.${book.id}`
                  const hasRecommendation = t.has(recommendationKey)

                  return (
                    <BookCard
                      key={book.id}
                      title={book.title}
                      author={book.author}
                      description={
                        hasRecommendation ? t(recommendationKey) : ''
                      }
                      imageUrl={book.imageUrl}
                      amazonUrl={book.amazonUrl}
                      ctaText={t('buyOnAmazon')}
                      stars={book.stars}
                    />
                  )
                })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
