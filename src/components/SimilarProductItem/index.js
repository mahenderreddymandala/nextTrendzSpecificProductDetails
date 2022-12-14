// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {productdetails} = props
  const {title, brand, imageUrl, price, rating} = productdetails
  return (
    <li className="list-items-section">
      <img src={imageUrl} alt={title} className="s-image" />
      <p className="title-s">{title}</p>
      <p className="brand-p">by {brand}</p>
      <div className="section">
        <p className="price-p">Rs {price}</p>
        <div className="i-rate">
          <p className="rating-p">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
