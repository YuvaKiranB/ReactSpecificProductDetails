// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import GetSimilarProducts from '../SimilarProductItem'
import './index.css'
import Header from '../Header'

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    isLoading: false,
    similarProducts: [],
    quantity: 1,
    pageStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getItemData()
  }

  getItemData = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    this.setState({isLoading: false})

    if (response.ok) {
      const updatedSimilarProducts = {
        similarProducts: data.similar_products,
      }
      const {similarProducts} = updatedSimilarProducts

      this.setState({
        productDetails: {...data},
        similarProducts: [...similarProducts],
        pageStatus: 'SUCCESS',
      })
    } else {
      this.setState({pageStatus: 'FAILED'})
    }
  }

  decreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(previousState => ({
        quantity: previousState.quantity - 1,
      }))
    }
  }

  increaseQuantity = () => {
    this.setState(previousState => ({
      quantity: previousState.quantity + 1,
    }))
  }

  continueShopping = () => {
    const {history} = this.props
    history.push('/products')
  }

  render() {
    const {
      productDetails,
      isLoading,
      similarProducts,
      quantity,
      pageStatus,
    } = this.state
    const updatedProductDetails = {
      id: productDetails.id,
      imageUrl: productDetails.image_url,
      title: productDetails.title,
      brand: productDetails.brand,
      totalReviews: productDetails.total_reviews,
      rating: productDetails.rating,
      availability: productDetails.availability,
      similarProducts: productDetails.similar_products,
      price: productDetails.price,
      description: productDetails.description,
    }
    console.log(isLoading)

    const {
      imageUrl,
      title,
      brand,
      totalReviews,
      rating,
      availability,
      price,
      description,
    } = updatedProductDetails

    return (
      <div className="specificDetailsContainer">
        {(pageStatus === 'SUCCESS' || isLoading === true) && (
          <div className="successView">
            {isLoading ? (
              <div data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#0b69ff"
                  height={80}
                  width={80}
                />
              </div>
            ) : (
              <div className="productDetailsMain">
                <div className="headerContainer">
                  <Header />
                </div>
                <div className="productDetailsContainer">
                  <div className="productDetailsPart1">
                    <div className="part1">
                      <img
                        className="productDetailImage"
                        src={imageUrl}
                        alt="product"
                      />
                    </div>
                    <div className="part2">
                      <h1 className="titleHeading">{title}</h1>
                      <p className="pricePara">{`Rs ${price}/-`}</p>
                      <div className="ratingAndReviewContainer">
                        <div className="ratingContainer">
                          <p className="ratingPara">{rating}</p>
                          <img
                            className="ratingImage"
                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                            alt="start"
                          />
                        </div>
                        <p className="reviewsPara">{`${totalReviews} Reviews`}</p>
                      </div>
                      <p className="descriptionPara">{description}</p>
                      <p className="availabilityAndBrandPara">
                        <span className="span1">Available: </span>
                        {availability}
                      </p>
                      <p className="availabilityAndBrandPara">
                        <span1 className="span1">Brand: </span1>
                        {brand}
                      </p>

                      <hr className="hr" />
                      <div className="quantityContainer">
                        {/* eslint-disable-next-line */}
                        <button
                          className="quantityButton"
                          type="button"
                          data-testid="minus"
                          onClick={this.decreaseQuantity}
                        >
                          <BsDashSquare className="symbol" />
                        </button>
                        <p className="quantityPara">{quantity}</p>
                        {/* eslint-disable-next-line */}
                        <button
                          className="quantityButton"
                          type="button"
                          data-testid="plus"
                          onClick={this.increaseQuantity}
                        >
                          <BsPlusSquare className="symbol" />
                        </button>
                      </div>
                      <button className="addToCartButton" type="button">
                        ADD TO CART
                      </button>
                    </div>
                  </div>

                  <div className="similarProductsContainer">
                    <GetSimilarProducts content={similarProducts} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {pageStatus === 'FAILED' && (
          <div className="failureView">
            <Header />
            <div className="failureContainer">
              <img
                className="failureImage"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                alt="failure view"
              />
              <h1 className="failureHeading">Product Not Found</h1>
              <button
                className="continueButton"
                type="button"
                onClick={this.continueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(ProductItemDetails)
