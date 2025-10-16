import { useState } from "react";
import "./index.css";
import LGPDDiagnostic from "./LGPDDiagnostic";
import Navbar from "./Navbar";
import HeroBackground3D from "./HeroBackground3D";
import logo from "./assets/logo-marca-dadosinteligentes.svg";
import { useScrollAnimation } from "./useScrollAnimation";
import { useGSAPTextAnimation } from "./useGSAPTextAnimation";
import { useTechAnimation, useTechTitleAnimation } from "./useTechAnimation";

function App() {
	const [showDiagnostic, setShowDiagnostic] = useState(false);

	// Refs for scroll animations
	const heroRef = useScrollAnimation();
	const transformationRef = useScrollAnimation();
	const servicesRef = useScrollAnimation();
	const journeyRef = useScrollAnimation();
	const caseStudyRef = useScrollAnimation();
	const finalCTARef = useScrollAnimation();

	// Refs for GSAP text animations
	const heroTitleRef = useGSAPTextAnimation<HTMLHeadingElement>({ type: 'split', duration: 1.2, stagger: 0.05 });
	const transformationTitleRef = useGSAPTextAnimation<HTMLHeadingElement>({ type: 'fadeUp', duration: 1 });
	const servicesTitleRef = useGSAPTextAnimation<HTMLHeadingElement>({ type: 'slideIn', duration: 1 });
	const journeyTitleRef = useGSAPTextAnimation<HTMLHeadingElement>({ type: 'chars', duration: 0.8, stagger: 0.02 });
	const caseStudyTitleRef = useGSAPTextAnimation<HTMLHeadingElement>({ type: 'reveal', duration: 1.5 });
	const finalCTATitleRef = useGSAPTextAnimation<HTMLHeadingElement>({ type: 'split', duration: 1, stagger: 0.04 });

	// Refs for tech section animations
	const techContainerRef = useTechAnimation();
	const techTitleRef = useTechTitleAnimation();

	const scrollToCTA = () => {
		document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleCTA = () => {
		setShowDiagnostic(true);
		window.scrollTo(0, 0);
	};

	const handleBackToHome = () => {
		setShowDiagnostic(false);
		window.scrollTo(0, 0);
	};

	if (showDiagnostic) {
		return <LGPDDiagnostic onBack={handleBackToHome} onNavigateToHome={handleBackToHome} />;
	}

	return (
		<>
			<Navbar onNavigate={(sectionId) => {
				// Navegação normal quando na página principal
				const element = document.getElementById(sectionId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}} />

			{/* Hero Section */}
			<section className="hero" id="hero">
				<HeroBackground3D />
				<div ref={heroRef} className="container fade-in">
					<h1 ref={heroTitleRef}>Proteja-se de multas da LGPD e construa a base para uma empresa guiada por dados</h1>
					<p>Da conformidade legal à inteligência de negócio. Soluções completas em LGPD, Engenharia de Dados e Desenvolvimento de Software para PMEs.</p>
					<button className="cta-button" onClick={scrollToCTA}>
						Diagnóstico de Maturidade de Dados & LGPD Gratuito
					</button>
					<div className="cta-subtext">Entenda seus riscos e descubra o potencial escondido nos seus dados</div>
				</div>
			</section>

			{/* Trust Bar */}
			<section className="trust-bar">
				<div className="container">
					<p ref={techTitleRef}>Tecnologias de Engenharia de Dados que dominamos</p>
					<div ref={techContainerRef} className="tech-logos">
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg" alt="Oracle" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/cloudera/cloudera-icon.svg" alt="Cloudera" />
						</div>
						<div className="tech-logo">
							Apache Iceberg
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/python/python-icon.svg" alt="Python" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/golang/golang-icon.svg" alt="Golang" />
						</div>
						<div className="tech-logo">
							<img src="https://upload.wikimedia.org/wikipedia/commons/d/de/AirflowLogo.png" alt="Apache Airflow" />
						</div>
						<div className="tech-logo">
							<img src="https://superset.apache.org/img/superset-logo-horiz-apache.svg" alt="Apache Superset" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/apache_hadoop/apache_hadoop-icon.svg" alt="Apache Hadoop" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg" alt="Apache Spark" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg" alt="Apache Kafka" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg" alt="PostgreSQL" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/apache_nifi/apache_nifi-icon.svg" alt="Apache NiFi" />
						</div>
						<div className="tech-logo">
							Trino
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg" alt="Elasticsearch" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/minioio/minioio-icon.svg" alt="MinIO" />
						</div>
						<div className="tech-logo">
							Delta Lake
						</div>
						<div className="tech-logo">
							<img src="https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png" alt="dbt" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" alt="Docker" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" alt="Kubernetes" />
						</div>
						<div className="tech-logo">
							<img src="https://www.vectorlogo.zone/logos/redis/redis-icon.svg" alt="Redis" />
						</div>
					</div>
				</div>
			</section>

			{/* Transformation Section */}
			<section className="transformation" id="transformation">
				<div className="container">
					<h2 ref={transformationTitleRef}>A LGPD não é o fim da linha. É o começo de tudo.</h2>
					<div ref={transformationRef} className="transformation-grid scale-up stagger-children">
						<div className="transformation-card card-security">
							<h3><span className="icon">🛡️</span> Primeiro, a Segurança</h3>
							<p>Proteja sua empresa de multas que podem chegar a R$ 50 milhões e preserve sua reputação no mercado. Nossa adequação à LGPD resolve isso de forma eficiente, criando uma base de dados organizada, mapeada e segura.</p>
						</div>
						<div className="transformation-card card-growth">
							<h3><span className="icon">🚀</span> Depois, o Crescimento</h3>
							<p>Com seus dados finalmente organizados e governados pela adequação à LGPD, o verdadeiro poder se revela. É aqui que nossa expertise em Engenharia de Dados e Software transforma seu ativo em resultados:</p>
							<ul>
								<li>Dashboards Inteligentes: Visualize seus KPIs em tempo real</li>
								<li>Automação de Processos: Reduza custos e erros manuais</li>
								<li>Software Sob Medida: Crie as ferramentas que sua operação realmente precisa</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="services" id="services">
				<div className="container">
					<h2 ref={servicesTitleRef}>Nossa expertise, seus resultados</h2>
					<div ref={servicesRef} className="services-grid slide-up stagger-children">
						<div className="service-card">
							<h3>Conformidade & Governança de Dados</h3>
							<p>Mapeamento completo, implementação de políticas e monitoramento contínuo para total adequação à LGPD. Proteja seu negócio e construa uma base sólida de dados.</p>
						</div>
						<div className="service-card">
							<h3>Engenharia de Dados & Business Intelligence</h3>
							<p>Coleta, estruturação e visualização de dados para decisões estratégicas. ETL, Data Lakes, Dashboards e insights que impulsionam seu crescimento.</p>
						</div>
						<div className="service-card">
							<h3>Desenvolvimento de Software Sob Medida</h3>
							<p>Criação de aplicações web e sistemas customizados para otimizar sua operação. Soluções que se adaptam perfeitamente ao seu negócio.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Journey Section */}
			<section className="journey" id="journey">
				<div className="container">
					<h2 ref={journeyTitleRef}>Sua jornada de transformação de dados em 4 fases</h2>
					<div ref={journeyRef} className="journey-steps slide-up stagger-children">
						<div className="step">
							<div className="step-number">1</div>
							<h4>Diagnóstico de Maturidade</h4>
							<p>Avaliamos seus riscos de LGPD e o potencial dos seus dados atuais</p>
						</div>
						<div className="step">
							<div className="step-number">2</div>
							<h4>Fundação Sólida (LGPD)</h4>
							<p>Implementamos a conformidade, organizando e protegendo seus dados</p>
						</div>
						<div className="step">
							<div className="step-number">3</div>
							<h4>Construção da Inteligência</h4>
							<p>Estruturamos pipelines e dashboards para gerar insights valiosos</p>
						</div>
						<div className="step">
							<div className="step-number">4</div>
							<h4>Aceleração (Software)</h4>
							<p>Desenvolvemos soluções personalizadas que usam seus dados para impulsionar o negócio</p>
						</div>
					</div>
				</div>
			</section>

			{/* Case Study */}
			<section className="case-study" id="case-study">
				<div ref={caseStudyRef} className="container slide-up">
					<h2 ref={caseStudyTitleRef}>Como uma empresa saiu do risco de multas para um aumento de 20% em eficiência</h2>
					<div className="case-content">
						<h3>O Desafio</h3>
						<p>A empresa nos procurou preocupada com a LGPD e com relatórios manuais que levavam dias para serem feitos. Havia risco real de autuação e a gestão operava no escuro, sem dados confiáveis.</p>

						<h3>A Solução</h3>
						<p>Iniciamos com o projeto de adequação à LGPD, mapeando todos os processos e dados. Usando essa base organizada, desenvolvemos um dashboard de Business Intelligence integrado aos sistemas da empresa.</p>

						<h3>O Resultado</h3>
						<p>100% de conformidade com a lei, redução de 15 horas/semana em trabalho manual e decisões baseadas em dados atualizados em tempo real. A empresa agora tem segurança jurídica e uma vantagem competitiva através dos seus dados.</p>

						<div className="testimonial">
							"Começamos querendo apenas nos proteger da LGPD, mas acabamos ganhando uma ferramenta que transformou nossa gestão. Hoje tomamos decisões baseadas em dados reais, não em intuição."
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="final-cta" id="cta">
				<div ref={finalCTARef} className="container scale-up">
					<h2 ref={finalCTATitleRef}>Pronto para ter segurança jurídica e dados que trabalham para você?</h2>
					<p>Agende seu Diagnóstico de Maturidade de Dados & LGPD. É gratuito e o primeiro passo para transformar seu negócio.</p>
					<button className="cta-button" onClick={handleCTA}>
						Receber meu Diagnóstico Gratuito
					</button>
				</div>
			</section>

			{/* Footer */}
			<footer>
				<div className="container">
					<div className="footer-logo">
						<img src={logo} alt="Dados Inteligentes" />
					</div>
					<div className="footer-content">
						<div className="footer-section">
							<h4>Dados Inteligentes Ltda.</h4>
							<p>CNPJ: 47.773.826/0001-57</p>
						</div>
						<div className="footer-section">
							<h4>Endereço</h4>
							<p>Av dos Holandeses, 7</p>
							<p>Edif Metr. Market Place - Sala 507</p>
							<p>São Luís - MA</p>
							<p>CEP: 65.071-380</p>
						</div>
						<div className="footer-section">
							<h4>Contato</h4>
							<p>
								<a href="mailto:contato@dadosinteligentes.app.br">
									contato@dadosinteligentes.app.br
								</a>
							</p>
						</div>
					</div>
					<div className="footer-copyright">
						<p>&copy; 2025 Dados Inteligentes Ltda. Todos os direitos reservados.</p>
					</div>
				</div>
			</footer>
		</>
	);
}

export default App;
