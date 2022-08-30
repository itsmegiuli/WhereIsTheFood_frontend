'use strict';
const e = React.createElement;

class MyComponent extends React.Component {
    render(){
        return (
            <div>holis</div>
        );

    }
}
const domContainer = document.getElementById('#menu');
ReactDOM.render(e(MyComponent), domContainer);

