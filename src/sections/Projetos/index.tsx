import { useState } from 'react';
import './styles.css';
import jornada from '/home/luiz/Documentos/Portifolio/meu-portfolio/src/assets/jornada.png';
import obr from '/home/luiz/Documentos/Portifolio/meu-portfolio/src/assets/obr.png';
import swagger1 from '/home/luiz/Documentos/Portifolio/meu-portfolio/src/assets/swagger1.png';
import swagger2 from '/home/luiz/Documentos/Portifolio/meu-portfolio/src/assets/swagger2.png';
import jornadaPdf from '/home/luiz/Documentos/Portifolio/meu-portfolio/src/assets/jornada1.pdf';

// 2. A Estrutura de Dados (O "Coração")
const projetosData = [
  {
    id: 0,
    category: "Arquitetura de Software",
    title: "Agendador de Tarefas",
    subtitle: "Sistema de Gerenciamento de Tarefas",
    description: "Desenvolvimento de API REST para gerenciamento de tarefas, permitindo cadastro, atualização, exclusão, alteração de status e filtros por período, com vinculação a usuários autenticados.​ Implementação de módulo completo de usuários, incluindo autenticação (login), gerenciamento de telefone e endereço, envio automatizado de notificações por e-mail baseado em eventos de tarefas. Estruturação da aplicação em arquitetura em camadas (controller, service, repository), integração com banco de dados relacional, documentação de endpoints via Swagger e execução com Docker.",
    buttonText: "Ver no GitHub",
    cardImage: swagger1,
    bgImage: swagger2,
    actionType: 'link',
    link: 'https://github.com/Luizgsch/usuario'
  },
  {
    id: 1,
    category: "Engenharia e Liderança",
    title: "Robótica Competitiva",
    subtitle: "Mentoria e Estratégia de Hardware",
    description: "Liderança de equipe por 2 anos em competições nacionais. Conquista do 5º lugar na Olimpíada Brasileira de Robótica com robô de alto desempenho desenvolvido do zero.",
    buttonText: "Fale comigo",
    cardImage: obr,
    bgImage: obr,
    actionType: 'scroll',
    link: 'contact'
  },
  {
    id: 2,
    category: "Gestão de Projetos",
    title: "Gestão de Software de Manuais",
    subtitle: "Tech Leadership e Documentação",
    description: "Liderança técnica e gestão de requisitos para software de engenharia de materiais. Fui classificado como Tech Lead do projeto e fui responsável por auxiliar na modelagem de dados, documentação e entrega do produto final. Trabalhamos com metodologia Scrum.",
    buttonText: "Baixar PDF técnico",
    cardImage: jornada,
    bgImage: jornada,
    actionType: 'download',
    link: jornadaPdf
  },
  {
    id: 3,
    category: "Próximos Passos",
    title: "Lab de Inovação",
    subtitle: "Aprendizado Contínuo & Cloud",
    description: "Pesquisa ativa em tecnologias de ponta como Docker, AWS e Kubernates para otimização de performance e deploy automatizado.",
    buttonText: "Entre em contato agora",
    cardImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bgImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    actionType: 'scroll',
    link: 'contact'
  }
];

export const Projetos = () => {
  // 3. Gerenciamento do "Estado Ativo"
  const [indiceAtivo, setIndiceAtivo] = useState(0);

  // 6. O Botão de Navegação (Mecanismo de Troca)
  const handleNext = () => {
    // Trava para o efeito de carrossel infinito (voltar para 0 se no final)
    setIndiceAtivo((prev) => (prev + 1) % projetosData.length);
  };

  const handlePrev = () => {
    setIndiceAtivo((prev) => (prev - 1 + projetosData.length) % projetosData.length);
  };

  const handleAction = (projeto: typeof projetosData[0]) => {
    if (projeto.actionType === 'link') {
      window.open(projeto.link, '_blank', 'noopener,noreferrer');
    } else if (projeto.actionType === 'download') {
      const link = document.createElement('a');
      link.href = projeto.link;
      link.download = 'jornada_tecnica.pdf';
      link.click();
    } else if (projeto.actionType === 'scroll') {
      document.getElementById(projeto.link)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="projetos-section" id="works">

      {/* 4. Camada de Fundo (Background Layer) */}
      <div className="projetos-backgrounds">
        {projetosData.map((projeto) => (
          <div
            key={`bg-${projeto.id}`}
            className={`projeto-bg ${projeto.id === indiceAtivo ? 'active' : ''}`}
            style={{ backgroundImage: `url(${projeto.bgImage})` }}
          />
        ))}
        {/* Overlay escuro opcional para manter o texto legível em qualquer fundo */}
        <div className="projetos-bg-overlay" />
      </div>

      {/* 4. Camada de Interface (UI Layer) */}
      <div className="projetos-ui-layer">
        <span className="projetos-category">
          {projetosData[indiceAtivo].category}
        </span>
        <h2 className="projetos-title">
          {projetosData[indiceAtivo].title}
        </h2>
        <h3 className="projetos-subtitle">
          {projetosData[indiceAtivo].subtitle}
        </h3>
        <p className="projetos-description">
          {projetosData[indiceAtivo].description}
        </p>
        <button 
          className="projetos-action-btn"
          onClick={() => handleAction(projetosData[indiceAtivo])}
        >
          {projetosData[indiceAtivo].buttonText}
        </button>
      </div>

      {/* Container Principal que agrupa Cards e Botões */}
      <div className="projetos-content-wrapper">
        {/* Camada de Cards (Container) */}
        <div className="projetos-cards-container">
          {projetosData.map((projeto) => {
            // 5. Lógica do "Card que fica maior" (aplicando classes CSS baseadas no estado)
            let cardClass = 'projeto-card';

            if (projeto.id === indiceAtivo) {
              cardClass += ' active';
            } else {
              cardClass += ' inactive';
              const total = projetosData.length;
              if (projeto.id === (indiceAtivo - 1 + total) % total) {
                cardClass += ' prev'; // Card da esquerda
              } else if (projeto.id === (indiceAtivo + 1) % total) {
                cardClass += ' next'; // Card da direita
              } else {
                cardClass += ' hidden'; // Esconde cards muito distantes
              }
            }

            return (
              <div
                key={`card-${projeto.id}`}
                className={cardClass}
                onClick={() => setIndiceAtivo(projeto.id)} // Permite focar o card se o usuário clicar nele diretamente
              >
                <div
                  className="projeto-card-image"
                  style={{ backgroundImage: `url(${projeto.cardImage})` }}
                />
              </div>
            );
          })}
        </div>

        {/* Botões de Navegação ao lado dos cards */}
        <div className="projetos-nav-buttons">
          <button className="projetos-btn-nav" onClick={handlePrev} aria-label="Anterior">
            &#8592;
          </button>
          <button className="projetos-btn-nav" onClick={handleNext} aria-label="Próximo">
            &#8594;
          </button>
        </div>
      </div>

    </section>
  );
};
