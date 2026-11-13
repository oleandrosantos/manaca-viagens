import { getPayload } from 'payload'
import config from './payload.config'
import institucionalData from './data/institucional.json' with { type: 'json' }

function toLexicalRichText(text: string) {
  const paragraphs = text.split('\n\n').filter(Boolean)
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((p) => ({
        type: 'paragraph',
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: p.trim(),
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
      })),
    },
  }
}

export async function runSeed() {
  const payload = await getPayloadClient()

  // 1. Criar usuário admin inicial se não existir
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@manacaviagens.com.br',
        password: 'admin-manaca-2026',
        name: 'Adjane Costa',
      },
    })
    console.log(
      'Admin user criado: admin@manacaviagens.com.br / admin-manaca-2026',
    )
  }

  // 2. Popular o Global Institucional com os dados originais
  await payload.updateGlobal({
    slug: 'institucional',
    data: {
      heroEyebrow: institucionalData.heroEyebrow,
      heroTitle: institucionalData.heroTitle,
      heroDescription: institucionalData.heroDescription,
      introTitle: institucionalData.introTitle,
      introText: institucionalData.introText,
      founderText: institucionalData.founderText,
      destinosTexto: institucionalData.destinosTexto,
      diarioTexto: institucionalData.diarioTexto,
      nomeTexto: institucionalData.nomeTexto.map((paragrafo: string) => ({
        paragrafo,
      })),
      historiaTexto: institucionalData.historiaTexto.map(
        (paragrafo: string) => ({ paragrafo }),
      ),
      adjaneTexto: institucionalData.adjaneTexto.map((paragrafo: string) => ({
        paragrafo,
      })),
      beneficios: institucionalData.beneficios,
      jornada: institucionalData.jornada,
      incluido: institucionalData.incluido.map((item: string) => ({ item })),
      publico: institucionalData.publico.map((item: string) => ({ item })),
      contatos: {
        instagram: 'https://www.instagram.com/manacaviagens/',
        instagramLabel: '@manacaviagens',
        whatsapp: 'https://wa.me/5571986233609',
        whatsappLabel: '(71) 98623-3609',
        email: 'mailto:manacaviagens1@hotmail.com',
        emailLabel: 'manacaviagens1@hotmail.com',
      },
    },
  })
  console.log('Global Institucional populado com sucesso.')

  // 3. Popular ou atualizar Destinos com Rich Text
  const chapadaText = `A Chapada Diamantina encanta com suas montanhas, cachoeiras, vales e grutas, convidando a desacelerar e se conectar com a natureza. Entre paisagens surpreendentes, sabores regionais e cultura local, é um destino para explorar sem pressa e viver experiências autênticas, que permanecem na memória.\n\nEntre serras, cachoeiras e caminhos de pedra, a Chapada Diamantina convida a explorar a natureza com tempo e atenção.\n\nCada viagem pode ganhar um desenho próprio. A consultoria considera seus interesses e seu ritmo para orientar as escolhas do percurso.`
  const mantiqueiraText = `A Serra da Mantiqueira encanta com suas montanhas, araucárias, vales verdejantes e paisagens envoltas pela neblina, convidando a desacelerar e se conectar com a natureza. Entre cafés especiais, sabores regionais e experiências acolhedoras, é um destino para aproveitar a tranquilidade, explorar sem pressa e descobrir os encantos da região.\n\nEntre montanhas e cidades serranas, a Mantiqueira convida a desacelerar e apreciar a paisagem, a cultura e os sabores locais.\n\nCada viagem pode ganhar um desenho próprio. A consultoria considera seus interesses e seu ritmo para orientar as escolhas do percurso.`

  const existingDestinos = await payload.find({
    collection: 'destinos',
    limit: 10,
  })

  if (existingDestinos.totalDocs === 0) {
    await payload.create({
      collection: 'destinos',
      data: {
        title: 'Chapada Diamantina',
        slug: 'chapada-diamantina',
        region: 'Bahia · Brasil',
        summary:
          'Um convite para descobrir a Chapada Diamantina no seu ritmo.',
        image: '/media/chapada.jpeg',
        content: toLexicalRichText(chapadaText),
        draft: false,
      },
    })

    await payload.create({
      collection: 'destinos',
      data: {
        title: 'Serra da Mantiqueira',
        slug: 'serra-da-mantiqueira',
        region: 'Sudeste · Brasil',
        summary:
          'Um convite para descobrir a Serra da Mantiqueira no seu ritmo.',
        image: '/media/mantiqueira.jpg',
        content: toLexicalRichText(mantiqueiraText),
        draft: false,
      },
    })
    console.log('Destinos criados com sucesso.')
  } else {
    // Atualizar destinos para garantir formato Rich Text
    for (const doc of existingDestinos.docs) {
      const textToUse =
        doc.slug === 'chapada-diamantina' ? chapadaText : mantiqueiraText
      await payload.update({
        collection: 'destinos',
        id: doc.id,
        data: {
          content: toLexicalRichText(textToUse),
        },
      })
    }
    console.log('Destinos atualizados para Rich Text.')
  }

  // 4. Popular ou atualizar Posts do Diário da Manacá (originais de BLOG.docx)
  const blogPosts = [
    {
      title: 'Como viajar de forma mais consciente sem complicação',
      slug: 'como-viajar-de-forma-mais-consciente-sem-complicacao',
      date: '2026-11-01T12:00:00.000Z',
      summary:
        'Viajar de forma consciente não significa abrir mão do conforto ou transformar as férias em uma lista de regras. Muito pelo contrário. Trata-se de prestar mais atenção às pequenas escolhas que fazemos durante o caminho.',
      text: [
        'Viajar de forma consciente não significa abrir mão do conforto ou transformar as férias em uma lista de regras. Muito pelo contrário. Trata-se de prestar mais atenção às pequenas escolhas que fazemos durante o caminho.',
        'Escolher uma pousada administrada por moradores da região, almoçar em um restaurante que valoriza ingredientes locais ou comprar um artesanato produzido pela comunidade são atitudes simples que fortalecem a economia do destino e tornam a experiência muito mais autêntica.',
        'Também vale levar uma garrafa reutilizável, evitar desperdícios, respeitar as trilhas e conhecer cada lugar com calma, sem a pressa de "ver tudo". Muitas vezes, são esses pequenos gestos que deixam os maiores impactos positivos.',
        'Viajar de forma consciente é entender que cada destino nos recebe com histórias, pessoas e paisagens únicas. E a melhor maneira de agradecer essa hospitalidade é cuidar desses lugares para que outras pessoas também possam vivê-los no futuro.',
      ].join('\n\n'),
    },
    {
      title: 'Pequenas atitudes que fazem a diferença durante a viagem',
      slug: 'pequenas-atitudes-que-fazem-a-diferenca-durante-a-viagem',
      date: '2026-11-03T12:00:00.000Z',
      summary:
        'Quando pensamos em sustentabilidade, é comum imaginarmos grandes mudanças. Mas, durante uma viagem, são justamente as pequenas atitudes que fazem a diferença.',
      text: [
        'Quando pensamos em sustentabilidade, é comum imaginarmos grandes mudanças. Mas, durante uma viagem, são justamente as pequenas atitudes que fazem a diferença.',
        'Um banho um pouco mais curto. Apagar as luzes antes de sair do quarto. Levar uma ecobag para pequenas compras. Dar preferência aos produtores locais. Caminhar quando possível. Separar corretamente os resíduos quando houver coleta seletiva.',
        'Nenhuma dessas atitudes exige esforço extraordinário, mas todas contribuem para tornar a viagem mais responsável.',
        'Além de beneficiar o destino, essas escolhas também transformam a forma como viajamos. Passamos a observar mais, consumir com consciência e valorizar aquilo que realmente importa.',
        'Viajar bem também é cuidar dos lugares que nos acolhem.',
      ].join('\n\n'),
    },
    {
      title: 'O valor das experiências simples',
      slug: 'o-valor-das-experiencias-simples',
      date: '2026-11-05T12:00:00.000Z',
      summary:
        'Nem sempre as melhores lembranças de uma viagem estão nos passeios mais famosos.',
      text: [
        'Nem sempre as melhores lembranças de uma viagem estão nos passeios mais famosos.',
        'Às vezes, elas acontecem enquanto observamos um pôr do sol, tomamos um café com vista para as montanhas ou conversamos com alguém que vive naquele destino.',
        'As experiências simples nos convidam a desacelerar e perceber detalhes que normalmente passam despercebidos na correria do dia a dia.',
        'É justamente nesses momentos que criamos conexões verdadeiras com os lugares, com as pessoas e até conosco.',
        'Na Manacá, acreditamos que viajar não precisa ser uma corrida para conhecer o maior número possível de atrações. Muitas vezes, basta viver cada momento com presença.',
        'Porque algumas lembranças não precisam ser grandiosas para serem inesquecíveis.',
      ].join('\n\n'),
    },
    {
      title: 'O que torna a Chapada Diamantina tão especial',
      slug: 'o-que-torna-a-chapada-diamantina-tao-especial',
      date: '2026-11-07T12:00:00.000Z',
      summary:
        'A Chapada Diamantina encanta pelas paisagens impressionantes, mas seu verdadeiro diferencial vai muito além das cachoeiras e montanhas.',
      text: [
        'A Chapada Diamantina encanta pelas paisagens impressionantes, mas seu verdadeiro diferencial vai muito além das cachoeiras e montanhas.',
        'Ali, a natureza convive com comunidades acolhedoras, histórias preservadas e uma cultura que convida o visitante a desacelerar.',
        'Cada trilha revela novas paisagens. Cada conversa aproxima o viajante da essência do lugar. Cada refeição preparada com ingredientes locais conta um pouco da identidade da região.',
        'É um destino para quem gosta de contemplar, caminhar, respirar ar puro e viver experiências que permanecem na memória.',
        'Mais do que visitar um lugar bonito, viajar para a Chapada Diamantina é permitir que a natureza ensine um novo ritmo de viver.',
      ].join('\n\n'),
    },
    {
      title: 'Como desacelerar na Serra da Mantiqueira',
      slug: 'como-desacelerar-na-serra-da-mantiqueira',
      date: '2026-11-09T12:00:00.000Z',
      summary: 'A Serra da Mantiqueira parece ter um ritmo próprio.',
      text: [
        'A Serra da Mantiqueira parece ter um ritmo próprio.',
        'Ali, o tempo convida a acordar sem pressa, apreciar um café da manhã preparado com carinho, caminhar entre araucárias e simplesmente observar a paisagem.',
        'Não existe obrigação de cumprir horários ou visitar dezenas de atrações em um único dia.',
        'Às vezes, o melhor programa é sentar na varanda de uma pousada, ouvir o canto dos pássaros e sentir o ar fresco das montanhas.',
        'Monte Verde, Santo Antônio do Pinhal e Campos do Jordão oferecem experiências diferentes, mas compartilham algo em comum: o convite para viver com mais calma.',
        'Viajar pela Mantiqueira é lembrar que descansar também faz parte da viagem.',
      ].join('\n\n'),
    },
    {
      title: 'Turismo sustentável: cuidar do destino também faz parte da viagem',
      slug: 'turismo-sustentavel-cuidar-do-destino-tambem-faz-parte-da-viagem',
      date: '2026-11-11T12:00:00.000Z',
      summary:
        'Quando viajamos, levamos conosco nossos hábitos, nossas escolhas e a forma como nos relacionamos com o lugar que estamos visitando.',
      text: [
        'Quando viajamos, levamos conosco nossos hábitos, nossas escolhas e a forma como nos relacionamos com o lugar que estamos visitando.',
        'O turismo sustentável nasce justamente dessa consciência.',
        'Não se trata de tornar a viagem complicada ou cheia de regras, mas de entender que cada pequena atitude pode contribuir para preservar a natureza, fortalecer comunidades locais e incentivar práticas mais responsáveis.',
        'Hospedar-se em pequenos empreendimentos, valorizar restaurantes da região, respeitar a cultura local e consumir de forma consciente são maneiras simples de gerar impactos positivos.',
        'Na Manacá, acreditamos que viajar pode ser uma experiência transformadora para quem parte e também para quem recebe.',
        'Porque cuidar do destino também é uma forma de agradecer tudo o que ele nos proporciona.',
      ].join('\n\n'),
    },
  ]

  for (const post of blogPosts) {
    const existing = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: post.slug,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          date: post.date,
          author: 'Adjane Costa',
          summary: post.summary,
          content: toLexicalRichText(post.text),
          draft: false,
        },
      })
    } else {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        data: {
          title: post.title,
          summary: post.summary,
          content: toLexicalRichText(post.text),
          draft: false,
        },
      })
    }
  }
  console.log('Posts do Diário da Manacá populados com sucesso.')
}

async function getPayloadClient() {
  return await getPayload({ config })
}

runSeed()
  .then(() => {
    console.log('Seed finalizado com sucesso.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Erro no seed:', err)
    process.exit(1)
  })
