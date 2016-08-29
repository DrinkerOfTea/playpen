/**
 * Overwatch Character chooser, created to learn how Morearty works with React
 */

import React from 'react';
import ReactMixin from 'react-mixin';
import Morearty from 'morearty';
import InitialData from './Data.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import {deepPurple50, red50, yellow50, blue50, green50, grey500} from 'material-ui/styles/colors';
import Immutable from 'immutable';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Support tap events:
injectTapEventPlugin();

/**
 * Generate a recommendation for each class of character based on a set of chosen characters
 * @param chosenCharacters
 */
const generateRecommendations = (characters, chosenCharacters) => {

    let recommendations = Immutable.Map();

    let categories = characters.keySeq().toArray();

    categories.forEach((category) => {

        let categoryScores = [];

        characters.get(category).forEach((char) => {

            let charScores = Immutable.Map({
                "name": char.get("name"),
                "strongVs": Immutable.List(char.get("strongVs").toArray().filter((c) => { return chosenCharacters.includes(c); } )),
                "weakVs": Immutable.List(char.get("weakVs").toArray().filter((c) => { return chosenCharacters.includes(c); } ))
            });

            categoryScores.push(charScores);
        });

        let topScorer = categoryScores[0];

        categoryScores.forEach( (char) => {
            if( char.get("strongVs").size - char.get("weakVs").size > topScorer.get("strongVs").size - topScorer.get("weakVs").size)
            {
                topScorer = char;
            }
        })

        recommendations = recommendations.set(category, topScorer);
    });

    return recommendations;
}

/**
 * Get an array of the names of chosen characters
 * @param characters
 * @returns {*}
 */
const getChosenCharacters = (characters) => {

    let chosenCharacters = [];
    let categories = characters.keySeq().toArray();
    categories.forEach( (category) => {
        let chars = characters.get(category);
        chars = chars.toArray();
        chars.forEach( (char) => {
            if(char.get("chosen")) {
                chosenCharacters.push(char.get("name"));
            }
        })
    } );

    return chosenCharacters;
}

const chooserStyles = {
    block: {
        margin: 10,
    },
    characters: {
        display: "flex",
        flexWrap: "wrap",
    },
    clearButton: {
        marginBottom: 20,
    }
}

class OverwatchChooser extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.initialize();

        this.state = {
        };
    }

    initialize() {
        let binding = this.getDefaultBinding();

        //Listen to changes to selected characters and recompute the recommendations:
        binding.addListener("characters", (cb) => {
            let chosenCharacters = getChosenCharacters(binding.get("characters"));
            let recommendations = generateRecommendations(binding.get("characters"),
                chosenCharacters);

            binding.atomically()
                .set("recommendations", recommendations)
                .set("chosenCount", chosenCharacters.length)
                .commit();

        });
    }

    /**
     * Clears the game - i.e. untoggles all characters
     */
    onClear() {
        // Clear character data back to initial value, using the initial data converted to an immutable map
        this.getDefaultBinding().set("characters", Immutable.fromJS(InitialData.characters));
    }

    render() {
        let binding = this.getDefaultBinding();

        let offenceSectionBinding = binding.sub("characters.offence");
        let defenceSectionBinding = binding.sub("characters.defence");
        let tankSectionBinding = binding.sub("characters.tank");
        let supportSectionBinding = binding.sub("characters.support");

        let chosenCount = binding.get("chosenCount");

        return (
            <MuiThemeProvider>
                <div className="overwatch-chooser" style={chooserStyles.block}>
                    <h1>Overwatch chooser</h1>
                    <RaisedButton label={"Clear " + chosenCount}
                                  primary={true}
                                  style={chooserStyles.clearButton}
                                  disabled={chosenCount === 0}
                                  onTouchTap={this.onClear.bind(this)}
                    />
                    <div style={chooserStyles.characters}>
                        <OverwatchSection name="Offence" binding={offenceSectionBinding} style={{ backgroundColor: red50}}/>
                        <OverwatchSection name="Defence" binding={defenceSectionBinding} style={{ backgroundColor: blue50}} />
                        <OverwatchSection name="Tank" binding={tankSectionBinding} style={{ backgroundColor: yellow50}}/>
                        <OverwatchSection name="Support" binding={supportSectionBinding} style={{ backgroundColor: green50}}/>
                    </div>
                    <OverwatchRecommendationSection binding={binding.sub("recommendations")} />
                </div>
            </MuiThemeProvider>
        );
    }
}

