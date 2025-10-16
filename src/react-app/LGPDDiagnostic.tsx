import { useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, ChevronRight, Mail } from 'lucide-react';
import Navbar from './Navbar';

const questions = [
  {
    id: 1,
    category: "Governança",
    question: "Sua empresa possui um DPO (Encarregado de Dados) nomeado?",
    options: [
      { text: "Sim, DPO dedicado e atuante", points: 10 },
      { text: "Sim, mas acumula outras funções", points: 6 },
      { text: "Não, mas temos responsável informal", points: 3 },
      { text: "Não possuímos", points: 0 }
    ]
  },
  {
    id: 2,
    category: "Governança",
    question: "Existe uma política formal de proteção de dados?",
    options: [
      { text: "Sim, documentada e atualizada", points: 10 },
      { text: "Sim, mas desatualizada", points: 5 },
      { text: "Em elaboração", points: 3 },
      { text: "Não existe", points: 0 }
    ]
  },
  {
    id: 3,
    category: "Mapeamento",
    question: "Sua empresa tem mapeamento de dados pessoais (inventário)?",
    options: [
      { text: "Completo e atualizado", points: 10 },
      { text: "Parcial, em atualização", points: 6 },
      { text: "Iniciamos recentemente", points: 3 },
      { text: "Não temos", points: 0 }
    ]
  },
  {
    id: 4,
    category: "Mapeamento",
    question: "As bases legais para tratamento de dados estão identificadas?",
    options: [
      { text: "Sim, para todos os processos", points: 10 },
      { text: "Parcialmente identificadas", points: 5 },
      { text: "Estamos identificando", points: 2 },
      { text: "Não identificadas", points: 0 }
    ]
  },
  {
    id: 5,
    category: "Segurança",
    question: "Existem medidas técnicas de segurança implementadas?",
    options: [
      { text: "Sim, controles robustos (criptografia, backup, controle de acesso)", points: 10 },
      { text: "Controles básicos implementados", points: 6 },
      { text: "Controles mínimos", points: 3 },
      { text: "Sem controles adequados", points: 0 }
    ]
  },
  {
    id: 6,
    category: "Segurança",
    question: "Há plano de resposta a incidentes de segurança?",
    options: [
      { text: "Sim, documentado e testado", points: 10 },
      { text: "Existe, mas não testado", points: 5 },
      { text: "Em desenvolvimento", points: 2 },
      { text: "Não existe", points: 0 }
    ]
  },
  {
    id: 7,
    category: "Direitos dos Titulares",
    question: "Como sua empresa gerencia solicitações de titulares (acesso, exclusão)?",
    options: [
      { text: "Processo estruturado e automatizado", points: 10 },
      { text: "Processo manual, mas organizado", points: 6 },
      { text: "Atendemos de forma reativa", points: 3 },
      { text: "Não temos processo", points: 0 }
    ]
  },
  {
    id: 8,
    category: "Direitos dos Titulares",
    question: "Os titulares são informados sobre o tratamento de seus dados?",
    options: [
      { text: "Sim, avisos claros e acessíveis", points: 10 },
      { text: "Sim, mas informações genéricas", points: 5 },
      { text: "Informamos parcialmente", points: 2 },
      { text: "Não informamos", points: 0 }
    ]
  },
  {
    id: 9,
    category: "Fornecedores",
    question: "Contratos com fornecedores contemplam cláusulas de proteção de dados?",
    options: [
      { text: "Sim, todos com cláusulas LGPD", points: 10 },
      { text: "Maioria dos contratos", points: 6 },
      { text: "Alguns contratos", points: 3 },
      { text: "Nenhum ou poucos", points: 0 }
    ]
  },
  {
    id: 10,
    category: "Cultura",
    question: "Colaboradores recebem treinamento sobre LGPD?",
    options: [
      { text: "Sim, treinamentos regulares", points: 10 },
      { text: "Treinamento inicial apenas", points: 5 },
      { text: "Treinamento informal", points: 2 },
      { text: "Sem treinamentos", points: 0 }
    ]
  }
];

interface LGPDDiagnosticProps {
  onBack?: () => void;
}

