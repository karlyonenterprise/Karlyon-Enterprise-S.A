// Dados centralizados de todos os cursos - ESCALÁVEL
const CURSOS_DATABASE = {
  // Categoria: Empreendedorismo
  "plano-negocio-pratico": {
    id: "plano-negocio-pratico",
    titulo: "Plano de Negócio Prático",
    categoria: "Empreendedorismo",
    emoji: "💰",
    descricaoBreve: "Ensinar a elaborar um plano de negócio estruturado e apresentá-lo de forma profissional.",
    imagem: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    videoYouTubeId: "dQw4w9WgXcQ", // Placeholder - substituir pelo ID real
    duracao: "15 horas",
    modalidade: "Online",
    nivel: "Intermediário",
    certificado: "Sim - Digital e Físico",
    requisitos: "Noções básicas de gestão ou vontade de empreender",
    preco: "750 MZN",
    descricaoCompleta: "<h3>Objetivo do Curso</h3><p>Este curso prático foi concebido para capacitar empreendedores, gestores e profissionais na elaboração de um plano de negócio estruturado, profissional e viável. Aprenderá a criar documentos que impressionam investidores e orientam o desenvolvimento da sua empresa.</p><h3>O que vai aprender</h3><p>Ao longo deste curso, vai dominar os componentes essenciais de um plano de negócio, desde a análise de mercado até à estratégia financeira e ao plano de ação. Cada módulo combina teoria com exercícios práticos aplicados ao seu negócio específico.</p><h3>Módulos</h3><ul><li><strong>Estrutura do Plano de Negócio:</strong> Componentes principais e organização</li><li><strong>Análise de Mercado:</strong> Investigação e oportunidades</li><li><strong>Proposta de Valor:</strong> Diferencial competitivo</li><li><strong>Finanças e Viabilidade:</strong> Projeções financeiras e análise de risco</li><li><strong>Estratégia e Marketing:</strong> Posicionamento no mercado</li><li><strong>Apresentação Profissional:</strong> Pitch e apresentação a investidores</li></ul><h3>Metodologia</h3><p>O curso utiliza uma abordagem prática com estudos de caso reais do mercado moçambicano. Cada participante elaborará o seu próprio plano de negócio, recebendo feedback personalizado do instructor.</p>",
    topicos: ["Estrutura do Plano de Negócio", "Pesquisa de Mercado", "Finanças e Viabilidade", "Estratégia e Marketing", "Apresentação Profissional"],
    metaDescricao: "Aprenda a elaborar um plano de negócio profissional e estruturado. Curso prático com certificação reconhecida - 15 horas de formação."
  },

  "marketing-digital-inteligente": {
    id: "marketing-digital-inteligente",
    titulo: "Marketing Digital Inteligente",
    categoria: "Marketing Digital",
    emoji: "📈",
    descricaoBreve: "Capacitar na criação e gestão de estratégias digitais modernas, incluindo uso de IA, para publicidade e promoção.",
    imagem: "https://images.unsplash.com/photo-1460925895917-adf4e565e479?auto=format&fit=crop&w=800&q=80",
    videoYouTubeId: "dQw4w9WgXcQ",
    duracao: "15 horas",
    modalidade: "Online",
    nivel: "Intermediário",
    certificado: "Sim - Digital e Físico",
    requisitos: "Conhecimentos básicos de internet e redes sociais",
    preco: "750 MZN",
    descricaoCompleta: "<h3>Objetivo do Curso</h3><p>Neste curso prático, vai aprender a planear, executar e otimizar campanhas de marketing digital usando as ferramentas mais modernas e tendências atuais do mercado, incluindo inteligência artificial.</p><h3>O que vai aprender</h3><p>Desde a criação de conteúdo atrativo até ao uso estratégico de IA para segmentação de públicos, este curso o equipará com habilidades práticas e imediatas para aplicar no seu negócio.</p><h3>Módulos</h3><ul><li><strong>Fundamentos de Marketing Digital:</strong> Estratégia e planeamento</li><li><strong>Redes Sociais e Conteúdos:</strong> Criação e gestão de conteúdo viral</li><li><strong>Inteligências Artificiais para Marketing:</strong> Ferramentas de IA aplicadas</li><li><strong>Tráfego Pago e Segmentação:</strong> Google Ads, Meta Ads e publicidade direcionada</li><li><strong>Branding e Logotipos Digitais:</strong> Identidade visual na era digital</li><li><strong>Análise de Resultados e KPIs:</strong> Medição e otimização de campanhas</li></ul><h3>Metodologia</h3><p>Prático e orientado por dados. Trabalharemos com ferramentas reais e criará campanha de marketing funcional durante o curso.</p>",
    topicos: ["Redes Sociais e Conteúdos", "Inteligências Artificiais para Marketing", "Tráfego Pago e Segmentação", "Branding e Logotipos Digitais", "Análise de Resultados e KPIs"],
    metaDescricao: "Domine marketing digital moderno com IA. Curso completo em estratégia digital, redes sociais e publicidade paga - 15 horas."
  },

  // Categoria: Académica
  "projeto-academico": {
    id: "projeto-academico",
    titulo: "Projeto Académico",
    categoria: "Académica",
    emoji: "🎓",
    descricaoBreve: "Capacitar estudantes na elaboração de projetos de pesquisa e monografias, aplicando normas académicas e objetivos claros.",
    imagem: "https://images.unsplash.com/photo-1427915591429-2c18565a266a?auto=format&fit=crop&w=800&q=80",
    videoYouTubeId: "dQw4w9WgXcQ",
    duracao: "15 horas",
    modalidade: "Online",
    nivel: "Intermédio",
    certificado: "Sim - Digital e Físico",
    requisitos: "Estar inscrito em instituição de ensino superior",
    preco: "750 MZN",
    descricaoCompleta: "<h3>Objetivo do Curso</h3><p>Este curso foi especialmente desenhado para estudantes do ensino superior que precisam de orientação estruturada na elaboração de projetos de pesquisa, monografias e trabalhos académicos com qualidade profissional.</p><h3>O que vai aprender</h3><p>Aprenderá a estruturar uma pesquisa académica rigorosa, desde a definição clara do tema até à apresentação final, aplicando normas internacionais reconhecidas.</p><h3>Módulos</h3><ul><li><strong>Estrutura do Projeto de Pesquisa:</strong> Elementos obrigatórios e opcionais</li><li><strong>Definição de Objetivos e Verbos:</strong> Clareza e precisão</li><li><strong>Normas de Citação:</strong> APA 6ª e 7ª edição, Harvard e outras</li><li><strong>Revisão e Adaptação Académica:</strong> Qualidade textual</li><li><strong>Monografia e Preparação para Apresentação:</strong> Defesa oral</li><li><strong>Ferramentas de Pesquisa:</strong> Bases de dados académicas</li></ul><h3>Metodologia</h3><p>O curso combina apresentações teóricas com exercícios práticos. Cada participante trabalhará no seu próprio projeto, recebendo feedback especializado do docente.</p>",
    topicos: ["Estrutura do Projeto de Pesquisa", "Definição de Objetivos e Verbos", "Normas de Citação (APA 6ª e 7ª edição)", "Revisão e Adaptação Académica", "Monografia e Preparação para Apresentação"],
    metaDescricao: "Curso para elaboração de projetos académicos e monografias com normas APA. Ideal para estudantes de ensino superior."
  },

  "softwares-educativos": {
    id: "softwares-educativos",
    titulo: "Softwares Educativos",
    categoria: "Académica",
    emoji: "🎓",
    descricaoBreve: "Ensinar o uso de softwares educativos e IA para ensino, aprendizagem e pesquisa académica.",
    imagem: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    videoYouTubeId: "dQw4w9WgXcQ",
    duracao: "12 horas",
    modalidade: "Online",
    nivel: "Iniciante",
    certificado: "Sim - Digital",
    requisitos: "Acesso a computador com internet",
    preco: "750 MZN",
    descricaoCompleta: "<h3>Objetivo do Curso</h3><p>Este curso abrange as principais plataformas e softwares utilizados em ambientes educativos modernos, desde gestão de salas de aula até ferramentas de pesquisa académica potenciadas por IA.</p><h3>O que vai aprender</h3><p>Você dominará as ferramentas que professores e estudantes utilizam diariamente, aumentando produtividade e qualidade educativa.</p><h3>Módulos</h3><ul><li><strong>Softwares para Ensino e Gestão de Aulas:</strong> Google Classroom, Moodle, Teams</li><li><strong>Softwares para Pesquisa Académica:</strong> Mendeley, Zotero, EndNote</li><li><strong>IA Personalizada para Pesquisa:</strong> ChatGPT, Claude, Gemini para educação</li><li><strong>Integração e Automação de Ferramentas:</strong> Zapier, IFTTT</li><li><strong>Boas Práticas e Ética Digital:</strong> Uso responsável de IA</li></ul><h3>Metodologia</h3><p>Prático e hands-on. Cada sessão inclui demonstração ao vivo seguida de exercício prático com as ferramentas reais.</p>",
    topicos: ["Softwares para Ensino e Gestão de Aulas", "Softwares para Pesquisa Académica", "IA Personalizada para Pesquisa", "Integração e Automação de Ferramentas", "Boas Práticas e Ética Digital"],
    metaDescricao: "Aprenda softwares educativos e IA para potenciar ensino e pesquisa. Ferramentas Classroom, Mendeley, ChatGPT e muito mais."
  },

  // Categoria: Editora
  "cv-carta-profissional": {
    id: "cv-carta-profissional",
    titulo: "CV & Carta Profissional",
    categoria: "Editora",
    emoji: "📚",
    descricaoBreve: "Ensinar a criar currículos e cartas de motivação adaptados a diferentes contextos profissionais, públicos e privados.",
    imagem: "https://images.unsplash.com/photo-1633356713618-e139a11772ea?auto=format&fit=crop&w=800&q=80",
    videoYouTubeId: "dQw4w9WgXcQ",
    duracao: "10 horas",
    modalidade: "Online",
    nivel: "Iniciante",
    certificado: "Sim - Digital",
    requisitos: "Nenhum - aberto a todos",
    preco: "750 MZN",
    descricaoCompleta: "<h3>Objetivo do Curso</h3><p>Este curso prático ensina a criar currículos modernos, visuais e persuasivos, bem como cartas de motivação impactantes, adaptadas às exigências do mercado contemporâneo.</p><h3>O que vai aprender</h3><p>Dominará as técnicas de redação, formatação e marketing pessoal que fazem um CV destacar-se entre centenas de candidatos.</p><h3>Módulos</h3><ul><li><strong>Currículo Moderno: Estrutura e Elementos:</strong> Componentes essenciais</li><li><strong>Currículo Público vs Privado:</strong> Adaptação por setor</li><li><strong>Cartas de Motivação: Estrutura e Impacto:</strong> Narração persuasiva</li><li><strong>Design e Formatação:</strong> Ferramentas e templates</li><li><strong>Personalização e Diferenciação:</strong> Destaque competitivo</li><li><strong>Erros Comuns e Boas Práticas:</strong> Revisão crítica</li></ul><h3>Metodologia</h3><p>Trabalho direto com documentos reais. Cada participante criará e revisará o seu próprio CV durante o curso, com feedback do docente.</p>",
    topicos: ["Currículo Moderno: Estrutura e Elementos", "Currículo Público vs Privado", "Cartas de Motivação: Estrutura e Impacto", "Personalização e Diferenciação", "Erros Comuns e Boas Práticas"],
    metaDescricao: "Crie um CV profissional e carta de motivação impactante. Curso prático para destaque no mercado de trabalho."
  }
};

// Função para obter um curso específico
function obterCurso(id) {
  return CURSOS_DATABASE[id] || null;
}

// Função para obter todos os cursos de uma categoria
function obterCursosPorCategoria(categoria) {
  return Object.values(CURSOS_DATABASE).filter(
    curso => curso.categoria === categoria
  );
}

// Função para obter todas as categorias
function obterCategorias() {
  const categorias = new Set();
  Object.values(CURSOS_DATABASE).forEach(curso => {
    categorias.add(curso.categoria);
  });
  return Array.from(categorias).sort();
}

// Função para obter todos os cursos
function obterTodosCursos() {
  return Object.values(CURSOS_DATABASE);
}

// Função para processar slugs URL para IDs de cursos
function slugParaId(slug) {
  // O slug é o mesmo que o ID (ex: "plano-negocio-pratico")
  return slug;
}

// Função para gerar slug de ID
function idParaSlug(id) {
  return id;
}
