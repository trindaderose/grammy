/* eslint-disable react-hooks/exhaustive-deps */

'use client';
import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { categories, data, PredictionNode } from "../data/data";

interface BubbleChartProps {
    category: PredictionNode[];
    title: string;
    onMouseEnter: (data: PredictionNode) => void;
    onMouseLeave: () => void;
    onMouseMove: (event: React.MouseEvent | MouseEvent) => void;
}

const BubbleChart = ({ category, title, onMouseEnter, onMouseLeave, onMouseMove }: BubbleChartProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const simulationRef = useRef<d3.Simulation<PredictionNode, undefined> | null>(null);

    useEffect(() => {
        if (!svgRef.current || category.length === 0) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = window.innerWidth;
        const height = window.innerHeight;

        svg.attr("width", width).attr("height", height);

        const nodes = category.map(d => ({ ...d }));

        simulationRef.current?.stop();
        simulationRef.current = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(10))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide<PredictionNode>().radius(d => d.overall_average * 2))
            .on("tick", ticked);

        const bubbles = svg.selectAll(".bubble")
            .data(nodes)
            .enter()
            .append("image")
            .attr("class", "bubble")
            .attr("href", d => d.src_img.replace("../public", ""))
            .attr("width", d => Math.max(d.overall_average * (window.innerWidth < 768 ? 5 : 6), 100)) // Ajuste para celular
            .attr("height", d => Math.max(d.overall_average * (window.innerWidth < 768 ? 5 : 6), 100)) // Ajuste para celular
            .style("opacity", 0)
            .on("mouseover", (event, d) => {
                gsap.to(event.currentTarget, { scale: 1, opacity: 0.8, duration: 0.3 });
                onMouseEnter(d);
            })
            .on("mouseleave", (event) => {
                gsap.to(event.currentTarget, { scale: 1, opacity: 1, duration: 0.3 });
                onMouseLeave();
            })
            .on("mousemove", (event) => onMouseMove(event));

        gsap.to(bubbles.nodes(), { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05 });

        function ticked() {
            bubbles.attr("x", d => (d.x ?? 0) - Math.max(d.overall_average * 3, 20))
                .attr("y", d => (d.y ?? 0) - Math.max(d.overall_average * 3, 20));
        }
    }, [category]);

    return (
        <motion.div className="relative h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-sm font-bold font-mono p-4 text-white">{title}</h3>
            <svg ref={svgRef} className="font-mono absolute top-0 left-0"></svg>
        </motion.div>
    );
};

const GrammyBubbles = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("album");
    const [tooltipData, setTooltipData] = useState<PredictionNode | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const handleMouseEnter = (data: PredictionNode) => {
        if (tooltipData?.name !== data.name) {
            setTooltipData(data);
        }
    };
    const handleMouseLeave = () => setTooltipData(null);
    const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
        if (event instanceof MouseEvent) {
            setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
        }
    };

    return (
        <motion.div className="flex flex-col h-full bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BubbleChart
                category={data[selectedCategory]}
                title={categories.find(cat => cat.key === selectedCategory)?.title || ""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            />
            <AnimatePresence>
                {tooltipData && (
                    <motion.div
                        className="absolute z-20"
                        style={{
                            left: tooltipPosition.x,
                            top: tooltipPosition.y,
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="font-bold font-mono text-lg">{tooltipData.name}</div>
                        <div className="font-bold font-mono text-[12px]">Média Geral: {tooltipData.overall_average} %</div> 
                        <div className="font-mono text-[12px]">Predição: {tooltipData.prediction} %</div>
                        <div className="font-mono text-[12px]">Mercado: {tooltipData.market} %</div>
                        <div className="font-mono text-[12px]">Críticos: {tooltipData.critics} %</div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex space-x-4 p-4 fixed bottom-0 left-0 right-0 z-10 items-center justify-center flex-wrap">
                {categories.map(cat => (
                    <Button
                        variant={"reverse"}
                        key={cat.key}
                        className="text-[12px] font-mono px-4 py-2 m-1 rounded text-white"
                        onClick={() => setSelectedCategory(cat.key)}
                    >
                        {cat.title}
                    </Button>
                ))}
            </div>
        </motion.div>
    );
};

export default GrammyBubbles;
