import { Language } from "@/types";

export type TranslationKey =
  | "nav.catalog"
  | "nav.services"
  | "nav.about"
  | "nav.contact"
  | "nav.faq"
  | "nav.search"
  | "nav.cart"
  | "nav.account"
  | "shop.addToCart"
  | "shop.vehicleAdded"
  | "shop.vehicleAddedDesc"
  | "shop.alreadyInCart"
  | "shop.alreadyInCartDesc"
  | "catalog.title"
  | "catalog.description"
  | "catalog.premiumCollection"
  | "catalog.selectionDescription"
  | "catalog.inspected"
  | "catalog.history"
  | "catalog.certified"
  | "catalog.warranty"
  | "catalog.advancedSearch"
  | "catalog.advancedSearchDesc"
  | "catalog.customFilters"
  | "catalog.customFiltersDesc"
  | "catalog.viewDetails"
  | "footer.description"
  | "footer.address"
  | "footer.city"
  | "footer.country"
  | "footer.mainServices"
  | "footer.collection"
  | "footer.services"
  | "footer.financing"
  | "footer.faq"
  | "footer.contactPrivilege"
  | "footer.customerService"
  | "footer.tracking"
  | "footer.warranty"
  | "footer.returns"
  | "footer.terms"
  | "footer.privacy"
  | "footer.cookies"
  | "footer.stayInformed"
  | "footer.newsletter"
  | "footer.emailPlaceholder"
  | "footer.joinClub"
  | "footer.copyright"
  | "footer.legal"
  | "footer.dataProtection"
  | "footer.cookies"
  | "footer.legal"
  | "footer.dataProtection"
  | "footer.cookies"
  | "home.title"
  | "home.subtitle"
  | "home.exploreCatalog"
  | "home.whyChooseUs"
  | "home.wideSelection"
  | "home.competitivePrices"
  | "home.premiumQuality"
  | "home.customerSatisfaction"
  | "home.discoverMore"
  | "home.latestModels"
  | "home.ourCommitment"
  | "home.commitmentDescription"
  | "home.expertAdvice"
  | "home.transparentProcess"
  | "home.afterSalesService"
  | "home.happyClients"
  | "home.testimonials"
  | "home.viewMoreTestimonials"
  | "home.contactUs"
  | "services.title"
  | "services.subtitle"
  | "services.purchase.title"
  | "services.purchase.subtitle"
  | "services.purchase.description"
  | "services.purchase.evaluation"
  | "services.purchase.evaluation.desc"
  | "services.purchase.tradein"
  | "services.purchase.tradein.desc"
  | "services.purchase.transaction"
  | "services.purchase.transaction.desc"
  | "services.purchase.admin"
  | "services.purchase.admin.desc"
  | "services.delivery.title"
  | "services.delivery.subtitle"
  | "services.delivery.description"
  | "services.delivery.transport"
  | "services.delivery.transport.desc"
  | "services.delivery.tracking"
  | "services.delivery.tracking.desc"
  | "services.delivery.customized"
  | "services.delivery.customized.desc"
  | "services.delivery.documentation"
  | "services.delivery.documentation.desc"
  | "services.additionalServices"
  | "services.financing"
  | "services.financing.desc"
  | "services.discoverOffers"
  | "services.afterSales"
  | "services.afterSales.desc"
  | "services.learnMore"
  | "services.expressAppointment"
  | "services.expressAppointment.desc"
  | "services.makeAppointment"
  | "services.international"
  | "services.international.desc"
  | "services.contactUs"
  | "services.customService"
  | "services.customService.desc"
  | "services.contactPremiumTeam"
  | "financing.title"
  | "financing.subtitle"
  | "financing.description"
  | "financing.preferentialRates"
  | "financing.preferentialRates.desc"
  | "financing.instantSimulation"
  | "financing.instantSimulation.desc"
  | "financing.flexibleOptions"
  | "financing.flexibleOptions.desc"
  | "financing.calculator"
  | "financing.requestQuote"
  | "faq.title"
  | "faq.description"
  | "faq.contactUs"
  | "faq.otherQuestions"
  | "faq.ourTeam"
  | "faq.vehicleCondition"
  | "faq.vehicleConditionAnswer"
  | "faq.condition.asNew"
  | "faq.condition.veryGood"
  | "faq.condition.good"
  | "faq.partsReplacement"
  | "faq.partsReplacementAnswer"
  | "legal.title"
  | "legal.companyInfo"
  | "privacy.title"
  | "privacy.description"
  | "privacy.statement"
  | "cookies.title"
  | "cookies.description"
  | "cookies.statement"
  | "cookies.customize"
  | "returns.title"
  | "returns.commitment"
  | "returns.guarantee"
  | "returns.satisfaction"
  | "returns.contactAdvice"
  | "returns.contactAdvisor"
  | "cookies.savePreferences"
  | "cookies.acceptAll"
  | "financing.preferentialRates.desc"
  | "financing.instantSimulation.desc"
  | "financing.flexibleOptions.desc";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.catalog": "Catalog",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.search": "Search",
    "nav.cart": "Cart",
    "nav.account": "Account",
    "shop.addToCart": "Add to cart",
    "shop.vehicleAdded": "Vehicle added",
    "shop.vehicleAddedDesc": "{vehicle} has been added to your cart.",
    "shop.alreadyInCart": "Already in cart",
    "shop.alreadyInCartDesc": "This vehicle is already in your cart.",
    "catalog.title": "Explore Our Premium Collection",
    "catalog.description":
      "Discover a wide selection of high-quality vehicles to suit your needs.",
    "catalog.premiumCollection": "Premium Selection",
    "catalog.selectionDescription":
      "Carefully selected vehicles for their quality and performance.",
    "catalog.inspected": "Thoroughly Inspected",
    "catalog.history": "Detailed History Report",
    "catalog.certified": "Certified Quality",
    "catalog.warranty": "Extended Warranty Options",
    "catalog.advancedSearch": "Advanced Search",
    "catalog.advancedSearchDesc": "Find exactly what you're looking for with our advanced search options.",
    "catalog.customFilters": "Custom Filters",
    "catalog.customFiltersDesc": "Customize your search with specific criteria.",
    "catalog.viewDetails": "View Details",
    "footer.description":
      "AUTO PBH is your premier destination for premium vehicles. We offer a wide selection of high-quality cars and exceptional customer service.",
    "footer.address": "Autolettestraat 10",
    "footer.city": "3063 NP Rotterdam",
    "footer.country": "Netherlands",
    "footer.mainServices": "Main Services",
    "footer.collection": "Our Collection",
    "footer.services": "Our Services",
    "footer.financing": "Financing",
    "footer.faq": "FAQ",
    "footer.contactPrivilege": "Privileged Contact",
    "footer.customerService": "Customer Service",
    "footer.tracking": "Delivery Tracking",
    "footer.warranty": "Warranty",
    "footer.returns": "Returns",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookies Policy",
    "footer.stayInformed": "Stay Informed",
    "footer.newsletter": "Subscribe to our newsletter to receive exclusive offers and the latest news.",
    "footer.emailPlaceholder": "Your email address",
    "footer.joinClub": "Join Our Club",
    "footer.copyright": "© {year} AUTO PBH. All rights reserved.",
    "footer.legal": "Legal Notice",
    "footer.dataProtection": "Data Protection",
    "home.title": "Find Your Dream Car",
    "home.subtitle":
      "Explore our exclusive selection of premium vehicles and experience unparalleled service.",
    "home.exploreCatalog": "Explore Catalog",
    "home.whyChooseUs": "Why Choose Us?",
    "home.wideSelection": "Wide Selection",
    "home.competitivePrices": "Competitive Prices",
    "home.premiumQuality": "Premium Quality",
    "home.customerSatisfaction": "Customer Satisfaction",
    "home.discoverMore": "Discover More",
    "home.latestModels": "Latest Models",
    "home.ourCommitment": "Our Commitment",
    "home.commitmentDescription":
      "We are committed to providing you with the best possible car buying experience.",
    "home.expertAdvice": "Expert Advice",
    "home.transparentProcess": "Transparent Process",
    "home.afterSalesService": "After-Sales Service",
    "home.happyClients": "Happy Clients",
    "home.testimonials": "Testimonials",
    "home.viewMoreTestimonials": "View More Testimonials",
    "home.contactUs": "Contact Us",
    "services.title": "Exceptional Services",
    "services.subtitle": "AUTO PBH is committed to offering an unparalleled experience in the acquisition and maintenance of premium vehicles. Our passion for excellence translates into customized services.",
    "services.purchase.title": "Purchase & Trade-in of Premium Vehicles",
    "services.purchase.subtitle": "Recognized expertise in the high-end automotive sector",
    "services.purchase.description": "Our expertise in the premium vehicle market guarantees you a transaction with complete peace of mind. Our rigorous process includes:",
    "services.purchase.evaluation": "Professional Evaluation",
    "services.purchase.evaluation.desc": "Comprehensive and free analysis of your current vehicle by our certified experts, with detailed documentation and optimal trade-in price estimation.",
    "services.purchase.tradein": "All Brands Trade-in",
    "services.purchase.tradein.desc": "We buy back your vehicle regardless of its brand or condition, offering you the best market conditions and a simplified process.",
    "services.purchase.transaction": "Secure Transaction",
    "services.purchase.transaction.desc": "Quick and secure payment, with multiple options available according to your preferences, including instant bank transfer and certified transfer.",
    "services.purchase.admin": "Complete Administrative Management",
    "services.purchase.admin.desc": "Handling of all administrative formalities, including change of ownership, export documents and registration.",
    "services.delivery.title": "Turnkey Delivery",
    "services.delivery.subtitle": "Premium and personalized transport throughout Europe",
    "services.delivery.description": "Our premium delivery service covers the entire European territory with special attention to details:",
    "services.delivery.transport": "Premium Transport",
    "services.delivery.transport.desc": "Ultra-secure transport in specialized closed trucks with temperature control and anti-vibration equipment. Full insurance during the entire journey and handling by highly trained teams.",
    "services.delivery.tracking": "Real-time Tracking",
    "services.delivery.tracking.desc": "Dedicated application to track your vehicle in real time, with notifications at each important stage. Permanent contact with our team of multilingual logistics coordinators.",
    "services.delivery.customized": "Personalized Service",
    "services.delivery.customized.desc": "Delivery scheduled according to your availability, 7 days a week, including evenings and weekends. Complete presentation of the vehicle and demonstration of its features when handing over the keys.",
    "services.delivery.documentation": "Complete Documentation",
    "services.delivery.documentation.desc": "Complete file delivered with the vehicle: detailed history, maintenance books, warranties, technical manuals and certificates of authenticity for collector models.",
    "services.additionalServices": "Additional Services",
    "services.financing": "Financing Solutions",
    "services.financing.desc": "Personalized financing with preferential rates, leasing and leasing with flexible purchase options.",
    "services.discoverOffers": "Discover our offers",
    "services.afterSales": "After-Sales Service",
    "services.afterSales.desc": "Premium maintenance, repairs by certified technicians and tailor-made maintenance program.",
    "services.learnMore": "Learn more",
    "services.expressAppointment": "Express Appointment",
    "services.expressAppointment.desc": "Priority service within 24 hours, immediate video consultation and emergency assistance.",
    "services.makeAppointment": "Make an appointment",
    "services.international": "International Service",
    "services.international.desc": "Support for import/export, multi-country documentation and regulatory compliance.",
    "services.contactUs": "Contact us",
    "services.customService": "Need a Custom Service?",
    "services.customService.desc": "Our team of experts is available to develop a solution perfectly adapted to your specific requirements.",
    "services.contactPremiumTeam": "Contact Our Premium Team",
    "financing.title": "Financing Solutions",
    "financing.subtitle": "Tailor-Made Financing",
    "financing.description": "AUTO PBH offers financing solutions tailored to your financial situation with our exceptional partner banks.",
    "financing.preferentialRates": "Preferential Rates",
    "financing.preferentialRates.desc": "Benefit from negotiated rates from 2.9% with our partner banking institutions.",
    "financing.instantSimulation": "Instant Simulation",
    "financing.instantSimulation.desc": "Get a personalized online simulation and receive an agreement in principle within 2 hours.",
    "financing.flexibleOptions": "Flexible Options",
    "financing.flexibleOptions.desc": "Choose between classic credit, long-term leasing or deferred payment according to your preferences.",
    "financing.calculator": "Financing Calculator",
    "financing.requestQuote": "Request a personalized quote",
    "faq.title": "FAQ",
    "faq.description": "Find here the answers to the most common questions about our vehicles and services.",
    "faq.contactUs": "Contact Us",
    "faq.otherQuestions": "Do you have other questions?",
    "faq.ourTeam": "Our team is at your disposal to answer all your questions.",
    "faq.vehicleCondition": "What is the condition of the vehicle and its current mileage?",
    "faq.vehicleConditionAnswer": "All our vehicles are inspected by our experts. The exact mileage is indicated on each product sheet (example: Audi A4 2021 – 45,000 km). The condition is classified as:",
    "faq.condition.asNew": "As new (no mechanical or aesthetic defects)",
    "faq.condition.veryGood": "Very good condition (slight signs of use)",
    "faq.condition.good": "Good condition (small defects without technical impact)",
    "faq.partsReplacement": "Has there been any replacement or update of parts?",
    "faq.partsReplacementAnswer": "Yes, we indicate all the parts replaced (e.g. clutch, brakes, battery) in the expert report. Ask for it for the vehicle that interests you!",
    "legal.title": "Legal Notice",
    "legal.companyInfo": "Legal Information",
    "privacy.title": "Data Protection",
    "privacy.description": "Our Privacy Policy",
    "privacy.statement": "At AUTO PBH, we attach great importance to the protection of your personal data. This policy details what information we collect, how we use it and the measures we take to ensure its security.",
    "cookies.title": "Cookie Management",
    "cookies.description": "Cookies Policy",
    "cookies.statement": "AUTO PBH uses cookies to improve your experience on our site, personalize content and advertising, provide social media features and analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners.",
    "cookies.customize": "You can customize your cookie preferences below or accept all cookies to enjoy an optimal experience on our site.",
    "returns.title": "Satisfaction Policy",
    "returns.commitment": "Our Quality Commitment",
    "returns.guarantee": "Unsatisfied? We will take back your vehicle within 7 days, free of charge. Conditions: mileage identical to delivery.",
    "returns.satisfaction": "At AUTO PBH, your complete satisfaction is our top priority. We are so confident in the quality of our vehicles that we offer you a unique satisfaction guarantee in the premium automotive market.",
    "returns.contactAdvice": "If you have any questions regarding our return policy, please contact your personal advisor.",
    "returns.contactAdvisor": "Contact my advisor",
    "cookies.savePreferences": "Save my preferences",
    "cookies.acceptAll": "Accept all cookies",
  },

  pt: {
    "nav.catalog": "Catálogo",
    "nav.services": "Serviços",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "nav.faq": "FAQ",
    "nav.search": "Pesquisar",
    "nav.cart": "Carrinho",
    "nav.account": "Conta",
    "shop.addToCart": "Adicionar ao carrinho",
    "shop.vehicleAdded": "Veículo adicionado",
    "shop.vehicleAddedDesc": "{vehicle} foi adicionado ao seu carrinho.",
    "shop.alreadyInCart": "Já está no carrinho",
    "shop.alreadyInCartDesc": "Este veículo já está no seu carrinho.",
    "catalog.title": "Explore a Nossa Coleção Premium",
    "catalog.description":
      "Descubra uma vasta seleção de veículos de alta qualidade para atender às suas necessidades.",
    "catalog.premiumCollection": "Seleção Premium",
    "catalog.selectionDescription":
      "Veículos cuidadosamente selecionados pela sua qualidade e desempenho.",
    "catalog.inspected": "Inspecionados Minuciosamente",
    "catalog.history": "Relatório Detalhado do Histórico",
    "catalog.certified": "Qualidade Certificada",
    "catalog.warranty": "Opções de Garantia Estendida",
    "catalog.advancedSearch": "Pesquisa Avançada",
    "catalog.advancedSearchDesc": "Encontre exatamente o que procura com as nossas opções de pesquisa avançada.",
    "catalog.customFilters": "Filtros Personalizados",
    "catalog.customFiltersDesc": "Personalize a sua pesquisa com critérios específicos.",
    "catalog.viewDetails": "Ver Detalhes",
    "footer.description":
      "A AUTO PBH é o seu principal destino para veículos premium. Oferecemos uma vasta seleção de carros de alta qualidade e um atendimento ao cliente excecional.",
    "footer.address": "Autolettestraat 10",
    "footer.city": "3063 NP Rotterdam",
    "footer.country": "Países Baixos",
    "footer.mainServices": "Serviços Principais",
    "footer.collection": "A Nossa Coleção",
    "footer.services": "Os Nossos Serviços",
    "footer.financing": "Financiamento",
    "footer.faq": "FAQ",
    "footer.contactPrivilege": "Contato Privilegiado",
    "footer.customerService": "Atendimento ao Cliente",
    "footer.tracking": "Rastreamento de Entrega",
    "footer.warranty": "Garantia",
    "footer.returns": "Devoluções",
    "footer.terms": "Termos de Serviço",
    "footer.privacy": "Política de Privacidade",
    "footer.cookies": "Política de Cookies",
    "footer.stayInformed": "Mantenha-se Informado",
    "footer.newsletter": "Subscreva a nossa newsletter para receber ofertas exclusivas e as últimas notícias.",
    "footer.emailPlaceholder": "O seu endereço de email",
    "footer.joinClub": "Junte-se ao Nosso Clube",
    "footer.copyright": "© {year} AUTO PBH. Todos os direitos reservados.",
    "footer.legal": "Aviso Legal",
    "footer.dataProtection": "Proteção de Dados",
    "home.title": "Encontre o Carro dos Seus Sonhos",
    "home.subtitle":
      "Explore a nossa seleção exclusiva de veículos premium e experimente um serviço incomparável.",
    "home.exploreCatalog": "Explorar Catálogo",
    "home.whyChooseUs": "Porquê Escolher-nos?",
    "home.wideSelection": "Vasta Seleção",
    "home.competitivePrices": "Preços Competitivos",
    "home.premiumQuality": "Qualidade Premium",
    "home.customerSatisfaction": "Satisfação do Cliente",
    "home.discoverMore": "Descobrir Mais",
    "home.latestModels": "Últimos Modelos",
    "home.ourCommitment": "O Nosso Compromisso",
    "home.commitmentDescription":
      "Estamos comprometidos em fornecer-lhe a melhor experiência possível de compra de carros.",
    "home.expertAdvice": "Aconselhamento Especializado",
    "home.transparentProcess": "Processo Transparente",
    "home.afterSalesService": "Serviço Pós-Venda",
    "home.happyClients": "Clientes Satisfeitos",
    "home.testimonials": "Testemunhos",
    "home.viewMoreTestimonials": "Ver Mais Testemunhos",
    "home.contactUs": "Contacte-nos",
    "services.title": "Serviços de Exceção",
    "services.subtitle": "A AUTO PBH está comprometida em oferecer uma experiência inigualável na aquisição e manutenção de veículos premium. Nossa paixão pela excelência se traduz em serviços personalizados.",
    "services.purchase.title": "Compra e Retoma de Veículos Premium",
    "services.purchase.subtitle": "Expertise reconhecida no setor automóvel de gama alta",
    "services.purchase.description": "Nossa expertise no mercado de veículos premium garante-lhe uma transação com total tranquilidade. Nosso processo rigoroso inclui:",
    "services.purchase.evaluation": "Avaliação Profissional",
    "services.purchase.evaluation.desc": "Análise abrangente e gratuita do seu veículo atual por nossos especialistas certificados, com documentação detalhada e estimativa ótima do preço de retoma.",
    "services.purchase.tradein": "Retoma de Todas as Marcas",
    "services.purchase.tradein.desc": "Compramos o seu veículo independentemente da marca ou estado, oferecendo-lhe as melhores condições do mercado e um processo simplificado.",
    "services.purchase.transaction": "Transação Segura",
    "services.purchase.transaction.desc": "Pagamento rápido e seguro, com múltiplas opções disponíveis de acordo com as suas preferências, incluindo transferência bancária instantânea e transferência certificada.",
    "services.purchase.admin": "Gestão Administrativa Completa",
    "services.purchase.admin.desc": "Tratamento de todas as formalidades administrativas, incluindo mudança de proprietário, documentos de exportação e registro.",
    "services.delivery.title": "Entrega Chave na Mão",
    "services.delivery.subtitle": "Transporte premium e personalizado em toda a Europa",
    "services.delivery.description": "O nosso serviço de entrega premium cobre todo o território europeu com especial atenção aos detalhes:",
    "services.delivery.transport": "Transporte Premium",
    "services.delivery.transport.desc": "Transporte ultra-seguro em caminhões fechados especializados com controle de temperatura e equipamento anti-vibração. Seguro completo durante toda a viagem e manuseio por equipes altamente treinadas.",
    "services.delivery.tracking": "Acompanhamento em Tempo Real",
    "services.delivery.tracking.desc": "Aplicação dedicada para acompanhar o seu veículo em tempo real, com notificações em cada etapa importante. Contato permanente com nossa equipe de coordenadores logísticos multilíngues.",
    "services.delivery.customized": "Serviço Personalizado",
    "services.delivery.customized.desc": "Entrega programada de acordo com a sua disponibilidade, 7 dias por semana, incluindo noites e fins de semana. Apresentação completa do veículo e demonstração das suas funcionalidades na entrega das chaves.",
    "services.delivery.documentation": "Documentação Completa",
    "services.delivery.documentation.desc": "Arquivo completo entregue com o veículo: histórico detalhado, livros de manutenção, garantias, manuais técnicos e certificados de autenticidade para modelos de coleção.",
    "services.additionalServices": "Serviços Adicionais",
    "services.financing": "Soluções de Financiamento",
    "services.financing.desc": "Financiamento personalizado com taxas preferenciais, crédito e leasing com opções de compra flexíveis.",
    "services.discoverOffers": "Descubra as nossas ofertas",
    "services.afterSales": "Serviço Pós-Venda",
    "services.afterSales.desc": "Manutenção premium, reparações por técnicos certificados e programa de manutenção personalizado.",
    "services.learnMore": "Saiba mais",
    "services.expressAppointment": "Consulta Expressa",
    "services.expressAppointment.desc": "Serviço prioritário em 24 horas, consulta de vídeo imediata e assistência de emergência.",
    "services.makeAppointment": "Marcar consulta",
    "services.international": "Serviço Internacional",
    "services.international.desc": "Apoio à importação/exportação, documentação multi-países e conformidade regulamentar.",
    "services.contactUs": "Contacte-nos",
    "services.customService": "Precisa de um Serviço Personalizado?",
    "services.customService.desc": "A nossa equipa de especialistas está disponível para desenvolver uma solução perfeitamente adaptada às suas necessidades específicas.",
    "services.contactPremiumTeam": "Contacte a Nossa Equipa Premium",
    "financing.title": "Soluções de Financiamento",
    "financing.subtitle": "Financiamento Sob Medida",
    "financing.description": "A AUTO PBH oferece soluções de financiamento adaptadas à sua situação financeira com os nossos bancos parceiros de exceção.",
    "financing.preferentialRates": "Taxas Preferenciais",
    "financing.preferentialRates.desc": "Beneficie de taxas negociadas a partir de 2,9% com as nossas instituições bancárias parceiras.",
    "financing.instantSimulation": "Simulação Instantânea",
    "financing.instantSimulation.desc": "Obtenha uma simulação personalizada online e receba um acordo de princípio em 2 horas.",
    "financing.flexibleOptions": "Opções Flexíveis",
    "financing.flexibleOptions.desc": "Escolha entre crédito clássico, leasing de longo prazo ou pagamento diferido de acordo com as suas preferências.",
    "financing.calculator": "Calculadora de Financiamento",
    "financing.requestQuote": "Solicitar um orçamento personalizado",
    "faq.title": "FAQ",
    "faq.description": "Encontre aqui as respostas às perguntas mais frequentes sobre os nossos veículos e serviços.",
    "faq.contactUs": "Contacte-nos",
    "faq.otherQuestions": "Tem outras perguntas?",
    "faq.ourTeam": "A nossa equipa está à sua disposição para responder a todas as suas perguntas.",
    "faq.vehicleCondition": "Qual é o estado do veículo e a sua quilometragem atual?",
    "faq.vehicleConditionAnswer": "Todos os nossos veículos são inspecionados pelos nossos especialistas. A quilometragem exata é indicada em cada ficha de produto (exemplo: Audi A4 2021 – 45.000 km). O estado é classificado como:",
    "faq.condition.asNew": "Como novo (sem defeitos mecânicos ou estéticos)",
    "faq.condition.veryGood": "Muito bom estado (ligeiros sinais de uso)",
    "faq.condition.good": "Bom estado (pequenos defeitos sem impacto técnico)",
    "faq.partsReplacement": "Houve alguma substituição ou atualização de peças?",
    "faq.partsReplacementAnswer": "Sim, indicamos todas as peças substituídas (ex: embraiagem, travões, bateria) no relatório de perícia. Peça-o para o veículo que lhe interessa!",
    "legal.title": "Aviso Legal",
    "legal.companyInfo": "Informações Legais",
    "privacy.title": "Proteção de Dados",
    "privacy.description": "A Nossa Política de Privacidade",
    "privacy.statement": "Na AUTO PBH, atribuímos grande importância à proteção dos seus dados pessoais. Esta política detalha quais as informações que recolhemos, como as utilizamos e as medidas que tomamos para garantir a sua segurança.",
    "cookies.title": "Gestão de Cookies",
    "cookies.description": "Política de Cookies",
    "cookies.statement": "A AUTO PBH utiliza cookies para melhorar a sua experiência no nosso site, personalizar o conteúdo e a publicidade, fornecer funcionalidades de redes sociais e analisar o nosso tráfego. Também partilhamos informações sobre a sua utilização do nosso site com os nossos parceiros de redes sociais, publicidade e análise.",
    "cookies.customize": "Pode personalizar as suas preferências de cookies abaixo ou aceitar todos os cookies para desfrutar de uma experiência ideal no nosso site.",
    "returns.title": "Política de Satisfação",
    "returns.commitment": "O Nosso Compromisso de Qualidade",
    "returns.guarantee": "Insatisfeito? Retomamos o seu veículo em 7 dias, sem custos. Condições: quilometragem idêntica à da entrega.",
    "returns.satisfaction": "Na AUTO PBH, a sua total satisfação é a nossa prioridade máxima. Estamos tão confiantes na qualidade dos nossos veículos que lhe oferecemos uma garantia de satisfação única no mercado automóvel premium.",
    "returns.contactAdvice": "Se tiver alguma questão sobre a nossa política de devolução, não hesite em contactar o seu consultor pessoal.",
    "returns.contactAdvisor": "Contactar o meu consultor",
    "cookies.savePreferences": "Guardar as minhas preferências",
    "cookies.acceptAll": "Aceitar todos os cookies",
  },

  fr: {
    "nav.catalog": "Catalogue",
    "nav.services": "Services",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.search": "Recherche",
    "nav.cart": "Panier",
    "nav.account": "Compte",
    "shop.addToCart": "Ajouter au panier",
    "shop.vehicleAdded": "Véhicule ajouté",
    "shop.vehicleAddedDesc": "{vehicle} a été ajouté à votre panier.",
    "shop.alreadyInCart": "Déjà dans le panier",
    "shop.alreadyInCartDesc": "Ce véhicule est déjà dans votre panier.",
    "catalog.title": "Explorez Notre Collection Premium",
    "catalog.description":
      "Découvrez une large sélection de véhicules de haute qualité pour répondre à vos besoins.",
    "catalog.premiumCollection": "Sélection Premium",
    "catalog.selectionDescription":
      "Véhicules soigneusement sélectionnés pour leur qualité et leurs performances.",
    "catalog.inspected": "Inspectés Minutieusement",
    "catalog.history": "Rapport d'Historique Détaillé",
    "catalog.certified": "Qualité Certifiée",
    "catalog.warranty": "Options de Garantie Prolongée",
    "catalog.advancedSearch": "Recherche Avancée",
    "catalog.advancedSearchDesc": "Trouvez exactement ce que vous cherchez grâce à nos options de recherche avancée.",
    "catalog.customFilters": "Filtres Personnalisés",
    "catalog.customFiltersDesc": "Personnalisez votre recherche avec des critères spécifiques.",
    "catalog.viewDetails": "Voir les Détails",
    "footer.description":
      "AUTO PBH est votre destination privilégiée pour les véhicules premium. Nous offrons une large sélection de voitures de haute qualité et un service client exceptionnel.",
    "footer.address": "Autolettestraat 10",
    "footer.city": "3063 NP Rotterdam",
    "footer.country": "Pays-Bas",
    "footer.mainServices": "Services Principaux",
    "footer.collection": "Notre Collection",
    "footer.services": "Nos Services",
    "footer.financing": "Financement",
    "footer.faq": "FAQ",
    "footer.contactPrivilege": "Contact Privilégié",
    "footer.customerService": "Service Client",
    "footer.tracking": "Suivi de Livraison",
    "footer.warranty": "Garantie",
    "footer.returns": "Retours",
    "footer.terms": "Conditions d'Utilisation",
    "footer.privacy": "Politique de Confidentialité",
    "footer.cookies": "Politique de Cookies",
    "footer.stayInformed": "Restez Informé",
    "footer.newsletter": "Abonnez-vous à notre newsletter pour recevoir des offres exclusives et les dernières actualités.",
    "footer.emailPlaceholder": "Votre adresse e-mail",
    "footer.joinClub": "Rejoignez Notre Club",
    "footer.copyright": "© {year} AUTO PBH. Tous droits réservés.",
    "footer.legal": "Mentions Légales",
    "footer.dataProtection": "Protection des Données",
    "home.title": "Trouvez la Voiture de Vos Rêves",
    "home.subtitle":
      "Explorez notre sélection exclusive de véhicules premium et profitez d'un service inégalé.",
    "home.exploreCatalog": "Explorer le Catalogue",
    "home.whyChooseUs": "Pourquoi Nous Choisir ?",
    "home.wideSelection": "Large Sélection",
    "home.competitivePrices": "Prix Compétitifs",
    "home.premiumQuality": "Qualité Premium",
    "home.customerSatisfaction": "Satisfaction Client",
    "home.discoverMore": "Découvrir Plus",
    "home.latestModels": "Derniers Modèles",
    "home.ourCommitment": "Notre Engagement",
    "home.commitmentDescription":
      "Nous nous engageons à vous offrir la meilleure expérience possible d'achat de voiture.",
    "home.expertAdvice": "Conseils d'Experts",
    "home.transparentProcess": "Processus Transparent
