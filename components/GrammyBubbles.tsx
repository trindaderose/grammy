/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface PredictionNode extends d3.SimulationNodeDatum {
    name: string;
    prediction: number;
}

interface CategoryProps {
    category: PredictionNode[];
    title: string;
}

const categories = [
    { title: "Álbum do Ano", key: "album" },
    { title: "Canção do Ano", key: "song" },
    { title: "Gravação do Ano", key: "record" },
    { title: "Artista Revelação", key: "new_artist" }
];

const data: { [key: string]: PredictionNode[] } = {
    album: [
        { name: "Brat (Charli XCX)", prediction: 40 },
        { name: "Cowboy Carter (Beyoncé)", prediction: 29.41 },
        { name: "Hit Me Hard and Soft (Billie Eilish)", prediction: 25 },
        { name: "The Tortured Poets Department (Taylor Swift)", prediction: 7.69 }
    ],
    song: [
        { name: "Birds of a Feather (Billie Eilish)", prediction: 64.29 },
        { name: "Not Like Us (Kendrick Lamar)", prediction: 17.24 },
        { name: "Good Luck, Babe! (Chappell Roan)", prediction: 15.38 },
        { name: "Die with a Smile (Lady Gaga and Bruno Mars)", prediction: 11.76 },
        { name: "Texas Hold 'Em (Beyoncé)", prediction: 7.14 }
    ],
    record: [
        { name: "Espresso (Sabrina Carpenter)", prediction: 81.13 },
        { name: "Birds of a Feather (Billie Eilish)", prediction: 20.83 },
        { name: "Not Like Us (Kendrick Lamar)", prediction: 16.67 },
        { name: "Now and Then (The Beatles)", prediction: 9.09 },
        { name: "Texas Hold 'Em (Beyoncé)", prediction: 0 },
    ],
    new_artist: [
        { name: "Chappell Roan", prediction: 84.62 },
        { name: "Sabrina Carpenter", prediction: 11.76 },
        { name: "Shaboozey", prediction: 7.14 },
        { name: "Doechii", prediction: 0 },
    ]
};

interface BubbleChartProps {
    category: PredictionNode[];
    title: string;
    onMouseEnter: (data: PredictionNode) => void;
    onMouseLeave: () => void;
    onMouseMove: (event: React.MouseEvent) => void;
}

const BubbleChart = ({ category, title, onMouseEnter, onMouseLeave, onMouseMove }: BubbleChartProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = window.innerWidth;
        const height = window.innerHeight;

        svg.attr("width", width).attr("height", height);

        const simulation = d3.forceSimulation<PredictionNode>(category)
            .force("charge", d3.forceManyBody().strength(3))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide<PredictionNode>().radius(d => d.prediction * 3))
            .on("tick", ticked);

        const colorScale = d3.scaleOrdinal(d3.schemeSet2);

        const nodes = svg.selectAll(".bubble")
            .data(category)
            .enter()
            .append("circle")
            .attr("class", "bubble")
            .attr("r", (d: PredictionNode) => d.prediction)
            .attr("fill", (d: PredictionNode, i: number) => colorScale(i.toString()))
            .attr("cx", (d: PredictionNode) => d.x ?? 0)
            .attr("cy", (d: PredictionNode) => d.y ?? 0)
            .attr("r", (d: PredictionNode) => d.prediction * 5)  // Aumentando o raio multiplicando por 4
            .style("opacity", 0)
            .on("mouseenter", (event, d) => onMouseEnter(d))
            .on("mouseleave", onMouseLeave)
            .on("mousemove", onMouseMove);

        gsap.to(nodes.nodes(), { duration: 1, opacity: 1, ease: "power2.out" });

        const labels = svg.selectAll(".label")
            .data(category)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .text((d: PredictionNode) => d.name);

        function ticked() {
            nodes.attr("cx", (d: PredictionNode) => d.x ?? 0)
                .attr("cy", (d: PredictionNode) => d.y ?? 0);
            labels.attr("x", (d: PredictionNode) => d.x ?? 0)
                .attr("y", (d: PredictionNode) => d.y ?? 0);
        }
    }, [category, onMouseEnter, onMouseLeave, onMouseMove]);

    return (
        <div className="relative h-full w-full">
            <h3 className="text-sm font-bold mb-4 p-4">{title}</h3>
            <svg ref={svgRef} className="absolute top-0 left-0"></svg> {/* Fazendo o SVG ocupar toda a tela */}
        </div>
    );
};

const GrammyBubbles = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("album");
    const [tooltipData, setTooltipData] = useState<PredictionNode | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const handleMouseEnter = (data: PredictionNode) => {
        setTooltipData(data);
    };

    const handleMouseLeave = () => {
        setTooltipData(null);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (tooltipData) {
            setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
        }
    };

    const handleCategoryClick = (categoryKey: string) => {
        setSelectedCategory(categoryKey);
    };

    return (
        <div className="h-screen w-screen flex flex-col text-black">
            <h2 className="text-sm mb-6 p-4">Previsões do Grammy</h2>
            <div className="flex space-x-4 mb-6 p-4">
                {categories.map((cat) => (
                    <Button
                        key={cat.key}
                        className="text-sm px-4 py-2 rounded"
                        variant={"outline"}
                        onClick={() => handleCategoryClick(cat.key)}
                    >
                        {cat.title}
                    </Button>
                ))}
            </div>
            <BubbleChart
                category={data[selectedCategory]}
                title={categories.find((cat) => cat.key === selectedCategory)?.title || ""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            />
            {tooltipData && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="absolute z-50 p-4 bg-white/50 text-black rounded-lg shadow-lg"
                                style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                            >
                                <div className="font-bold text-sm">{tooltipData.name}</div>
                                <div className="font-bold text-sm">Predição: {tooltipData.prediction}%</div>
                            </div>
                        </TooltipTrigger>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
};


export default GrammyBubbles;
