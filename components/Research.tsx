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
        <motion.div className="my-8 bg-[#150317]">
            <h2 className="text-5xl font-bold text-white mb-4 pt-10 max-w-screen-md">{title}</h2>
            <p className="text-sm text-gray-300 max-w-screen-sm mb-4">{content}</p>

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
        <motion.div className="h-full p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResearchSection
                title="Quais são as previsões para o Grammy Awards 2025?"
                content="A 67ª edição do Grammy Awards será no domingo, 2 de fevereiro, e nós fomos atrás das apostas para as quatro categorias mais cobiçadas da noite – ou, para os íntimos, o Big Four: Gravação do Ano, Álbum do Ano, Canção do Ano e Artista Revelação. Para esta análise, combinamos três frentes de previsão: os dados da Action Network, conhecida por suas análises detalhadas; a Kalshi, uma bolsa de valores que reflete a percepção do mercado por meio da negociação de contratos baseados em eventos reais; e as projeções de veículos influentes como Billboard, The Guardian, Vulture, AP News e Pitchfork. Nos Estados Unidos, apostar em premiações como o Grammy é algo comum nas famosas BETs, onde tudo gira em torno das probabilidades (odds). Os apostadores podem jogar no seguro e escolher os favoritos ou arriscar nos outsiders – e quanto maior o risco, maior o prêmio."
            />
        </motion.div>
    );
};

export default GrammyResearch;
