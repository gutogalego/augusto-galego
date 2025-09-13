export function TypographyShowcase() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Display */}
      <section className="space-y-4">
        <div className="text-subtitle">Display</div>
        <h1 className="text-display">
          Sistema Tipográfico <span className="gradient-text">Elegante</span>
        </h1>
      </section>

      {/* Headlines */}
      <section className="space-y-4">
        <div className="text-subtitle">Headlines</div>
        <h2 className="text-headline">Tipografia que Comunica com Clareza</h2>
      </section>

      {/* Titles */}
      <section className="space-y-4">
        <div className="text-subtitle">Titles</div>
        <h3 className="text-title">Hierarquia Visual Bem Definida</h3>
      </section>

      {/* Body Text */}
      <section className="space-y-4">
        <div className="text-subtitle">Body Text</div>
        <div className="space-y-4">
          <p className="text-body-large">
            Este é um exemplo de texto corpo grande. Perfeito para introduções e
            parágrafos de destaque que precisam de mais presença visual.
          </p>
          <p className="text-body">
            Este é o texto corpo padrão. Ideal para a maioria do conteúdo,
            oferecendo excelente legibilidade e conforto de leitura. A fonte
            serif adiciona elegância e sofisticação ao texto.
          </p>
        </div>
      </section>

      {/* Code */}
      <section className="space-y-4">
        <div className="text-subtitle">Code</div>
        <div className="space-y-2">
          <p className="text-body">
            Exemplo de código inline:{' '}
            <code className="text-code">const greeting = "Hello World"</code>
          </p>
          <pre className="bg-muted p-4 rounded-lg">
            <code className="text-code">
              {`function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
  );
}`}
            </code>
          </pre>
        </div>
      </section>

      {/* Caption */}
      <section className="space-y-4">
        <div className="text-subtitle">Caption</div>
        <p className="text-caption">
          Este é um texto de legenda. Usado para informações secundárias,
          metadados e descrições auxiliares.
        </p>
      </section>

      {/* Prose Example */}
      <section className="space-y-4">
        <div className="text-subtitle">Prose Elegant</div>
        <article className="prose-elegant">
          <h2>Exemplo de Artigo</h2>
          <p>
            Este é um exemplo de como o conteúdo de blog ficará com a nova
            tipografia. A combinação de <strong>serif para texto</strong> e
            <code>monospace para código</code> cria uma hierarquia visual clara.
          </p>

          <blockquote>
            "A tipografia é a voz silenciosa do design. Ela pode sussurrar ou
            gritar, mas nunca deve ser ignorada."
          </blockquote>

          <h3>Listas Elegantes</h3>
          <ul>
            <li>Sans-serif para interface e navegação</li>
            <li>Serif para conteúdo editorial e títulos</li>
            <li>Monospace para código e detalhes técnicos</li>
          </ul>

          <p>
            O resultado é uma experiência de leitura mais <em>sofisticada</em> e
            <a href="#teste">profissional</a>, inspirada nos melhores sites de
            design e tecnologia.
          </p>
        </article>
      </section>
    </div>
  )
}
