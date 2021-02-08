import {React} from 'react';


class ViewIngredient extends React.Component {
    

    render() {
        const {name} = this.props.match.params;
        return (
            <div className="container">
                <p>hej</p>
            </div>
        );
    }
}