const sectionStyles = {
    block: {
        marginBottom: 30,
        marginRight: 30,
        borderStyle: "solid",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: grey500,
        padding: 10,
        paddingRight: 20,
        maxWidth: 125,
    }
}

class OverwatchSection extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {
        let binding = this.getDefaultBinding();

        let characters = binding.get('').map((character, index) => {
            return <OverwatchCharacterChooser key={character.get("name")} binding={binding.sub(index)} />;
        });

        return (
            <div className="overwatch-section" style={{...this.props.style, ...sectionStyles.block}}>
                <h2>{this.props.name}</h2>
                {characters}
            </div>
        );
    }
};

const characterChooserStyles = {
    block : {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 16,
    }
};

class OverwatchCharacterChooser extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    onToggle(toggledOn) {
        this.getDefaultBinding().set('chosen', toggledOn);
    }

    render() {
        let binding = this.getDefaultBinding();

        let chosen = false;

        if(binding.get("chosen"))
        {
            chosen = binding.get("chosen");
        }

        return (
            <div className="overwatch-character-chooser" style={characterChooserStyles.block}>
                <Toggle
                    label={binding.get("name")}
                    style={characterChooserStyles.toggle}
                    labelPosition="right"
                    toggled={chosen}
                    onToggle={ this.onToggle.bind(this, !chosen) }
                />
            </div>
        );
    }
}

const recommendationSectionStyles = {
    block: {
        marginBottom: 30,
        marginRight: 30,
        borderStyle: "solid",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: grey500,
        padding: 10,
        paddingRight: 20,
        maxWidth: 500,
        backgroundColor: deepPurple50,
    }
}

class OverwatchRecommendationSection extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {
        let binding = this.getDefaultBinding();

        let chosen = false;

        let offenceSectionBinding = binding.sub("offence");
        let defenceSectionBinding = binding.sub("defence");
        let tankSectionBinding = binding.sub("tank");
        let supportSectionBinding = binding.sub("support");

        return (
            <div className="overwatch-recommendation-section" style={recommendationSectionStyles.block}>
                <h2>Recommendations</h2>
                <OverwatchRecommendation category="Offence" binding={offenceSectionBinding} />
                <OverwatchRecommendation category="Defence" binding={defenceSectionBinding} />
                <OverwatchRecommendation category="Tank" binding={tankSectionBinding} />
                <OverwatchRecommendation category="Support" binding={supportSectionBinding} />
            </div>
        );
    }
}

const recommendationStyles = {
    block: {
        marginBottom: 16,
    },
    strong: {
        color: "darkGreen"
    },
    weak: {
        color: "darkRed"
    }
};

class OverwatchRecommendation extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {
        let binding = this.getDefaultBinding();

        let chosen = false;

        let contents = null;

        if(binding.get("name") && binding.get("strongVs") && binding.get("strongVs").size > 0)
        {
            contents = <span><strong>{binding.get("name")} - </strong> <span style={recommendationStyles.strong}> {binding.get("strongVs").join(", ")}</span> - <span style={recommendationStyles.weak}> {binding.get("weakVs").join(", ")}</span></span>;
        }

        return (
            <div className="overwatch-recommendation" style={recommendationStyles.block}>
                {contents}
            </div>
        );
    }
}

// Use ReactMixin lib to apply a Morearty Mixin to a React ES6 class
ReactMixin.onClass(OverwatchChooser, Morearty.Mixin);
ReactMixin.onClass(OverwatchSection, Morearty.Mixin);
ReactMixin.onClass(OverwatchCharacterChooser, Morearty.Mixin);
ReactMixin.onClass(OverwatchRecommendationSection, Morearty.Mixin);
ReactMixin.onClass(OverwatchRecommendation, Morearty.Mixin);

// Setup the Morearty context
const context = Morearty.createContext({initialState: InitialData});

// Morearty Boostrap app:
const Bootstrap = context.bootstrap(OverwatchChooser);

export default Bootstrap;