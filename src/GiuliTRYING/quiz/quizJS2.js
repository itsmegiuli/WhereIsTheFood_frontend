const React = require('react');
const ReactDOM = require('react-dom');

class PersonalityQuiz extends React.Component {
    constructor() {
        super();
        this.mc = [];
        this.mc.push([
            { value: 0, text: 'raphael' },
            { value: 1, text: 'donatello' },
            { value: 0, text: 'leonardo' },
            { value: 0, text: 'michaelangelo' }
        ]);
        this.mc.push([
            { value: 0, text: 'fluttershy' },
            { value: 1, text: 'pinkie pie' },
            { value: 0, text: 'rainbow dash' },
            { value: 0, text: 'rarity' }
        ]);
        this.mc.push([
            { value: 0, text: 'plain cheese' },
            { value: 1, text: 'pepperoni and jalepeno' },
            { value: 0, text: 'lettuce and bell peppers' },
            { value: 0, text: 'canadian bacon and pineapple' }
        ]);
        this.mc.push([
            { value: 0, text: 'butterfinger' },
            { value: 1, text: 'snickers' },
            { value: 0, text: 'milky way' },
            { value: 0, text: 'twix' }
        ]);
        this.state = {
            score: 0
        }
    }
    handleShowScore = e => {
        let a = document.querySelectorAll('select');
        let newScore = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i].value === '1') newScore++;
        }
        this.setState({
            score: newScore
        })
    }
    render() {
        return (
            <div>
                <h1>Personality Quiz</h1>
                <p>Select your favorite of each of the following choices:</p>
                {this.mc.map(mc => <select>
                    {mc.map(el =>
                        <option value={el.value}>{el.text}</option>)}
                </select>)}
                <button onClick={this.handleShowScore}>Show Score</button>
                <p id="score">You have answered {this.state.score} correctly.</p>
            </div>
        )
    }
}
ReactDOM.render(<PersonalityQuiz />, document.querySelector('#root'));
