/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';
import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { categories, data, PredictionNode } from "../data/data";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import Legend from "./Legend";

interface BubbleChartProps {
    category: PredictionNode[];
    title: string;
    description: string;
    onMouseEnter: (data: PredictionNode) => void;
    onMouseLeave: () => void;
    onMouseMove: (event: React.MouseEvent | MouseEvent) => void;
    onClick: (data: PredictionNode) => void;
}

interface BubbleChartProps {
    category: PredictionNode[];
    title: string;
    description: string;
    onMouseEnter: (data: PredictionNode) => void;
    onMouseLeave: () => void;
    onMouseMove: (event: React.MouseEvent | MouseEvent) => void;
    onClick: (data: PredictionNode) => void;
    selectedCategory: string; // Add selectedCategory as a prop
    onCategoryChange: (category: string) => void; // Add onCategoryChange as a prop
}

const BubbleChart = ({
    category,
    title,
    description,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClick,
    selectedCategory, // Receive selectedCategory as a prop
    onCategoryChange, // Receive onCategoryChange as a prop
}: BubbleChartProps) => {
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

        // Adjust bubble size and collision radius based on screen width
        const isMobile = window.innerWidth < 768;
        const bubbleSizeMultiplier = isMobile ? 7 : 8; // Smaller on mobile, larger on desktop
        const minBubbleSize = isMobile ? 100 : 150; // Minimum size for bubbles
        const collisionRadiusMultiplier = isMobile ? 2 : 3; // Adjust collision radius for mobile

        simulationRef.current?.stop();
        simulationRef.current = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(5)) // Adjust strength as needed
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide<PredictionNode>().radius(d => d.overall_average * collisionRadiusMultiplier))
            .on("tick", ticked);

        const bubbles = svg.selectAll(".bubble")
            .data(nodes)
            .enter()
            .append("image")
            .attr("class", "bubble cursor-pointer")
            .attr("r", "100")
            .attr("href", d => d.src_img.replace("../public", ""))
            .attr("width", d => Math.max(d.overall_average * bubbleSizeMultiplier, minBubbleSize)) // Responsive size
            .attr("height", d => Math.max(d.overall_average * bubbleSizeMultiplier, minBubbleSize)) // Responsive size
            .style("opacity", 0)
            .on("mouseover", (event, d) => {
                gsap.to(event.currentTarget, { scale: 1, opacity: 0.8, duration: 0.3 });
                onMouseEnter(d);
            })
            .on("mouseleave", (event) => {
                gsap.to(event.currentTarget, { scale: 1, opacity: 1, duration: 0.3 });
                onMouseLeave();
            })
            .on("mousemove", (event) => onMouseMove(event))
            .on("click", (event, d) => onClick(d));

        gsap.to(bubbles.nodes(), { opacity: 1, scale: 1, duration: 2, stagger: 0.05 });

        function ticked() {
            bubbles.attr("x", d => (d.x ?? 0) - Math.max(d.overall_average * bubbleSizeMultiplier / 2, minBubbleSize / 2))
                .attr("y", d => (d.y ?? 0) - Math.max(d.overall_average * bubbleSizeMultiplier / 2, minBubbleSize / 2));
        }
    }, [category]);

    return (
        <motion.div className="relative h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex flex-col items-start ">
                <h3 className="text-sm font-bold font-mono px-4 text-[#efb9f0]">{title}</h3>
                <div className="flex flex-wrap items-left justify-start mt-auto px-2" style={{ zIndex: 2 }}>
                    {categories.map(cat => (
                        <Button
                            variant="default"
                            key={cat.key}
                            className="text-[12px] font-mono m-1 rounded"
                            onClick={() => onCategoryChange(cat.key)} // Use onCategoryChange prop
                        >
                            {cat.title}
                        </Button>
                    ))}
                </div>
                <div className="text-[12px] max-w-3xl font-mono text-[#fff6df] pt-5 px-4">{description}
                </div>
                    <div><Legend />
                    </div>
            </div>
            <div className="font-mono absolute w-full h-screen justify-center items-center overflow-hidden">
                <svg ref={svgRef} style={{ zIndex: 1 }}></svg>
            </div>
        </motion.div>
    );
};

const FloatingHint = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000); // Hide after 5 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-[#e0d1e8] text-[#150317] px-4 py-2 rounded-lg shadow-lg text-sm font-mono"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    Clique na imagem para mais detalhes
                </motion.div>
            )}
        </AnimatePresence>
    );
};



const GrammyBubbles = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("album");
    const [tooltipData, setTooltipData] = useState<PredictionNode | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<PredictionNode | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMouseEnter = (data: PredictionNode) => {
        if (tooltipData?.name !== data.name) {
            setTooltipData(data);
        }
    };

    const handleMouseLeave = () => setTooltipData(null);

    const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
        if (event instanceof MouseEvent) {
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + window.scrollX + rect.width / 2,
                y: rect.top + window.scrollY + rect.height / 2,
            });
        }
    };

    const handleClick = (data: PredictionNode) => {
        setSelectedData(data);
        setIsDrawerOpen(true);
    };

    return (
        <motion.div className="flex flex-col h-full w-full bg-[#150317]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BubbleChart
                category={data[selectedCategory]}
                title={categories.find(cat => cat.key === selectedCategory)?.title || ""}
                description={categories.find(cat => cat.key === selectedCategory)?.description || ""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            {isDesktop && (
                <AnimatePresence>
                    {tooltipData && (
                        <motion.div
                            className="absolute z-20 tooltip"
                            style={{
                                left: tooltipPosition.x,
                                top: tooltipPosition.y,
                                backgroundColor: "#e0d1e8",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                transform: "translate(-50%, -50%)",
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
                            <div className="font-mono text-[10px] text-gray-600 mt-2 max-w-52">Clique para mais detalhes</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="text-[#efb9f0] px-4">
                    <DrawerHeader>
                        <DrawerTitle>{selectedData?.name}</DrawerTitle>
                        <DrawerDescription>{selectedData?.comment_billboard}</DrawerDescription>
                        <DrawerDescription>{selectedData?.comment_apnews}</DrawerDescription>
                        <DrawerDescription>{selectedData?.comment_theguardian}</DrawerDescription>
                        <DrawerDescription>{selectedData?.comment_vulture}</DrawerDescription>
                        <DrawerDescription>{selectedData?.comment_pitchfork}</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 ">
                        <div className="font-bold font-mono text-[12px] text-[#e2ff8e]">Média Geral: {selectedData?.overall_average} %</div>
                        <div className="font-mono text-[12px]">Predição: {selectedData?.prediction} %</div>
                        <div className="font-mono text-[12px] text-[#ffaab9]">Mercado: {selectedData?.market} %</div>
                        <div className="font-mono text-[12px] text-[#d03200]">Críticos: {selectedData?.critics} %</div>
                    </div>
                </DrawerContent>
            </Drawer>
        </motion.div>
    );
};

export default GrammyBubbles;
