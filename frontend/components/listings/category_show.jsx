import React from "react";
import { Link } from "react-router-dom";
import CatSplash from "./category_splash"
import ProductIndexItem from "./product_index_item";

class CategoryShow extends React.Component{
  componentDidUpdate(prevProps){
    if( prevProps.category && this.props.category.id !== prevProps.category.id ){
      this.props.fetchCategoryProducts( this.props.match.params.id )
    } 
    if (!prevProps){
      this.props.fetchCategoryProducts( this.props.match.params.id )
    }
  }
  componentDidMount(){
    this.props.fetchCategoryProducts( this.props.match.params.id )
    // this.props.fetchCategories()
  }
  render(){
    if (!this.props.category){
      return null 
    } else {
      return (
        <div >
          <CatSplash category={this.props.category}/>
          <div className="cat-show-wrapper">
            {this.props.products.map((product)=> <ProductIndexItem key={product.id+"product"} product={product}/>)}
          </div>          
        </div>
      )
    }
  }
}

export default CategoryShow;
 