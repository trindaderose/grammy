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
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Cowboy Carter (Beyoncé)",
            prediction: 29.41,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Hit Me Hard and Soft (Billie Eilish)",
            prediction: 25,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "The Tortured Poets Department (Taylor Swift)",
            prediction: 7.69,
            market: 0,
            critics: 0,
            overall_average: 0
        }
    ],
    song: [
        {
            name: "Birds of a Feather (Billie Eilish)",
            prediction: 64.29,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Not Like Us (Kendrick Lamar)",
            prediction: 17.24,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Good Luck, Babe! (Chappell Roan)",
            prediction: 15.38,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Die with a Smile (Lady Gaga and Bruno Mars)",
            prediction: 11.76,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Texas Hold 'Em (Beyoncé)",
            prediction: 7.14,
            market: 0,
            critics: 0,
            overall_average: 0
        }
    ],
    record: [
        {
            name: "Espresso (Sabrina Carpenter)",
            prediction: 81.13,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Birds of a Feather (Billie Eilish)",
            prediction: 20.83,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Not Like Us (Kendrick Lamar)",
            prediction: 16.67,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Now and Then (The Beatles)",
            prediction: 9.09,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Texas Hold 'Em (Beyoncé)",
            prediction: 0,
            market: 0,
            critics: 0,
            overall_average: 0
        },
    ],
    new_artist: [
        {
            name: "Chappell Roan",
            prediction: 84.62,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Sabrina Carpenter",
            prediction: 11.76,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Shaboozey",
            prediction: 7.14,
            market: 0,
            critics: 0,
            overall_average: 0
        },
        {
            name: "Doechii",
            prediction: 0,
            market: 0,
            critics: 0,
            overall_average: 0
        },
    ]
};