export default function LGPDDiagnostic({ onBack }: LGPDDiagnosticProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: number, points: number) => {
    setAnswers({ ...answers, [questionId]: points });

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const calculateScore = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const percentage = (total / 100) * 100;
    return { total, percentage };
  };

  const getResultMessage = (percentage: number) => {
    if (percentage >= 80) {
      return {
        level: "Avançado",
        icon: <CheckCircle className="w-16 h-16 text-green-500" />,
        color: "green",
        message: "Parabéns! Sua empresa está no nível avançado de maturidade em proteção de dados.",
        recommendations: [
          "Manter auditorias periódicas",
          "Acompanhar atualizações regulatórias",
          "Considerar certificações ISO 27001/27701"
        ]
      };
    } else if (percentage >= 60) {
      return {
        level: "Intermediário",
        icon: <AlertCircle className="w-16 h-16 text-yellow-500" />,
        color: "yellow",
        message: "Sua empresa está no caminho certo, mas há pontos de melhoria importantes.",
        recommendations: [
          "Fortalecer documentação e políticas",
          "Expandir treinamentos para toda equipe",
          "Revisar contratos com fornecedores"
        ]
      };
    } else if (percentage >= 40) {
      return {
        level: "Básico",
        icon: <AlertCircle className="w-16 h-16 text-orange-500" />,
        color: "orange",
        message: "Sua empresa tem iniciativas, mas precisa estruturar melhor o programa de conformidade.",
        recommendations: [
          "Nomear DPO ou responsável dedicado",
          "Criar inventário de dados pessoais",
          "Implementar política de proteção de dados"
        ]
      };
    } else {
      return {
        level: "Inicial",
        icon: <XCircle className="w-16 h-16 text-red-500" />,
        color: "red",
        message: "Atenção! Sua empresa está exposta a riscos significativos de não conformidade.",
        recommendations: [
          "Priorizar adequação à LGPD urgentemente",
          "Buscar consultoria especializada",
          "Mapear dados pessoais tratados",
          "Implementar medidas básicas de segurança"
        ]
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const { total, percentage } = calculateScore();
    const result = getResultMessage(percentage);

    return (
      <>
        <Navbar />
        <div className="diagnostic-container">
          <div className="diagnostic-card">
            <div className="diagnostic-result-header">
              <div className="diagnostic-icon-container">{result.icon}</div>
              <h2 className="diagnostic-title">Resultado do Diagnóstico</h2>
              <div className="diagnostic-percentage">{percentage.toFixed(0)}%</div>
              <div className={`diagnostic-level diagnostic-level-${result.color}`}>
                Nível: {result.level}
              </div>
            </div>

            <div className="diagnostic-message-box">
              <p className="diagnostic-message">{result.message}</p>
            </div>

            <div className="diagnostic-recommendations">
              <h3 className="diagnostic-recommendations-title">Recomendações Prioritárias:</h3>
              <ul className="diagnostic-recommendations-list">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="diagnostic-recommendation-item">
                    <ChevronRight className="diagnostic-chevron" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="diagnostic-actions">
              <button onClick={resetQuiz} className="diagnostic-button">
                Refazer Diagnóstico
              </button>
              {onBack && (
                <button onClick={onBack} className="diagnostic-button diagnostic-button-secondary">
                  Voltar ao Início
                </button>
              )}
            </div>

            <div className="diagnostic-score-text">
              Pontuação: {total} de 100 pontos possíveis
            </div>

            <div className="diagnostic-contact-section">
              <div className="diagnostic-contact-header">
                <Mail className="w-8 h-8 text-pink-600" />
                <h3 className="diagnostic-contact-title">Precisa de Ajuda Especializada?</h3>
              </div>
              <p className="diagnostic-contact-text">
                Nossa equipe está pronta para ajudar sua empresa a alcançar a conformidade com a LGPD
                e transformar seus dados em ativos estratégicos.
              </p>
              <a
                href={`mailto:contato@dadosinteligentes.app.br?subject=Diagnóstico LGPD - Solicitação de Contato&body=Olá, acabei de realizar o diagnóstico de maturidade em LGPD e gostaria de conversar sobre como a Dados Inteligentes pode ajudar minha empresa.%0D%0A%0D%0AMinha pontuação foi: ${total} pontos (${percentage.toFixed(0)}%)%0D%0ANível: ${result.level}`}
                className="diagnostic-contact-button"
              >
                <Mail className="w-5 h-5" />
                <span>Entrar em Contato por E-mail</span>
              </a>
              <p className="diagnostic-contact-email">
                contato@dadosinteligentes.app.br
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <Navbar />
      <div className="diagnostic-container">
        <div className="diagnostic-card">
          <div className="diagnostic-progress-section">
            <div className="diagnostic-progress-text">
              <span>Questão {currentQuestion + 1} de {questions.length}</span>
              <span>{progress.toFixed(0)}% concluído</span>
            </div>
            <div className="diagnostic-progress-bar-bg">
              <div
                className="diagnostic-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="diagnostic-category-badge-container">
            <span className="diagnostic-category-badge">
              {question.category}
            </span>
          </div>

          <h2 className="diagnostic-question">{question.question}</h2>

          <div className="diagnostic-options">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(question.id, option.points)}
                className="diagnostic-option-button"
              >
                <div className="diagnostic-option-content">
                  <div className="diagnostic-option-radio">
                    <div className="diagnostic-option-radio-inner" />
                  </div>
                  <span className="diagnostic-option-text">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {onBack && currentQuestion === 0 && (
            <div className="diagnostic-back-container">
              <button onClick={onBack} className="diagnostic-back-button">
                Voltar ao Início
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
