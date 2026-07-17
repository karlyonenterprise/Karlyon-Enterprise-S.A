// Sistema de idiomas — Karlyon Enterprise S.A.
// Traduz elementos marcados com data-i18n / data-i18n-placeholder.
// O idioma escolhido é guardado em localStorage e aplicado em todas as páginas.

const KARLYON_TRADUCOES = {
  pt: {
    "nav.inicio": "Início",
    "nav.cursos": "Cursos",
    "nav.servicos": "Serviços",
    "nav.artigos": "Artigos",
    "nav.sobre": "Sobre",
    "nav.contactos": "Contactos",

    "footer.direitos": "Todos os direitos reservados.",
    "footer.privacidade": "Privacidade",
    "footer.termos": "Termos de Uso",
    "footer.cookies": "Cookies",

    "btn.verCurso": "Ver Curso",
    "btn.voltarCursos": "Voltar aos Cursos",
    "btn.inscrever": "Inscrever-se Agora",
    "btn.entrar": "Entrar",
    "btn.criarConta": "Criar Conta",
    "btn.terminarSessao": "Terminar Sessão",
    "btn.enviar": "Enviar Mensagem",

    "painel.titulo": "Painel do Aluno",
    "painel.entrarTexto": "Entre com o seu e-mail e senha para aceder aos seus cursos.",
    "painel.criarTexto": "Crie a sua conta gratuita para se inscrever em cursos e acompanhar o seu progresso.",
    "painel.email": "E-mail",
    "painel.senha": "Senha",
    "painel.confirmarSenha": "Confirmar Senha",
    "painel.nomeCompleto": "Nome Completo",

    "video.embreve": "Vídeo em breve",
    "video.preparando": "Estamos a preparar este conteúdo para si",

    "curso.nivel": "Nível",
    "curso.preco": "Preço",
    "curso.certificado": "Certificado",
    "curso.modalidade": "Modalidade"
  },
  en: {
    "nav.inicio": "Home",
    "nav.cursos": "Courses",
    "nav.servicos": "Services",
    "nav.artigos": "Articles",
    "nav.sobre": "About",
    "nav.contactos": "Contact",

    "footer.direitos": "All rights reserved.",
    "footer.privacidade": "Privacy",
    "footer.termos": "Terms of Use",
    "footer.cookies": "Cookies",

    "btn.verCurso": "View Course",
    "btn.voltarCursos": "Back to Courses",
    "btn.inscrever": "Enroll Now",
    "btn.entrar": "Sign In",
    "btn.criarConta": "Create Account",
    "btn.terminarSessao": "Sign Out",
    "btn.enviar": "Send Message",

    "painel.titulo": "Student Panel",
    "painel.entrarTexto": "Sign in with your email and password to access your courses.",
    "painel.criarTexto": "Create your free account to enroll in courses and track your progress.",
    "painel.email": "Email",
    "painel.senha": "Password",
    "painel.confirmarSenha": "Confirm Password",
    "painel.nomeCompleto": "Full Name",

    "video.embreve": "Video coming soon",
    "video.preparando": "We're preparing this content for you",

    "curso.nivel": "Level",
    "curso.preco": "Price",
    "curso.certificado": "Certificate",
    "curso.modalidade": "Format"
  },
  fr: {
    "nav.inicio": "Accueil",
    "nav.cursos": "Cours",
    "nav.servicos": "Services",
    "nav.artigos": "Articles",
    "nav.sobre": "À propos",
    "nav.contactos": "Contact",

    "footer.direitos": "Tous droits réservés.",
    "footer.privacidade": "Confidentialité",
    "footer.termos": "Conditions d'Utilisation",
    "footer.cookies": "Cookies",

    "btn.verCurso": "Voir le Cours",
    "btn.voltarCursos": "Retour aux Cours",
    "btn.inscrever": "S'inscrire Maintenant",
    "btn.entrar": "Se Connecter",
    "btn.criarConta": "Créer un Compte",
    "btn.terminarSessao": "Se Déconnecter",
    "btn.enviar": "Envoyer le Message",

    "painel.titulo": "Espace Étudiant",
    "painel.entrarTexto": "Connectez-vous avec votre e-mail et mot de passe pour accéder à vos cours.",
    "painel.criarTexto": "Créez votre compte gratuit pour vous inscrire aux cours et suivre votre progression.",
    "painel.email": "E-mail",
    "painel.senha": "Mot de passe",
    "painel.confirmarSenha": "Confirmer le mot de passe",
    "painel.nomeCompleto": "Nom Complet",

    "video.embreve": "Vidéo bientôt disponible",
    "video.preparando": "Nous préparons ce contenu pour vous",

    "curso.nivel": "Niveau",
    "curso.preco": "Prix",
    "curso.certificado": "Certificat",
    "curso.modalidade": "Format"
  }
};

function karlyonIdiomaAtual() {
  return localStorage.getItem('karlyon_idioma') || 'pt';
}

function karlyonAplicarIdioma(lang) {
  if (!KARLYON_TRADUCOES[lang]) lang = 'pt';
  const dict = KARLYON_TRADUCOES[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('karlyon_idioma', lang);

  document.querySelectorAll('.lang-switch [data-lang]').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('lang-ativo');
    } else {
      btn.classList.remove('lang-ativo');
    }
  });
}

function karlyonInicializarSeletorIdioma() {
  document.querySelectorAll('.lang-switch [data-lang]').forEach(btn => {
    btn.addEventListener('click', () => karlyonAplicarIdioma(btn.getAttribute('data-lang')));
  });
  karlyonAplicarIdioma(karlyonIdiomaAtual());
}

document.addEventListener('DOMContentLoaded', karlyonInicializarSeletorIdioma);
