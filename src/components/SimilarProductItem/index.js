// Write your code here
import {withRouter} from 'react-router-dom'

import './index.css'
import ProductCard from '../ProductCard'

const GetSimilarProducts = props => {
  const {content} = props
  const updatedContent = content.map(eachItem => ({
    id: eachItem.id,
    title: eachItem.title,
    brand: eachItem.brand,
    imageUrl: eachItem.image_url,
    rating: eachItem.rating,
    price: eachItem.price,
  }))
  return (
    <div className="similarProductsContainer">
      <h1 className="similarProductsHeading">Similar Products</h1>
      <ul className="similarProductsList">
        {updatedContent.map(eachItem => (
          <ProductCard productData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    </div>
  )
}

export default withRouter(GetSimilarProducts)
