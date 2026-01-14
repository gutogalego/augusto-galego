import { generateLocalizedMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return await generateLocalizedMetadata(locale, 'privacy')
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <article className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
        <h1>Política de Privacidade</h1>

        <p>
          A sua privacidade é importante para nós. É política do Augusto Galego
          respeitar a sua privacidade em relação a qualquer informação sua que
          possamos coletar no site{' '}
          <a href="https://www.augustogalego.com">Augusto Galego</a>, e outros
          sites que possuímos e operamos.
        </p>

        <p>
          Solicitamos informações pessoais apenas quando realmente precisamos
          delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
          legais, com o seu conhecimento e consentimento. Também informamos por
          que estamos coletando e como será usado.
        </p>

        <p>
          Apenas retemos as informações coletadas pelo tempo necessário para
          fornecer o serviço solicitado. Quando armazenamos dados, protegemos
          dentro de meios comercialmente aceitáveis para evitar perdas e roubos,
          bem como acesso, divulgação, cópia, uso ou modificação não
          autorizados.
        </p>

        <p>
          Não compartilhamos informações de identificação pessoal publicamente
          ou com terceiros, exceto quando exigido por lei.
        </p>

        <p>
          O nosso site pode ter links para sites externos que não são operados
          por nós. Esteja ciente de que não temos controle sobre o conteúdo e
          práticas desses sites e não podemos aceitar responsabilidade por suas
          respectivas{' '}
          <a
            href="https://politicaprivacidade.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            políticas de privacidade
          </a>
          .
        </p>

        <p>
          Você é livre para recusar a nossa solicitação de informações pessoais,
          entendendo que talvez não possamos fornecer alguns dos serviços
          desejados.
        </p>

        <p>
          O uso continuado de nosso site será considerado como aceitação de
          nossas práticas em torno de privacidade e informações pessoais. Se
          você tiver alguma dúvida sobre como lidamos com dados do usuário e
          informações pessoais, entre em contacto connosco.
        </p>

        <h3>Cookies e Publicidade</h3>

        <ul>
          <li>
            O serviço Google AdSense que usamos para veicular publicidade usa um
            cookie DoubleClick para veicular anúncios mais relevantes em toda a
            Web e limitar o número de vezes que um determinado anúncio é exibido
            para você.
          </li>
          <li>
            Para mais informações sobre o Google AdSense, consulte as FAQs
            oficiais sobre privacidade do Google AdSense.
          </li>
          <li>
            Utilizamos anúncios para compensar os custos de funcionamento deste
            site e fornecer financiamento para futuros desenvolvimentos. Os
            cookies de publicidade comportamental usados por este site foram
            projetados para garantir que você forneça os anúncios mais
            relevantes sempre que possível, rastreando anonimamente seus
            interesses e apresentando coisas semelhantes que possam ser do seu
            interesse.
          </li>
          <li>
            Vários parceiros anunciam em nosso nome e os cookies de rastreamento
            de afiliados simplesmente nos permitem ver se nossos clientes
            acessaram o site através de um dos sites de nossos parceiros, para
            que possamos creditá-los adequadamente e, quando aplicável, permitir
            que nossos parceiros afiliados ofereçam qualquer promoção que pode
            fornecê-lo para fazer uma compra.
          </li>
        </ul>

        <h3>Compromisso do Usuário</h3>

        <p>
          O usuário se compromete a fazer uso adequado dos conteúdos e da
          informação que o Augusto Galego oferece no site e com caráter
          enunciativo, mas não limitativo:
        </p>

        <ul>
          <li>
            A) Não se envolver em atividades que sejam ilegais ou contrárias à
            boa fé a à ordem pública;
          </li>
          <li>
            B) Não difundir propaganda ou conteúdo de natureza racista,
            xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia
            ilegal, de apologia ao terrorismo ou contra os direitos humanos;
          </li>
          <li>
            C) Não causar danos aos sistemas físicos (hardwares) e lógicos
            (softwares) do Augusto Galego, de seus fornecedores ou terceiros,
            para introduzir ou disseminar vírus informáticos ou quaisquer outros
            sistemas de hardware ou software que sejam capazes de causar danos
            anteriormente mencionados.
          </li>
        </ul>

        <h3>Mais informações</h3>

        <p>
          Esperemos que esteja esclarecido e, como mencionado anteriormente, se
          houver algo que você não tem certeza se precisa ou não, geralmente é
          mais seguro deixar os cookies ativados, caso interaja com um dos
          recursos que você usa em nosso site.
        </p>

        <p>Esta política é efetiva a partir de 1 de Janeiro de 2026</p>

        <hr className="my-12" />

        <h1>Termos de Uso</h1>

        <h2>1. Termos</h2>

        <p>
          Ao acessar ao site{' '}
          <a href="https://www.augustogalego.com">Augusto Galego</a>, concorda
          em cumprir estes termos de serviço, todas as leis e regulamentos
          aplicáveis e concorda que é responsável pelo cumprimento de todas as
          leis locais aplicáveis. Se você não concordar com algum desses termos,
          está proibido de usar ou acessar este site. Os materiais contidos
          neste site são protegidos pelas leis de direitos autorais e marcas
          comerciais aplicáveis.
        </p>

        <h2>2. Uso de Licença</h2>

        <p>
          É concedida permissão para baixar temporariamente uma cópia dos
          materiais (informações ou software) no site Augusto Galego, apenas
          para visualização transitória pessoal e não comercial. Esta é a
          concessão de uma licença, não uma transferência de título e, sob esta
          licença, você não pode:
        </p>

        <ol>
          <li>modificar ou copiar os materiais;</li>
          <li>
            usar os materiais para qualquer finalidade comercial ou para
            exibição pública (comercial ou não comercial);
          </li>
          <li>
            tentar descompilar ou fazer engenharia reversa de qualquer software
            contido no site Augusto Galego;
          </li>
          <li>
            remover quaisquer direitos autorais ou outras notações de
            propriedade dos materiais; ou
          </li>
          <li>
            transferir os materiais para outra pessoa ou espelhe os materiais em
            qualquer outro servidor.
          </li>
        </ol>

        <p>
          Esta licença será automaticamente rescindida se você violar alguma
          dessas restrições e poderá ser rescindida por Augusto Galego a
          qualquer momento. Ao encerrar a visualização desses materiais ou após
          o término desta licença, você deve apagar todos os materiais baixados
          em sua posse, seja em formato eletrónico ou impresso.
        </p>

        <h2>3. Isenção de responsabilidade</h2>

        <ol>
          <li>
            Os materiais no site da Augusto Galego são fornecidos como estão.
            Augusto Galego não oferece garantias, expressas ou implícitas, e,
            por este meio, isenta e nega todas as outras garantias, incluindo,
            sem limitação, garantias implícitas ou condições de comercialização,
            adequação a um fim específico ou não violação de propriedade
            intelectual ou outra violação de direitos.
          </li>
          <li>
            Além disso, o Augusto Galego não garante ou faz qualquer
            representação relativa à precisão, aos resultados prováveis ou à
            confiabilidade do uso dos materiais em seu site ou de outra forma
            relacionado a esses materiais ou em sites vinculados a este site.
          </li>
        </ol>

        <h2>4. Limitações</h2>

        <p>
          Em nenhum caso o Augusto Galego ou seus fornecedores serão
          responsáveis por quaisquer danos (incluindo, sem limitação, danos por
          perda de dados ou lucro ou devido a interrupção dos negócios)
          decorrentes do uso ou da incapacidade de usar os materiais em Augusto
          Galego, mesmo que Augusto Galego ou um representante autorizado da
          Augusto Galego tenha sido notificado oralmente ou por escrito da
          possibilidade de tais danos. Como algumas jurisdições não permitem
          limitações em garantias implícitas, ou limitações de responsabilidade
          por danos conseqüentes ou incidentais, essas limitações podem não se
          aplicar a você.
        </p>

        <h2>5. Precisão dos materiais</h2>

        <p>
          Os materiais exibidos no site da Augusto Galego podem incluir erros
          técnicos, tipográficos ou fotográficos. Augusto Galego não garante que
          qualquer material em seu site seja preciso, completo ou atual. Augusto
          Galego pode fazer alterações nos materiais contidos em seu site a
          qualquer momento, sem aviso prévio. No entanto, Augusto Galego não se
          compromete a atualizar os materiais.
        </p>

        <h2>6. Links</h2>

        <p>
          O Augusto Galego não analisou todos os sites vinculados ao seu site e
          não é responsável pelo conteúdo de nenhum site vinculado. A inclusão
          de qualquer link não implica endosso por Augusto Galego do site. O uso
          de qualquer site vinculado é por conta e risco do usuário.
        </p>

        <h3>Modificações</h3>

        <p>
          O Augusto Galego pode revisar estes termos de serviço do site a
          qualquer momento, sem aviso prévio. Ao usar este site, você concorda
          em ficar vinculado à versão atual desses termos de serviço.
        </p>

        <h3>Lei aplicável</h3>

        <p>
          Estes termos e condições são regidos e interpretados de acordo com as
          leis do Augusto Galego e você se submete irrevogavelmente à jurisdição
          exclusiva dos tribunais naquele estado ou localidade.
        </p>
      </article>
    </div>
  )
}
