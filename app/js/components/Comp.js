import preact, {Component} from 'preact';

export default class Comp extends Component {
    render() {
        return (
            <div>I am the {this.props.type} 'Comp' component</div>
        );
    }
}