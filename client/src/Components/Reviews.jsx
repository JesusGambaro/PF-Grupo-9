import { useSelector } from "react-redux";
import "../Css/Reviews.css"

function Reviews() {
  const { detail, detailColor } = useSelector(
    (state) => state.root
  );

  const handleStarts = (value, estilo) => {
    value = value.toString()
    const entero = parseInt(value[0])
    const resto = value[2] ? parseInt(value[2]) : 0
    let result = []

    if (entero === 5) {
      return [
        <i className="bi bi-star-fill text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star-fill text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star-fill text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star-fill text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star-fill text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>
      ]
    }
    else if (entero === 0 && resto === 5) {
      return [
        <i className="bi bi-star-half text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>,
        <i className="bi bi-star text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>
      ]
    }
    else if (resto === 0) {
      for (let i = 0; i < entero; i++) {
        result.push(<i className="bi bi-star-fill text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>)
      }
      for (let j = 0; j < 5 - entero; j++) {
        result.push(<i className="bi bi-star text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>)
      }
      return result
    }
    else {
      for (let i = 0; i < entero; i++) {
        result.push(<i className="bi bi-star-fill text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>)
      }
      result.push(<i className="bi bi-star-half text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>)
      for (let j = 0; j < 5 - entero - 1; j++) {
        result.push(<i className="bi bi-star text-warning" style={estilo ? { "fontSize": "3.5rem" } : { "fontSize": "2rem" }}></i>)
      }
      return result
    }
  }
  return (
    <div className="container w-100 mb-5">
      <h1 className="ms-md-3 my-5 text-info text-center">Reviews</h1>
      <div className="row justify-content-center shadow-lg py-4 px-5 review">
        <div className="d-flex align-items-center mb-5 gap-4">
          <h1 className="p-0 m-0 fw-bold text-info" id="rating">{detail.rating
            ? Number.isInteger(detail.rating)
              ? `${detail.rating}.0`
              : detail.rating
            : 0}</h1>

          <div className="d-flex flex-row gap-2">
            {detail.rating ?
              handleStarts(detail.rating, true).map((start, index) => (
                <div key={index} >
                  {start}
                </div>
              ))
              : (
                <i className="bi bi-star-fill text-warning fs-4"></i>,
                <i className="bi bi-star text-warning fs-4"></i>,
                <i className="bi bi-star text-warning fs-4"></i>,
                <i className="bi bi-star text-warning fs-4"></i>,
                <i className="bi bi-star text-warning fs-4"></i>
              )
            }
          </div>
        </div>

        {detail.id
          ? detail.reviews.length > 0
            ? detail.reviews.map(review => (
              <div className="row shadow-lg border border-4 border-info py-2 px-4 mb-5 bg-light review" key={review.id}>
                <div className="d-flex flex-row gap-2 mb-2">
                  {handleStarts(review.rating, false).map((start, index) => (
                    <div key={index}>
                      {start}
                    </div>
                  ))
                  }
                </div>
                <p className="fs-5 m-0 mb-1">{review.user.userName}</p>
                <p className="fs-4 fw-bold m-0 mb-1 ms-2 parrafo">{review.description}</p>
              </div>
            ))
            : (<div className="row shadow-lg border border-4 border-info py-2 px-4 mb-5 bg-light review">
              <p className="fs-4 fw-bold m-0 mb-1">No reviews</p>
            </div>)
          : null
        }


      </div>
    </div>
  );
}

export default Reviews;