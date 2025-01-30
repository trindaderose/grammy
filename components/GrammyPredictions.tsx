'use client'
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import gsap from "gsap";

interface Prediction {
    name: string;
    prediction: number;
}

const categories = [
    { title: "Álbum do Ano", key: "album" },
    { title: "Canção do Ano", key: "song" },
    { title: "Gravação do Ano", key: "record" },
    { title: "Artista Revelação", key: "new_artist" }
] as const;

const data: Record<(typeof categories)[number]["key"], Prediction[]> = {
    album: [
        { name: "Brat (Charli XCX)", prediction: 40 },
        { name: "Cowboy Carter (Beyoncé)", prediction: 29.41 },
        { name: "Hit Me Hard and Soft (Billie Eilish)", prediction: 25 },
        { name: "The Tortured Poets Department (Taylor Swift)", prediction: 7.69 }
    ],
    song: [
        { name: "Birds of a Feather (Billie Eilish)", prediction: 64.29 },
        { name: "Not Like Us (Kendrick Lamar)", prediction: 17.24 },
        { name: "Good Luck, Babe! (Chappell Roan)", prediction: 15.38 }
    ],
    record: [
        { name: "Espresso (Sabrina Carpenter)", prediction: 81.13 },
        { name: "Birds of a Feather (Billie Eilish)", prediction: 20.83 }
    ],
    new_artist: [
        { name: "Chappell Roan", prediction: 84.62 },
        { name: "Sabrina Carpenter", prediction: 11.76 }
    ]
};

const CategoryChart: React.FC<{ category: Prediction[]; title: string }> = ({ category, title }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current || category.length === 0) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 600;
        const height = category.length * 50;

        svg.attr("width", width).attr("height", height);

        const xScale = d3.scaleLinear().domain([0, 100]).range([0, width - 150]);
        const yScale = d3.scaleBand().domain(category.map(d => d.name)).range([0, height]).padding(0.2);

        const bars = svg.selectAll(".bar").data(category).enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => yScale(d.name) ?? 0)
            .attr("height", 30)
            .attr("fill", "#6366F1")
            .attr("width", 0);

        gsap.to(bars.nodes(), {
            duration: 1,
            width: (i) => xScale(category[i]?.prediction ?? 0),
            ease: "power2.out"
        });

        svg.selectAll(".label").data(category).enter().append("text")
            .attr("class", "label")
            .attr("x", 5)
            .attr("y", d => (yScale(d.name) ?? 0) + 15)
            .attr("fill", "white")
            .attr("dy", "0.35em")
            .text(d => `${d.name} (${d.prediction}%)`);
    }, [category]);

    return (
        <div className="mb-8 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
};

const GrammyPredictions: React.FC = () => {
    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Previsões do Grammy</h2>
            {categories.map(cat => (
                <CategoryChart key={cat.key} category={data[cat.key]} title={cat.title} />
            ))}
        </div>
    );
};

export default GrammyPredictions;
