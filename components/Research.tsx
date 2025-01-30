/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

interface ResearchSectionProps {
    title: string;
    content: string;
    link?: string;
    asideImage?: string;
    asideText?: string;
    tableData?: { [key: string]: string | number }[];
}

const ResearchSection = ({ title, content, link, asideImage, asideText, tableData }: ResearchSectionProps) => {
    return (
        <motion.div className="my-8">
            <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
            <p className="text-sm text-gray-300 mb-4">{content}</p>

            {link && (
                <a href={link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    {link}
                </a>
            )}

            {asideImage && asideText && (
                <aside className="flex items-center space-x-2 bg-gray-800 p-4 rounded-md mt-6">
                    {/* <img src={asideImage} alt="icon" width="40px" /> */}
                    <p className="text-sm font-mono text-gray-400">{asideText}</p>
                </aside>
            )}

            {tableData && tableData.length > 0 && (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full text-sm text-left text-gray-400">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nominee</th>
                                <th className="px-4 py-2">Odds</th>
                                <th className="px-4 py-2">Implied Prob.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{row['Nominee']}</td>
                                    <td className="px-4 py-2">{row['Odds']}</td>
                                    <td className="px-4 py-2">{row['Implied Prob.']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

const GrammyResearch = () => {
    return (
        <motion.div className=" p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResearchSection
                title="Quais são as previsões para o Grammy Awards 2025?"
                content="A 67ª edição do Grammy está chegando, e nós fomos atrás das apostas para as quatro categorias mais cobiçadas da noite – ou, para os íntimos, o Big Four: Gravação do Ano, Álbum do Ano, Canção do Ano e Artista Revelação. Nos Estados Unidos, é comum apostar no Grammy por meio das famosas BETs, onde tudo gira em torno das probabilidades (*odds*). Os apostadores podem jogar no seguro e escolher os favoritos ou arriscar nos outsiders – e quanto maior o risco, maior o prêmio. Para esta análise, mergulhamos nos números de sites especializados nessas apostas e cruzamos com previsões da *Billboard, The Guardian, Vulture, AP News* e, claro, aquela que tem a língua igual um chicote: Pitchfork."
            />

            <ResearchSection
                title="Dados Quantitativos"
                content="As previsões para o Grammy são baseadas em análises detalhadas de diversas fontes, incluindo a Action Network e Kalshi, plataformas de previsão de eventos."
                asideImage="/icons/robot_lightgray.svg"
                asideText="Conteúdo feito com apoio de IA."
            />

            <ResearchSection
                title="2025 Grammy Odds"
                content="Aqui estão as odds para algumas das principais categorias do Grammy 2025."
                tableData={[
                    { "Nominee": "Brat (Charli XCX)", "Odds": "+150", "Implied Prob.": "40%" },
                    { "Nominee": "Cowboy Carter (Beyoncé)", "Odds": "+240", "Implied Prob.": "29.41%" },
                    { "Nominee": "Hit Me Hard and Soft (Billie Eilish)", "Odds": "+300", "Implied Prob.": "25%" },
                    { "Nominee": "The Rise and Fall of a Midwest Princess (Chappell Roan)", "Odds": "+750", "Implied Prob.": "11.76%" },
                    { "Nominee": "The Tortured Poets Department (Taylor Swift)", "Odds": "+1200", "Implied Prob.": "7.69%" },
                    { "Nominee": "Short n' Sweet (Sabrina Carpenter)", "Odds": "+2600", "Implied Prob.": "3.7%" }
                ]}
            />
        </motion.div>
    );
};

export default GrammyResearch;
