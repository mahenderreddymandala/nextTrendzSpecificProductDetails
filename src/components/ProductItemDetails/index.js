// Write your code here
import {Link} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SimilarProductItem from '../SimilarProductItem'

import Header from '../Header'

import './index.css'

const apiUrlStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  Loading: 'LOADING',
  intial: 'INITIAL',
}

class ProductItemDetails extends Component {
  state = {
    bigSizeProduct: [],
    smallSizeProduct: [],
    num: 1,
    apiStatus: '',
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    this.setState({apiStatus: apiUrlStatus.Loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/products/${id}`

    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({apiStatus: apiUrlStatus.success})

      const data = await response.json()
      console.log(data)

      const formattedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }
      const similarData = data.similar_products.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        style: each.style,
        price: each.price,
        description: each.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }))

      console.log(formattedData)
      console.log(similarData)
      this.setState({
        bigSizeProduct: formattedData,
        smallSizeProduct: similarData,
      })
    } else {
      this.setState({apiStatus: apiUrlStatus.failure})
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({num: prevState.num + 1}))
  }

  onDecrease = () => {
    const {num} = this.state
    if (num > 1) {
      this.setState(prevState => ({num: prevState.num - 1}))
    }
  }

  renderSuccessView = () => {
    const {bigSizeProduct, smallSizeProduct, num} = this.state

    const {
      imageUrl,
      title,
      brand,
      price,
      description,
      totalReviews,
      rating,
      availability,
    } = bigSizeProduct

    return (
      <div className="success">
        <div className="container-p">
          <div className="image-section">
            <img src={imageUrl} alt={title} className="image-style" />
          </div>
          <div className="container-sub">
            <h1 className="title-p">{title}</h1>
            <p className="price-p">Rs {price}/-</p>
            <div className="rating-review">
              <div className="i-rate">
                <p className="rating-p">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="review">{totalReviews} Reviews</p>
            </div>

            <p className="description">{description}</p>
            <p className="available">
              Available: <span className="span">{availability}</span>
            </p>
            <p className="available">
              Brand: <span className="span">{brand}</span>
            </p>
            <hr />
            <div className="buttons-section">
              <button
                className="button-1"
                type="button"
                onClick={this.onDecrease}
              >
                -
              </button>
              <p className="number">{num}</p>
              <button
                className="button-1"
                type="button"
                onClick={this.onIncrease}
              >
                +
              </button>
            </div>
            <Link to="/products" className="text">
              <button className="b-style" type="button">
                ADD TO CART
              </button>
            </Link>
          </div>
        </div>
        <ul className="similar-products">
          {smallSizeProduct.map(each => (
            <SimilarProductItem productdetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="failure-image"
      />

      <h1 className="heading-failure">Products Not Found</h1>
      <button className="button-f" type="button">
        Continue Shopping
      </button>
    </div>
  )

  renderLoadingView = () => <Loader type="ThreeDots" height={50} width={50} />

  renderApiProgress = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiUrlStatus.success:
        return this.renderSuccessView()
      case apiUrlStatus.failure:
        return this.renderFailureView()
      case apiUrlStatus.Loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container-main">
        <Header />
        {this.renderApiProgress()}
      </div>
    )
  }
}

export default ProductItemDetails
