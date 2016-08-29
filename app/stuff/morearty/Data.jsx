/**
 * Initial data for the Overwatch Morearty app
 * Created by DrinkerOfTea on 28/08/2016.
 */

const initialModel = {

    chosenCount: 0,
    characters: {
        offence: [
            {
                name: "Genji",
                strongVs: ["Bastion", "Mercy", "Hanzo", "Widowmaker", "Zenyatta", "Soldier 76", "Lucio", "Ana"],
                weakVs: ["Mei", "Winston", "Zarya", "Roadhog"]
            },
            {
                name: "McCree",
                strongVs: ["Mercy", "Reaper", "Tracer", "Lucio", "Zenyatta", "Symmetra", "Winston"],
                weakVs: ["Widowmaker"]
            },
            {
                name: "Pharah",
                strongVs: ["Junkrat", "Reaper", "Mei", "Symmetra", "Mercy", "Zarya", "Reinhardt", "Lucio"],
                weakVs: ["Soldier 76", "Widowmaker"]
            },
            {
                name: "Reaper",
                strongVs: ["Winston", "Mercy", "Zenyatta", "Roadhog", "Reinhardt", "Symmetra","Lucio", "Torbjorn"],
                weakVs: ["Pharah", "McCree"]
            },
            {
                name: "Soldier 76",
                strongVs: ["Pharah", "Mercy", "Lucio", "Zenyatta", "Symmetra", "Junkrat", "Torbjorn", "Ana"],
                weakVs: ["Genji", "Reinhardt", "Roadhog"]
            },
            {
                name: "Tracer",
                strongVs: ["Mercy", "Zenyatta", "Hanzo"," Widowmaker", "Lucio", "Reinhardt", "Bastion", "Ana"],
                weakVs: ["McCree", "Roadhog", "Pharah"]
            },
        ],
        defence: [
            {
                name: "Bastion",
                strongVs: ["Winston", "Mercy", "Reinhardt", "Lucio", "Symmetra"],
                weakVs: ["Genji", "Widowmaker", "Hanzo", "Junkrat", "Tracer", "Pharah", "Ana"]
            },
            {
                name: "Hanzo",
                strongVs: ["Bastion", "Mercy", "Zenyatta", "Torbjorn", "Symmetra", "Ana"],
                weakVs: ["Genji", "Tracer", "Winston", "D-Va"]
            },
            {
                name: "Junkrat",
                strongVs: ["Bastion", "Torbjorn", "Mercy", "Symmetra", "Reinhardt", "Lucio", ],
                weakVs: ["Pharah", "Widowmaker", "Soldier 76"]
            },
            {
                name: "Mei",
                strongVs: ["Genji", "Lucio", "D-Va", "Mercy", "Reinhardt", "Symmetra", "Winston", "Zenyatta"],
                weakVs: ["Pharah", "Widowmaker"]
            },
            {
                name: "Torbjorn",
                strongVs: ["Mercy", "Symmetra", "Lucio", "Zenyatta"],
                weakVs: ["Widowmaker", "Junkrat", "Pharah", "Hanzo", "D-Va", "Zarya", "Reaper", "Reinhardt"]
            },
            {
                name: "Widowmaker",
                strongVs: ["Bastion", "Zenyatta", "Mercy", "Torbjorn", "Pharah", "Symmetra", "Junkrat"],
                weakVs: ["Genji", "D-Va", "Winston", "Tracer"]
            },
        ],
        tank: [
            {
                name: "D-Va",
                strongVs: ["Widowmaker", "Mercy", "Torbjorn", "Hanzo", "Winston", "Ana"],
                weakVs: ["Mei", "Reaper", "Junkrat", "Zarya"]
            },
            {
                name: "Reinhardt",
                strongVs: ["Mercy", "Solider 76", "Torbjorn", "Lucio"],
                weakVs: ["Bastion", "Pharah", "Mei", "Reaper", "Junkrat", "Tracer"]
            },
            {
                name: "Roadhog",
                strongVs: ["Mercy", "Symmetra", "Winston", "Lucio", "Tracer", "Zenyatta"],
                weakVs: ["Reaper"]
            },
            {
                name: "Winston",
                strongVs: ["Genji", "Mercy", "Widowmaker", "Symmetra", "Hanzo", "Lucio","Zenyatta"],
                weakVs: ["Reaper", "Bastion", "Roadhog", "Mei", "McCree", "D-Va", "Zarya"]
            },
            {
                name: "Zarya",
                strongVs: ["Mercy", "Genji", "Lucio", "Torbjorn", "Symmetra", "Winston","D-Va", "Ana"],
                weakVs: ["Pharah", "Reaper"]
            },
        ],
        support: [
            {
                name: "Ana",
                strongVs: ["Bastion", "Torbjorn", "Mercy"],
                weakVs: ["Genji", "Tracer", "D-Va", "Reaper", "Widowmaker", "Winston", "Soldier 76"]
            },
            {
                name: "Lucio",
                strongVs: ["Mercy"],
                weakVs: ["Mei", "McCree", "Pharah", "Roadhog", "Soldier 76", "Reaper", "Bastion", "Tracer"]
            },
            {
                name: "Mercy",
                strongVs: [],
                weakVs: ["Tracer", "Roadhog", "Reaper", "Genji", "McCree", "Soldier 76", "Bastion", "Widowmaker"]
            },
            {
                name: "Symmetra",
                strongVs: ["Mercy", "Genji"],
                weakVs: ["Pharah", "Roadhog", "McCree", "Winston", "Junkrat", "Widowmaker", "Reaper", "Soldier 76"]
            },
            {
                name: "Zenyatta",
                strongVs: ["Mercy"],
                weakVs: ["Widowmaker", "Tracer", "Reaper", "Genji", "McCree", "Hanzo", "Soldier 76", "Mei"]
            },
        ]
    },
    recommendations: {
        offence : {},
        defence: {},
        tank: {},
        support: {}
    }
};

export default initialModel;