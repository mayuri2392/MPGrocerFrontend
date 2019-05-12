import React from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../repository';
import CartItem from './CartItem';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0
		}
	}

	componentWillMount() {
		let cart = localStorage.getItem('cart');
		console.log('cart:',cart);
		if (!cart) return;
		getCartProducts(cart).then((products) => {
				console.log('products',products);
			let total = 0;
			for (var i = 0; i < products.length; i++) {
					//var product = products[i];
					console.log('product[i]:',products[i]);
					console.log('price:',products[i].price);
					console.log('qty:',products[i].qty);
				total += products[i].price * products[i].qty;
				console.log('total:',total);
			}
	    	this.setState({ products, total });
		});
	
	}

	removeFromCart = (product) => {
		let products = this.state.products.filter((item) => item._id !== product._id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		console.log('pid:',product._id);
		let id = '' + product._id;
		console.log('id:',id);
		delete cart[id];
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = this.state.total - (product.qty * product.price) 
		this.setState({products, total});
	}

	clearCart = () => {
		localStorage.removeItem('cart');
		this.setState({products: []});
	}

	render() {
		const { products, total } =  this.state;
		return (
			<div className=" container">
				<h3 className="card-title">Cart</h3>
				<hr/>
				{
					products.map((product, index) => <CartItem product={product} remove={this.removeFromCart} key={index}/>)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr/></div>: ''}

				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
				<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
				<br/><br/><br/>
			</div>
		);
	}
}
