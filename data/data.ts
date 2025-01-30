export interface PredictionNode extends d3.SimulationNodeDatum {
    name: string;
    prediction: number;
    market: number;
    critics: number;
    overall_average: number;
}

export const categories = [
    { title: "Álbum do Ano", key: "album" },
    { title: "Canção do Ano", key: "song" },
    { title: "Gravação do Ano", key: "record" },
    { title: "Artista Revelação", key: "new_artist" }
];

export const data: { [key: string]: PredictionNode[] } = {
    album: [
        {
            name: "Brat (Charli XCX)",
            prediction: 40,
            market: 13,
            critics: 12,
            overall_average: 21.7
        },
        {
            name: "Cowboy Carter (Beyoncé)",
            prediction: 29.41,
            market: 26,
            critics: 70,
            overall_average: 41.8
        },
        {
            name: "Hit Me Hard and Soft (Billie Eilish)",
            prediction: 25,
            market: 46,
            critics: 0,
            overall_average: 23.7
        },
        {
            name: "The Tortured Poets Department (Taylor Swift)",
            prediction: 7.69,
            market: 8,
            critics: 18,
            overall_average: 11.2
        }
    ],
    song: [
        {
            name: "Birds of a Feather (Billie Eilish)",
            prediction: 64.29,
            market: 54,
            critics: 58,
            overall_average: 59.1
        },
        {
            name: "Not Like Us (Kendrick Lamar)",
            prediction: 17.24,
            market: 21,
            critics: 30,
            overall_average: 19.1
        },
        {
            name: "Good Luck, Babe! (Chappell Roan)",
            prediction: 15.38,
            market: 6,
            critics: 12,
            overall_average: 10.7
        },
        {
            name: "Die with a Smile (Lady Gaga and Bruno Mars)",
            prediction: 11.76,
            market: 10,
            critics: 0,
            overall_average: 10.9
        },
        {
            name: "Texas Hold 'Em (Beyoncé)",
            prediction: 7.14,
            market: 3,
            critics: 0,
            overall_average: 5.1
        }
    ],
    record: [
        {
            name: "Espresso (Sabrina Carpenter)",
            prediction: 81.13,
            market: 65,
            critics: 0,
            overall_average: 73.1
        },
        {
            name: "Birds of a Feather (Billie Eilish)",
            prediction: 20.83,
            market: 9,
            critics: 0,
            overall_average: 14.9
        },
        {
            name: "Not Like Us (Kendrick Lamar)",
            prediction: 16.67,
            market: 13,
            critics: 60,
            overall_average: 14.8
        },
        {
            name: "Now and Then (The Beatles)",
            prediction: 9.09,
            market: 8,
            critics: 18,
            overall_average: 8.5
        },
        {
            name: "Texas Hold 'Em (Beyoncé)",
            prediction: 0,
            market: 2,
            critics: 22,
            overall_average: 1
        },
    ],
    new_artist: [
        {
            name: "Chappell Roan",
            prediction: 84.62,
            market: 62,
            critics: 62,
            overall_average: 69.5
        },
        {
            name: "Sabrina Carpenter",
            prediction: 11.76,
            market: 30,
            critics: 8,
            overall_average: 16.6
        },
        {
            name: "Shaboozey",
            prediction: 7.14,
            market: 4,
            critics: 0,
            overall_average: 3.7
        },
        {
            name: "Doechii",
            prediction: 0,
            market: 4,
            critics: 12,
            overall_average: 5.3
        },
    ]
};