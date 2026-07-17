// Gerenciador de Cursos - Lógica central de autenticação e funcionalidades

class GerenciadorCursos {
  constructor() {
    this.usuarioLogado = this.verificarSessao();
    this.cursoAtual = null;
  }

  // ===== AUTENTICAÇÃO =====
  verificarSessao() {
    const sessao = localStorage.getItem('aluno_sessao');
    if (sessao) {
      try {
        return JSON.parse(sessao);
      } catch (e) {
        localStorage.removeItem('aluno_sessao');
        return null;
      }
    }
    return null;
  }

  // Nota: esta é uma autenticação simples do lado do cliente (localStorage),
  // pensada para demonstração/protótipo. Para produção, ligar a um backend seguro.
  obterContas() {
    try {
      return JSON.parse(localStorage.getItem('karlyon_contas') || '{}');
    } catch (e) {
      return {};
    }
  }

  salvarContas(contas) {
    localStorage.setItem('karlyon_contas', JSON.stringify(contas));
  }

  registar(nome, email, senha, confirmarSenha) {
    nome = (nome || '').trim();
    email = (email || '').trim().toLowerCase();

    if (!nome || !email || !senha || !confirmarSenha) {
      return { sucesso: false, erro: 'Preencha todos os campos' };
    }
    if (nome.length < 3) {
      return { sucesso: false, erro: 'Nome deve ter pelo menos 3 caracteres' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { sucesso: false, erro: 'Introduza um e-mail válido' };
    }
    if (senha.length < 4) {
      return { sucesso: false, erro: 'Senha deve ter pelo menos 4 caracteres' };
    }
    if (senha !== confirmarSenha) {
      return { sucesso: false, erro: 'As senhas não coincidem' };
    }

    const contas = this.obterContas();
    if (contas[email]) {
      return { sucesso: false, erro: 'Já existe uma conta com este e-mail. Tente entrar.' };
    }

    contas[email] = { nome, email, senha, dataCriacao: new Date().toISOString() };
    this.salvarContas(contas);

    return this.autenticar(email, senha);
  }

  autenticar(email, senha) {
    email = (email || '').trim().toLowerCase();

    if (!email || !senha) {
      return { sucesso: false, erro: 'Preencha todos os campos' };
    }

    const contas = this.obterContas();
    const conta = contas[email];

    if (!conta || conta.senha !== senha) {
      return { sucesso: false, erro: 'E-mail ou senha incorretos' };
    }

    const usuario = {
      nome: conta.nome,
      email: conta.email,
      dataSessao: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    };

    localStorage.setItem('aluno_sessao', JSON.stringify(usuario));
    this.usuarioLogado = usuario;

    return { sucesso: true, usuario };
  }

  deslogar() {
    localStorage.removeItem('aluno_sessao');
    this.usuarioLogado = null;
    window.location.reload();
  }

  // ===== GESTÃO DE CURSOS =====
  carregarCurso(id) {
    const curso = obterCurso(id);
    if (!curso) return null;
    this.cursoAtual = curso;
    return curso;
  }

  obterCursosCategoria(categoria) {
    return obterCursosPorCategoria(categoria);
  }

  obterCategorias() {
    return obterCategorias();
  }

  obterTodosCursos() {
    return obterTodosCursos();
  }

  // ===== RENDERIZAÇÃO DE UI =====
  renderizarCardCurso(curso) {
    return `
      <div class="course-card" data-curso-id="${curso.id}">
        <div class="course-thumb">
          <img src="${curso.imagem}" alt="${curso.titulo}" loading="lazy">
          <div class="course-overlay">
            <a href="cursos/${curso.id}.html" class="btn-ver-curso" data-i18n="btn.verCurso">Ver curso</a>
          </div>
        </div>
        <div class="body">
          <h3>${curso.titulo}</h3>
          <div class="meta-row"><span>⏱️ ${curso.duracao}</span></div>
          <p>${curso.descricaoBreve}</p>
          <p style="margin:0;font-size:0.72rem;color:var(--gold-300);line-height:1.5;">${curso.topicos.join(' &middot; ')}</p>
          <a class="btn-ver" href="cursos/${curso.id}.html" data-i18n="btn.verCurso">Ver curso</a>
        </div>
      </div>
    `;
  }

  renderizarGridCursos(categoria = null) {
    const cursos = categoria ? this.obterCursosCategoria(categoria) : this.obterTodosCursos();
    
    if (cursos.length === 0) {
      return '<p style="color: var(--muted); text-align: center;">Nenhum curso disponível nesta categoria.</p>';
    }

    return cursos.map(curso => this.renderizarCardCurso(curso)).join('');
  }

  renderizarSecaoCategorias() {
    const categorias = this.obterCategorias();
    let html = '';

    categorias.forEach(categoria => {
      const cursos = this.obterCursosCategoria(categoria);
      const emoji = cursos[0]?.emoji || '📚';
      
      html += `
        <div>
          <h3 style="margin:0 0 12px;font-family:'Playfair Display', Georgia, serif;color:var(--navy-900);font-size:1.05rem;">${emoji} ${categoria}</h3>
          <div class="courses-grid">
            ${this.renderizarGridCursos(categoria)}
          </div>
        </div>
      `;
    });

    return html;
  }

  renderizarPainelLogin() {
    if (this.usuarioLogado) {
      return this.renderizarPainelAluno();
    }

    return `
      <section class="card painel-login">
        <h3 style="margin:0 0 6px;font-family:'Playfair Display', Georgia, serif;color:#fff;font-size:1.15rem;">👤 <span data-i18n="painel.titulo">Painel do Aluno</span></h3>

        <div id="painelTabs" style="display:flex;gap:6px;margin:14px 0 16px;background:#0f2b4a;padding:4px;border-radius:var(--radius-md);">
          <button type="button" id="tabEntrar" data-tab="entrar" data-i18n="btn.entrar" style="flex:1;padding:9px 8px;border:none;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:inherit;background:var(--gold-400);color:var(--navy-900);">Entrar</button>
          <button type="button" id="tabCriarConta" data-tab="criar" data-i18n="btn.criarConta" style="flex:1;padding:9px 8px;border:none;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:inherit;background:transparent;color:var(--muted);">Criar Conta</button>
        </div>

        <form id="formLoginAluno" style="display:flex;flex-direction:column;gap:12px;">
          <p style="margin:0;color:var(--muted);font-size:0.85rem;"><span data-i18n="painel.entrarTexto">Entre com o seu e-mail e senha para aceder aos seus cursos.</span></p>
          <div>
            <label for="inputEmailLogin" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;" data-i18n="painel.email">E-mail</label>
            <input id="inputEmailLogin" type="email" placeholder="seuemail@exemplo.com"
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;" required>
          </div>
          <div>
            <label for="inputSenhaLogin" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;" data-i18n="painel.senha">Senha</label>
            <input id="inputSenhaLogin" type="password" placeholder="Sua senha"
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;" required>
          </div>
          <div id="msgErroLogin" style="display:none;padding:10px;background:rgba(255,107,107,0.15);border-left:3px solid #ff6b6b;color:#ff8a8a;font-size:0.85rem;border-radius:var(--radius-md);"></div>
          <button type="submit" style="padding:12px 16px;background:var(--gold-400);color:var(--navy-900);border:none;border-radius:var(--radius-md);font-weight:700;cursor:pointer;font-size:0.95rem;" data-i18n="btn.entrar">Entrar</button>
        </form>

        <form id="formCriarConta" style="display:none;flex-direction:column;gap:12px;">
          <p style="margin:0;color:var(--muted);font-size:0.85rem;"><span data-i18n="painel.criarTexto">Crie a sua conta gratuita para se inscrever em cursos e acompanhar o seu progresso.</span></p>
          <div>
            <label for="inputNomeCriar" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;" data-i18n="painel.nomeCompleto">Nome Completo</label>
            <input id="inputNomeCriar" type="text" placeholder="Seu nome completo"
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;" required>
          </div>
          <div>
            <label for="inputEmailCriar" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;" data-i18n="painel.email">E-mail</label>
            <input id="inputEmailCriar" type="email" placeholder="seuemail@exemplo.com"
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;" required>
          </div>
          <div>
            <label for="inputSenhaCriar" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;" data-i18n="painel.senha">Senha</label>
            <input id="inputSenhaCriar" type="password" placeholder="Crie uma senha"
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;" required>
          </div>
          <div>
            <label for="inputSenhaCriarConfirmar" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;" data-i18n="painel.confirmarSenha">Confirmar Senha</label>
            <input id="inputSenhaCriarConfirmar" type="password" placeholder="Repita a senha"
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;" required>
          </div>
          <div id="msgErroCriar" style="display:none;padding:10px;background:rgba(255,107,107,0.15);border-left:3px solid #ff6b6b;color:#ff8a8a;font-size:0.85rem;border-radius:var(--radius-md);"></div>
          <button type="submit" style="padding:12px 16px;background:var(--gold-400);color:var(--navy-900);border:none;border-radius:var(--radius-md);font-weight:700;cursor:pointer;font-size:0.95rem;" data-i18n="btn.criarConta">Criar Conta</button>
        </form>
      </section>
    `;
  }

  renderizarPainelAluno() {
    return `
      <section class="card painel-aluno">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:10px;">
          <div style="min-width:0;">
            <h3 style="margin:0;font-family:'Playfair Display', Georgia, serif;color:#fff;font-size:1.15rem;">👤 ${this.usuarioLogado.nome}</h3>
            ${this.usuarioLogado.email ? `<p style="margin:2px 0 0;color:var(--muted);font-size:0.78rem;">${this.usuarioLogado.email}</p>` : ''}
            <p style="margin:4px 0 0;color:var(--gold-300);font-size:0.8rem;">Aluno desde ${new Date(this.usuarioLogado.dataSessao).toLocaleDateString('pt-PT')}</p>
          </div>
          <button 
            id="btnDeslogar" 
            style="padding:8px 14px;background:transparent;border:1px solid var(--gold-400);color:var(--gold-400);border-radius:var(--radius-md);font-size:0.85rem;cursor:pointer;transition:all .25s ease;font-weight:600;flex:0 0 auto;"
           data-i18n="btn.terminarSessao">Terminar Sessão</button>
        </div>

        <div style="background:#0f2b4a;padding:12px;border-radius:var(--radius-md);margin-bottom:12px;">
          <p style="margin:0;color:var(--muted);font-size:0.85rem;"><strong style="color:var(--gold-400);">Dica:</strong> Explore os cursos abaixo e clique em "Ver curso" para iniciar sua aprendizagem.</p>
        </div>
      </section>
    `;
  }

  // ===== EVENT LISTENERS =====
  inicializarEventos() {
    // Alternar entre Entrar / Criar Conta
    const tabEntrar = document.getElementById('tabEntrar');
    const tabCriarConta = document.getElementById('tabCriarConta');
    const formLogin = document.getElementById('formLoginAluno');
    const formCriarConta = document.getElementById('formCriarConta');

    const ativarTab = (tab) => {
      const ativo = { background: 'var(--gold-400)', color: 'var(--navy-900)' };
      const inativo = { background: 'transparent', color: 'var(--muted)' };
      if (tab === 'criar') {
        Object.assign(tabCriarConta.style, ativo);
        Object.assign(tabEntrar.style, inativo);
        formCriarConta.style.display = 'flex';
        formLogin.style.display = 'none';
      } else {
        Object.assign(tabEntrar.style, ativo);
        Object.assign(tabCriarConta.style, inativo);
        formLogin.style.display = 'flex';
        formCriarConta.style.display = 'none';
      }
    };

    if (tabEntrar && tabCriarConta) {
      tabEntrar.addEventListener('click', () => ativarTab('entrar'));
      tabCriarConta.addEventListener('click', () => ativarTab('criar'));
    }

    // Evento de login
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Evento de criar conta
    if (formCriarConta) {
      formCriarConta.addEventListener('submit', (e) => this.handleCriarConta(e));
    }

    // Evento de logout
    const btnDeslogar = document.getElementById('btnDeslogar');
    if (btnDeslogar) {
      btnDeslogar.addEventListener('click', () => this.deslogar());
    }

    // Eventos de cards de cursos (navegação com tracking simples)
    document.querySelectorAll('[data-curso-id]').forEach(card => {
      card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-4px)');
      card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });
  }

  handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('inputEmailLogin').value;
    const senha = document.getElementById('inputSenhaLogin').value;
    const msgErro = document.getElementById('msgErroLogin');

    const resultado = this.autenticar(email, senha);

    if (resultado.sucesso) {
      msgErro.style.display = 'none';
      alert(`Bem-vindo de volta, ${resultado.usuario.nome}!`);
      location.reload();
    } else {
      msgErro.textContent = resultado.erro;
      msgErro.style.display = 'block';
    }
  }

  handleCriarConta(e) {
    e.preventDefault();

    const nome = document.getElementById('inputNomeCriar').value;
    const email = document.getElementById('inputEmailCriar').value;
    const senha = document.getElementById('inputSenhaCriar').value;
    const confirmarSenha = document.getElementById('inputSenhaCriarConfirmar').value;
    const msgErro = document.getElementById('msgErroCriar');

    const resultado = this.registar(nome, email, senha, confirmarSenha);

    if (resultado.sucesso) {
      msgErro.style.display = 'none';
      alert(`Conta criada com sucesso! Bem-vindo, ${resultado.usuario.nome}!`);
      location.reload();
    } else {
      msgErro.textContent = resultado.erro;
      msgErro.style.display = 'block';
    }
  }
}

// Instância global
const gerenciador = new GerenciadorCursos();

// Inicializar na página Academia
document.addEventListener('DOMContentLoaded', () => {
  gerenciador.inicializarEventos();
});
