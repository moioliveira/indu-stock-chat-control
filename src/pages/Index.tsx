
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Database, ChartLine, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-4 shadow-md fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Database className="mr-2" />
            <h1 className="text-2xl font-bold">eStoquei</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#recursos" className="hover:text-blue-200 font-medium">Recursos</a>
            <a href="#beneficios" className="hover:text-blue-200 font-medium">Benefícios</a>
            <a href="#contato" className="hover:text-blue-200 font-medium">Contato</a>
            <Link to="/estoque">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                Acessar Sistema
              </Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
                Revolucione seu controle de estoque com Inteligência Artificial
              </h1>
              <p className="text-lg text-gray-700">
                O eStoquei é a solução definitiva para gestão de inventário e balanceamento de estoque entre centros de distribuição, potencializada por IA avançada.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/estoque">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Começar Agora
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <a href="#demonstracao">
                  <Button variant="outline" size="lg">
                    Ver Demonstração
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl border border-blue-100">
                <div className="aspect-video bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
                  <Database className="h-20 w-20 text-blue-500" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-800">Gestão Inteligente</h3>
                  <p className="text-gray-600">Visualize e controle seu estoque em tempo real com insights gerados por IA para otimização de recursos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Potencializado por Inteligência Artificial</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma utiliza algoritmos avançados de IA para transformar completamente a maneira como você gerencia seu estoque.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Previsão de Demanda</h3>
                <p className="text-gray-600">
                  Antecipe-se às necessidades do mercado com previsões precisas baseadas em padrões históricos e tendências sazonais identificadas por nossa IA.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Balanceamento de Estoque</h3>
                <p className="text-gray-600">
                  Distribua seu inventário de forma otimizada entre múltiplos centros de distribuição, minimizando custos e maximizando a disponibilidade.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <ChartLine className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Sugestão de Reposição</h3>
                <p className="text-gray-600">
                  Receba recomendações inteligentes sobre quando e quanto repor, evitando excesso ou falta de estoque em todos os seus centros.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Benefícios do eStoquei</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa solução oferece vantagens competitivas que transformam sua cadeia de suprimentos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Para Empresas</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Redução de até 30% nos custos de armazenamento</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Diminuição de 25% nas rupturas de estoque</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Aumento de 40% na precisão das previsões de demanda</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Otimização completa da cadeia logística</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Para Gestores</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Interface intuitiva para tomada de decisões rápidas</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Dashboards personalizados com métricas relevantes</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Alertas inteligentes para prevenir problemas</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">Relatórios automatizados para análises profundas</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demonstracao" className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para revolucionar sua gestão de estoque?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Agende uma demonstração gratuita e descubra como o eStoquei pode transformar sua operação logística com o poder da Inteligência Artificial.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/estoque">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Começar Gratuitamente
              </Button>
            </Link>
            <a href="#contato">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                Falar com Especialista
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Entre em Contato</h2>
            <p className="text-gray-600 mb-8">
              Estamos à disposição para tirar suas dúvidas e mostrar como o eStoquei pode se adaptar às necessidades específicas do seu negócio.
            </p>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-blue-800">E-mail</h3>
                <p className="text-gray-700">contato@estoquei.com.br</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-blue-800">Telefone</h3>
                <p className="text-gray-700">(11) 4002-8922</p>
              </div>
              <Button className="w-full">
                Solicitar Contato
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Database className="mr-2" />
                <span className="text-xl font-bold">eStoquei</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">© 2025 eStoquei. Todos os direitos reservados.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-white">Política de Privacidade</a>
              <a href="#" className="text-gray-300 hover:text-white">Termos de Uso</a>
              <a href="#" className="text-gray-300 hover:text-white">Blog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
