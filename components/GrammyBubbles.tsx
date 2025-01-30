/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import gsap from "gsap";
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

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = window.innerWidth;
        const height = window.innerHeight;

        svg.attr("width", width).attr("height", height);

        const simulation = d3.forceSimulation<PredictionNode>(category)
            .force("charge", d3.forceManyBody().strength(5))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide<PredictionNode>().radius(d => d.overall_average * 3.5))
            .on("tick", ticked);

        const colorScale = d3.scaleSequential(d3.interpolatePlasma).domain([0, category.length]);

        const nodes = svg.selectAll(".bubble")
            .data(category)
            .enter()
            .append("circle")
            .attr("class", "bubble")
            .attr("r", (d: PredictionNode) => Math.max(d.overall_average * 5, 20))
            .attr("fill", (d: PredictionNode, i: number) => colorScale(i))
            .attr("cx", (d: PredictionNode) => d.x ?? 0)
            .attr("cy", (d: PredictionNode) => d.y ?? 0)
            .style("opacity", 1)
            .style("transition", "all 0.2s ease") 
            .on("mouseover", (event, d) => {
                gsap.to(event.target, { scale: 1, duration: 0.2 });
                onMouseEnter(d);
            })
            .on("mouseleave", (event) => {
                gsap.to(event.target, { scale: 1, duration: 0.2 });
                onMouseLeave();
            })
            .on("mousemove", (event) => onMouseMove(event));

        svg.on("mouseleave", () => onMouseLeave());

        gsap.to(nodes.nodes(), { duration: 1, opacity: 1, ease: "power2.out" });

        const labels = svg.selectAll(".label")
            .data(category)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-size", "10px") // Slightly larger font size for better readability
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
            <h3 className="text-sm font-bold font-mono p-4">{title}</h3>
            <svg ref={svgRef} className="font-mono absolute top-0 left-0"></svg>
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

    const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
        if (event instanceof MouseEvent) {
            setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
        }
    };

    const handleCategoryClick = (categoryKey: string) => {
        setSelectedCategory(categoryKey);
    };

    return (
        <div className="flex flex-col text-black h-full">
            <BubbleChart
                category={data[selectedCategory]}
                title={categories.find((cat) => cat.key === selectedCategory)?.title || ""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            />
            {tooltipData && (
                <div
                    className="absolute"
                    style={{
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "opacity 0.2s ease",
                    }}
                >
                    <div className="font-bold font-mono text-lg">{tooltipData.name}</div>
                    <div className="font-bold text-sm">Média Geral: {tooltipData.overall_average}%</div>
                    <div className="font-bold text-sm">Predição: {tooltipData.prediction}%</div>
                    <div className="font-bold text-sm">Mercado: {tooltipData.market}%</div>
                    <div className="font-bold text-sm">Críticos: {tooltipData.critics}%</div>
                </div>
            )}
            <div className="flex space-x-4 p-4 fixed bottom-0 left-0 right-0 bg-white z-10">
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
        </div>
    );
};

export default GrammyBubbles;
