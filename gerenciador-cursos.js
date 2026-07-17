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

  autenticar(nome, senha) {
    // Validação simples - em produção usar backend seguro
    if (!nome || !senha) {
      return { sucesso: false, erro: 'Preencha todos os campos' };
    }

    if (nome.length < 3) {
      return { sucesso: false, erro: 'Nome deve ter pelo menos 3 caracteres' };
    }

    if (senha.length < 4) {
      return { sucesso: false, erro: 'Senha deve ter pelo menos 4 caracteres' };
    }

    const usuario = {
      nome: nome.trim(),
      dataSessao: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9) // ID único simples
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
            <a href="cursos/${curso.id}.html" class="btn-ver-curso">Ver curso</a>
          </div>
        </div>
        <div class="body">
          <h3>${curso.titulo}</h3>
          <div class="meta-row"><span>⏱️ ${curso.duracao}</span></div>
          <p>${curso.descricaoBreve}</p>
          <p style="margin:0;font-size:0.72rem;color:var(--gold-300);line-height:1.5;">${curso.topicos.join(' &middot; ')}</p>
          <a class="btn-ver" href="cursos/${curso.id}.html">Ver curso</a>
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
        <h3 style="margin:0 0 16px;font-family:'Playfair Display', Georgia, serif;color:#fff;font-size:1.15rem;">👤 Painel do Aluno</h3>
        <p style="margin:0 0 16px;color:var(--muted);font-size:0.9rem;">Faça login para aceder a cursos e histórico de aprendizagem</p>
        
        <form id="formLoginAluno" style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <label for="inputNomeAluno" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;">Nome Completo</label>
            <input 
              id="inputNomeAluno" 
              type="text" 
              placeholder="Seu nome completo" 
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;"
              required
            >
          </div>

          <div>
            <label for="inputSenhaAluno" style="display:block;font-size:0.85rem;color:var(--gold-400);margin-bottom:6px;font-weight:600;">Senha</label>
            <input 
              id="inputSenhaAluno" 
              type="password" 
              placeholder="Sua senha" 
              style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:var(--radius-md);background:#0f2b4a;color:#fff;font-family:inherit;font-size:0.9rem;"
              required
            >
          </div>

          <div id="msgErroLogin" style="display:none;padding:10px;background:rgba(255,107,107,0.15);border-left:3px solid #ff6b6b;color:#ff8a8a;font-size:0.85rem;border-radius:var(--radius-md);"></div>

          <button 
            type="submit" 
            style="padding:12px 16px;background:var(--gold-400);color:var(--navy-900);border:none;border-radius:var(--radius-md);font-weight:700;cursor:pointer;font-size:0.95rem;transition:all .25s ease;"
          >Entrar</button>
        </form>

        <p style="margin:14px 0 0;font-size:0.75rem;color:var(--muted);text-align:center;">Primeira vez? Criar uma conta simples ao fazer login com suas credenciais.</p>
      </section>
    `;
  }

  renderizarPainelAluno() {
    return `
      <section class="card painel-aluno">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <h3 style="margin:0;font-family:'Playfair Display', Georgia, serif;color:#fff;font-size:1.15rem;">👤 ${this.usuarioLogado.nome}</h3>
            <p style="margin:4px 0 0;color:var(--gold-300);font-size:0.8rem;">Aluno desde ${new Date(this.usuarioLogado.dataSessao).toLocaleDateString('pt-PT')}</p>
          </div>
          <button 
            id="btnDeslogar" 
            style="padding:8px 14px;background:transparent;border:1px solid var(--gold-400);color:var(--gold-400);border-radius:var(--radius-md);font-size:0.85rem;cursor:pointer;transition:all .25s ease;font-weight:600;"
          >Terminar Sessão</button>
        </div>

        <div style="background:#0f2b4a;padding:12px;border-radius:var(--radius-md);margin-bottom:12px;">
          <p style="margin:0;color:var(--muted);font-size:0.85rem;"><strong style="color:var(--gold-400);">Dica:</strong> Explore os cursos abaixo e clique em "Ver curso" para iniciar sua aprendizagem.</p>
        </div>
      </section>
    `;
  }

  // ===== EVENT LISTENERS =====
  inicializarEventos() {
    // Evento de login
    const formLogin = document.getElementById('formLoginAluno');
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => this.handleLogin(e));
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
    
    const nome = document.getElementById('inputNomeAluno').value;
    const senha = document.getElementById('inputSenhaAluno').value;
    const msgErro = document.getElementById('msgErroLogin');

    const resultado = this.autenticar(nome, senha);

    if (resultado.sucesso) {
      // Feedback visual rápido antes de recarregar
      msgErro.style.display = 'none';
      alert(`Bem-vindo, ${resultado.usuario.nome}!`);
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
