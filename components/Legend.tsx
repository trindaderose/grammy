import React from 'react';

const Legend = () => {
    return (
        <div className="rounded-lg shadow-md m-5 max-w-3xl">
            <h4 className="font-bold font-mono text-sm text-[#e0d1e8] mb-2">Legenda</h4>
            <div className="text-[12px] text-white/50 mb-4">Clique na imagem do artista para mais detalhes.</div>
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-[#e2ff8e] rounded-full"></div>
                    <p className="text-[12px] text-[#e0d1e8] whitespace-normal">
                        <strong>Média Geral:</strong> Calculada a partir de três fontes principais: Análise Preditiva, Apostas do Público e Apostas da Crítica.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-[#ffffff] rounded-full"></div>
                    <p className="text-[12px] text-[#e0d1e8] whitespace-normal">
                        <strong>Análise Preditiva:</strong> Usa modelos estatísticos e tendências históricas para prever vencedores do Grammy Awards.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-[#ffaab9] rounded-full"></div>
                    <p className="text-[12px] text-[#e0d1e8] whitespace-normal">
                        <strong>Apostas do Mercado:</strong> Coletadas via Kalshi. Os preços dos contratos refletem a percepção coletiva sobre os favoritos. Dados coletados em 29/01.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-[#d03200] rounded-full"></div>
                    <p className="text-[12px] text-[#e0d1e8] whitespace-normal">
                        <strong>Apostas da Crítica:</strong> Baseadas na análise de Billboard, The Guardian, Vulture, AP News e Pitchfork, com pesos atribuídos por especialização, influência, profundidade e popularidade.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Legend;