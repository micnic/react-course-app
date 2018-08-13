import React, { Component } from 'react';



class ListItem extends Component {

	render() {

		return (
			<React.Fragment>
				<li>{this.props.text} <button onClick={this.remove}>x</button></li>
			</React.Fragment>
		);
	}

	remove = () => {
		this.props.onRemove(this.props.index);
	}
}

export default class List extends Component {

	counter = 0;

	constructor(props) {

		super(props);

		this.counter = props.list.length;

		this.state = {
			newItem: '',
			list: props.list
		};
	}

	render() {

		return (
			<React.Fragment>
				<ul>
					{this.state.list.map((item, index) => {

						return (
							<ListItem text={item.text} key={item.id} index={index} onRemove={this.removeItem}/>
						);
					})}
				</ul>
				<input value={this.state.newItem} onChange={this.editItem} onKeyDown={this.addItem}/>
			</React.Fragment>
		);
	}

	addItem = (event) => {
		if (event.key === 'Enter') {

			const list = this.state.list.slice(0);

			list.push({
				id: this.counter,
				text: this.state.newItem
			});

			this.counter++;

			this.setState({
				newItem: '',
				list
			});
		}
	}

	editItem = (event) => {

		this.setState({
			newItem: event.target.value
		});
	}

	removeItem = (index) => {

		const list = this.state.list.slice(0);

		list.splice(index, 1);

		this.setState({
			list
		});
	}
}