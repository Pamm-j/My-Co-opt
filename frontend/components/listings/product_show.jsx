import React from "react";
import Colors from "../../util/colors";
import {BsPlusCircle, BsDashCircle} from 'react-icons/bs'
import { GiSwordsEmblem } from 'react-icons/gi';
import { FiArrowRightCircle, FiArrowLeftCircle } from 'react-icons/fi';
import { Link } from "react-router-dom";
import Constants from "../../util/constants";
import ReviewItem from "./review_item";


class ProductShow extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.cartItem

  }
  componentDidUpdate(prevProps){
    if( prevProps.product && this.props.product.id !== prevProps.product.id ){
      this.props.fetchProduct( this.props.match.params.id )
      this.props.fetchAllReviews( this.props.match.params.id )
    } 
    if (!prevProps) {
      this.props.fetchProduct( this.props.match.params.id )
      this.props.fetchAllReviews( this.props.match.params.id )
    }
  }
  componentDidMount(){
    this.props.fetchProduct( this.props.match.params.id )
    this.props.fetchAllReviews( this.props.match.params.id )
  }
  toggleImage(){
    let num = this.state.image_view
    num = num + 1
    num = num % this.props.product.photoUrls.length
    this.setState({image_view:num})
  }

  increment = (num)=> () => {
    let newQuantity = JSON.parse(this.state.quantity) + num
    if (newQuantity < 1) newQuantity = 0
    this.setState({quantity: newQuantity})
  }

  handleClick = (type, value)=>()=> this.setState({[type]: value})

  handleSubmit = (e)=>{
    e.preventDefault();
    this.setState({product_id: this.props.product.id}, (()=> {

      if (!Object.values(this.state).includes("")) {
        this.props.createCartItem(this.state)
        .then(()=>this.props.history.push(`/category/${this.props.product.category_id}`))
      }}
    ))
  }

  render(){
    console.log(this.props)
    const product = this.props.product
    if (!product){
      return null 
      } else return (
        <div className="product-show-page">
          <div className="show-top-boxes">
            <div className="photo-arrow-container">

              <div className="show-photo"><img 
              src={product.photoUrls[this.state.image_view]} 
              />
              </div>
              <div className="arrow-container">
                <FiArrowLeftCircle className="arrow" onClick={()=>this.toggleImage()}/>
                <FiArrowRightCircle className="arrow" onClick={()=>this.toggleImage()}/>
              </div>
            </div>
            <div className="purchase-details">
              <h3 className="lnk">{product.brand}</h3>
              <h1> {product.name}</h1> 
                <div className="flex-line rating-stars">
                  <div>
                    <span>★★★★★ |</span>
                    <span> (4,592)</span>
                  </div>
                  <span> Item #{product.id*Constants.item_key}</span>
                </div>
              <div id="price">${parseFloat(product.price).toFixed(2)}</div>
              <input type="text" className="invisible-input" value={`Color: ${this.state.color}`} readOnly placeholder="Select a Color"/>
              <ul className="show-list" >
                {product.colors.map((color)=>(
                <button
                  className={(this.state.color === color) ? "round-box  color-btn sizes active" : "round-box  color-btn sizes"}
                  key={"color" + color}
                  onClick={this.handleClick("color", color)}
                  style={{backgroundColor: `${Colors[color]}`}}></button> 
                ))}
              </ul>
              <input type="text" className="invisible-input" readOnly value={`Size: ${this.state.size}`} placeholder="Select a Size"/>

              <ul className="show-list" >
                  {product.sizes.map((size)=>(<button 
                  className={(this.state.size === size) ? "round-box  color-btn sizes active" : "round-box  color-btn sizes"}
                  // className="round-box  color-btn sizes"
                  onClick={this.handleClick("size", size)}
                  key={"size" + size}>{size}</button> ))}
              </ul>
              <div className="invisible-input">Quantity</div>
              <div className="amount-ticker">
                <button className="increment-button" onClick={this.increment(-1)}  ><BsDashCircle/></button>             
                <input 
                  readOnly
                  className="quantity-input not-too-wide" 
                  type="number" 
                  inputMode="numeric" 
                  max="9999" min="1" 
                  value={this.state.quantity} />
                <button className="increment-button" onClick={this.increment(1)} ><BsPlusCircle/></button>
              </div>
              <div className="shipping-details">
                <div className="in-line radios">
                  <input
                    type="radio"
                    id={product.id+"pickup"}
                    name="shipping" 
                    style={{ accentColor: "#4e4d49" }}
                    value="pickup"
                    onClick={this.handleClick('delivery_type', "pickup")}
                    />
                  <label id={product.id+"pickup"}>Pick up at store--FREE</label>
                </div>
                <div className="in-line radios">              
                  <input
                    type="radio"
                    id={product.id+"delivery"}
                    name="shipping"
                    style={{ accentColor: "#4e4d49" }}
                    value="delivery"
                    onClick={this.handleClick('delivery_type', "delivery")}
                    />
                  <label id={product.id+"delivery"}>Ship to Address</label>
                </div>
              </div>
                <div className="login-msg"> <GiSwordsEmblem/> To purchase this item, <Link 
                  className="lnk" 
                  to={{ pathname: "/login", state: {oldPath:`/product/${product.id}`}}}
                >sign in</Link> or <Link 
                  className="lnk" 
                  to={{ pathname: "/signup", state: {oldPath:`/product/${product.id}`}}}
                  >get Co-opted</Link>.
                </div>
                <button className='grn btn bottom-of-page' onClick={this.handleSubmit}>Add to Cart ${parseFloat(product.price*this.state.quantity).toFixed(2)}</button>
            </div>
          </div>
          <div className="show-details">{product.description}</div>
          <div className="reviews-container">
            <div className="title-button-container">
              <div className="fancy-small-title">Reviews</div>
              <button className="grn btn">Write a review</button>
            </div>
            <div className="summary-box"></div>
            {this.props.reviews.map((review)=> <ReviewItem 
                      review={review} 
                      createReview={this.props.createReview}
                      updateReview={this.props.updateReview}
                      />)}
          </div>


        </div>
      )
  }
}

export default ProductShow;
 