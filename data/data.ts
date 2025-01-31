export interface PredictionNode extends d3.SimulationNodeDatum {
    name: string;
    prediction: number;
    market: number;
    critics: number;
    overall_average: number;
    src_img: string;
    spotify: string;
    comment_billboard: string;
    comment_apnews: string;
    comment_theguardian: string;
    comment_vulture: string;
    comment_pitchfork: string;
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
            overall_average: 21.7,
            src_img: "../public/Charli_XCX_-_Brat_(album_cover).png",
            spotify: "https://open.spotify.com/intl-pt/album/2lIZef4lzdvZkiiCzvPKj7?si=wlfWFRatRCCxPMGIQHncPw",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "A aposta para a vitória é em Charli, mas Beyoncé ainda é uma forte concorrente.",
            comment_pitchfork: ""
        },
        {
            name: "Cowboy Carter (Beyoncé)",
            prediction: 29.41,
            market: 26,
            critics: 70,
            overall_average: 41.8,
            src_img: "../public/Cowboy Carter (Beyoncé).jpeg",
            spotify: "https://open.spotify.com/intl-pt/album/6BzxX6zkDsYKFJ04ziU5xQ?si=o7koC9UrTIuudai0G8JCmA",
            comment_billboard: "",
            comment_apnews: "Cowboy Carter de Beyoncé se destaca, apesar dos desafios nas estruturas tradicionais da música country.						",
            comment_theguardian: "Beyoncé finalmente conquistará o Álbum do Ano com Cowboy Carter, após anos de derrotas consideradas injustas, e também levará Gravação do Ano com Texas Hold 'Em. ",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "Hit Me Hard and Soft (Billie Eilish)",
            prediction: 25,
            market: 46,
            critics: 0,
            overall_average: 23.7,
            src_img: "../public/Billie.jpeg",
            spotify: "https://open.spotify.com/intl-pt/album/7aJuG4TFXa2hmE4z1yxc3n?si=Q7VI7XytSL2jjrDy491wmw",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "The Tortured Poets Department (Taylor Swift)",
            prediction: 7.69,
            market: 8,
            critics: 18,
            overall_average: 11.2,
            src_img: "../public/The Tortured Poets Department (Taylor Swift).jpeg",
            spotify: "https://open.spotify.com/intl-pt/album/1Mo4aZ8pdj6L1jx8zSwJnt?si=fcb1e49c93af4579",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: "A vitória de Taylor Swift parece ser iminente, dado seu domínio cultural durante a turnê “Eras” e sua habilidade de lançar versões do álbum constantemente, mantendo sua relevância."
        }
    ],
    song: [
        {
            name: "Birds of a Feather (Billie Eilish)",
            prediction: 64.29,
            market: 54,
            critics: 58,
            overall_average: 59.1,
            src_img: "../public/Billie.jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/6dOtVTDdiauQNBQEDOtlAB?si=6eb24f7352da43f8",
            comment_billboard: "Birds of a feather, de Billie Eilish e FINNEAS, é apontada como favorita, no entanto, Die With a Smile (With Bruno Mars) também é mencionada como possível vencedora.",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: "“Birds of a Feather” de Billie Eilish, que foi um grande sucesso comercial, provavelmente levará o prêmio. "
        },
        {
            name: "Not Like Us (Kendrick Lamar)",
            prediction: 17.24,
            market: 21,
            critics: 30,
            overall_average: 19.1,
            src_img: "../public/Kdot.jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/6AI3ezQ4o3HUoP6Dhudph3?si=aeb2e1309b89460e",
            comment_billboard: "",
            comment_apnews: "A vitória de Kendrick Lamar com “Not Like Us” parece inevitável. Como único compositor da faixa, este pode ser o momento perfeito para sua primeira conquista na categoria.",
            comment_theguardian: "Lamar, com Not Like Us, é apontado como favorito para Canção do Ano, dado seu impacto cultural e lirismo afiado.",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "Good Luck, Babe! (Chappell Roan)",
            prediction: 15.38,
            market: 6,
            critics: 12,
            overall_average: 10.7,
            src_img: "../public/Chappell Roan.jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/0WbMK4wrZ1wFSty9F7FCgu?si=31045171a1c14c34",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "A Song of the Year tende a premiar composições com uma mensagem significativa. “Good Luck, Babe!” de Chappell Roan, que explora temas de identidade queer, é uma das favoritas. ",
            comment_pitchfork: ""
        },
        {
            name: "Die with a Smile (Lady Gaga and Bruno Mars)",
            prediction: 11.76,
            market: 10,
            critics: 0,
            overall_average: 10.9,
            src_img: "../public/lady-gaga-e-bruno-2.webp",
            spotify: "https://open.spotify.com/intl-pt/track/2plbrEY59IikOBgBGLjaoe?si=440f92fca2054d78",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "Texas Hold 'Em (Beyoncé)",
            prediction: 7.14,
            market: 3,
            critics: 0,
            overall_average: 5.1,
            src_img: "../public/Cowboy Carter (Beyoncé).jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/0Z7nGFVCLfixWctgePsRk9?si=44f87fea29a84bbd",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: ""
        }
    ],
    record: [
        {
            name: "Espresso (Sabrina Carpenter)",
            prediction: 81.13,
            market: 65,
            critics: 0,
            overall_average: 73.1,
            src_img: "../public/Sabrina.jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/2qSkIjg1o9h3YT9RAgYN75?si=a07ddd6783774268",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "Birds of a Feather (Billie Eilish)",
            prediction: 20.83,
            market: 9,
            critics: 0,
            overall_average: 14.9,
            src_img: "../public/Billie.jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/6AI3ezQ4o3HUoP6Dhudph3?si=aeb2e1309b89460e",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "Not Like Us (Kendrick Lamar)",
            prediction: 16.67,
            market: 13,
            critics: 60,
            overall_average: 14.8,
            src_img: "../public/Kdot.jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/6AI3ezQ4o3HUoP6Dhudph3?si=aeb2e1309b89460e",
            comment_billboard: "A Billboard sugere que Not Like Us, de Kendrick Lamar, deve levar o prêmio, embora Now and Then, dos Beatles, também seja uma forte candidata.",
            comment_apnews: "Not Like Us de Kendrick Lamar aparece como favorita, destacando a influência significativa desta última faixa.",
            comment_theguardian: "",
            comment_vulture: "A tendência é que Not Like Us, de Lamar, se destaque por seu impacto cultural.",
            comment_pitchfork: ""
        },
        {
            name: "Now and Then (The Beatles)",
            prediction: 9.09,
            market: 8,
            critics: 18,
            overall_average: 8.5,
            src_img: "../public/Beatles.jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/4vziJcnB2Qyi9o4nIRUeN7?si=c6bebbb111794feb",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: "Kendrick Lamar dominou 2024 com Not Like Us, uma faixa que se tornou um marco cultural, com produção impecável e versos impactantes. No entanto, a escolha do prêmio de Record of the Year tende a ser mais conservadora com The Beatles - “Now and Then”."
        },
        {
            name: "Texas Hold 'Em (Beyoncé)",
            prediction: 0,
            market: 2,
            critics: 22,
            overall_average: 1,
            src_img: "../public/Cowboy Carter (Beyoncé).jpeg",
            spotify: "https://open.spotify.com/intl-pt/track/0Z7nGFVCLfixWctgePsRk9?si=44f87fea29a84bbd",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "Além de levar o Álbum do Ano com Cowboy Carter, também levará Gravação do Ano com Texas Hold 'Em. ",
            comment_vulture: "",
            comment_pitchfork: ""
        },
    ],
    new_artist: [
        {
            name: "Chappell Roan",
            prediction: 84.62,
            market: 62,
            critics: 62,
            overall_average: 69.5,
            src_img: "../public/Chappell Roan.jpeg",
            spotify: "https://open.spotify.com/intl-pt/artist/7GlBOeep6PqTfFi59PTUUN?si=dd458a4d355847b8",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: "Com performances marcantes, um lugar na turnê de Olivia Rodrigo e shows lotados em festivais, Roan conquistou o mainstream. Seu estilo excêntrico e influências que mesclam Kate Bush e Katy Perry, combinadas com letras autênticas sobre desejo queer, fazem dela a escolha ideal para levar o prêmio."
        },
        {
            name: "Sabrina Carpenter",
            prediction: 11.76,
            market: 30,
            critics: 8,
            overall_average: 16.6,
            src_img: "../public/Sabrina.jpeg",
            spotify: "https://open.spotify.com/intl-pt/artist/74KM79TiuVKeVCqs8QtB0B?si=79b4327622a94dac",
            comment_billboard: "",
            comment_apnews: "Sabrina Carpenter é apontada como favorita, apesar de já ter uma carreira estabelecida.",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "Shaboozey",
            prediction: 7.14,
            market: 4,
            critics: 0,
            overall_average: 3.7,
            src_img: "../public/Shaboozey.jpeg",
            spotify: "https://open.spotify.com/intl-pt/artist/3y2cIKLjiOlp1Np37WiUdH?si=f8515da541b64f57",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "",
            comment_pitchfork: ""
        },
        {
            name: "Doechii",
            prediction: 0,
            market: 4,
            critics: 12,
            overall_average: 5.3,
            src_img: "../public/Doechii.jpeg",
            spotify: "https://open.spotify.com/intl-pt/artist/4E2rKHVDssGJm2SCDOMMJB?si=2a92151e555f41ed",
            comment_billboard: "",
            comment_apnews: "",
            comment_theguardian: "",
            comment_vulture: "Doechii teve uma ascensão após a indicação, lembrando o caminho de Victoria Monét no ano passado. ",
            comment_pitchfork: ""
        },
    ]
};