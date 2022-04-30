import { useEffect, useState } from "react";
import { Collapse, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../redux/actions/Review";
import Swal from "sweetalert2"

function CardProfile({ brand, model }) {
  const { review } = useSelector(store => store.root)
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const [range, setRange] = useState(1)
  const [validation, setValidation] = useState(true)
  const [description, setDescription] = useState("")
  const [reviewComplete, setReviewComplete] = useState(false)
  const [stars, setStars] = useState([
    <i className="bi bi-star-fill text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>
  ]
  )

  useEffect(() => {
    description.length > 0 ? setValidation(false) : setValidation(true)
  }, [description])

  const handleRange = (e) => {
    const value = e.target.value
    setRange(value)
    const entero = parseInt(value[0])
    const resto = value[2] ? parseInt(value[2]) : 0
    let result = []

    if (entero === 5) {
      setStars([
        <i className="bi bi-star-fill text-warning fs-4"></i>,
        <i className="bi bi-star-fill text-warning fs-4"></i>,
        <i className="bi bi-star-fill text-warning fs-4"></i>,
        <i className="bi bi-star-fill text-warning fs-4"></i>,
        <i className="bi bi-star-fill text-warning fs-4"></i>
      ])
    }
    else if (entero === 0 && resto === 5) {
      setStars([
        <i className="bi bi-star-half text-warning fs-4"></i>,
        <i className="bi bi-star text-warning fs-4"></i>,
        <i className="bi bi-star text-warning fs-4"></i>,
        <i className="bi bi-star text-warning fs-4"></i>,
        <i className="bi bi-star text-warning fs-4"></i>
      ])
    }
    else if (resto === 0) {
      for (let i = 0; i < entero; i++) {
        result.push(<i className="bi bi-star-fill text-warning fs-4"></i>)
      }
      for (let j = 0; j < 5 - entero; j++) {
        result.push(<i className="bi bi-star text-warning fs-4"></i>)
      }
      setStars(result)
    }
    else {
      for (let i = 0; i < entero; i++) {
        result.push(<i className="bi bi-star-fill text-warning fs-4"></i>)
      }
      result.push(<i className="bi bi-star-half text-warning fs-4"></i>)
      for (let j = 0; j < 5 - entero - 1; j++) {
        result.push(<i className="bi bi-star text-warning fs-4"></i>)
      }
      setStars(result)
    }
  }

  const handleSend = () => {
    const token = window.localStorage.getItem("token")
    dispatch(postReview(token, {
      description: description,
      rating: range,
      model: model,
      brand: brand
    }))
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thanks for your review",
      text:"Your review was sent successfully",
      showConfirmButton: false,
      timer: 1200,
    });
    setReviewComplete(true)
    setExpanded(false)
  }
  return (
    <>
      <div className="pb-4">
        <Button
          onClick={() => setExpanded(!expanded)}
          aria-controls="example-collapse-text"
          aria-expanded={expanded}
        >
          Review
        </Button>
      </div>
      <Collapse in={expanded}>
        <div id="example-collapse-text" className="row w-75 mb-4">
          {reviewComplete
            ? <div className="card card-body text-center fw-bold">
              {review.msg}
            </div>
            : (
              <>
                <div className="d-flex flex-row gap-2 mb-2 justify-content-center" >
                  {stars?.map(((start, index) =>
                    <div key={index}>
                      {start}
                    </div>
                  ))}
                </div >

                <label htmlFor="customRange3" className="text-center fw-bold fs-5">{range}</label>
                <input type="range" className="form-range py-3" min="1" max="5" step="0.5" id="customRange3"
                  defaultValue={1} onChange={(e) => handleRange(e)} />

                <div className="form-floating m-0 p-0 mb-3">
                  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ "height": "100px" }} onChange={(e) => setDescription(e.target.value)}></textarea>
                  <label htmlFor="floatingTextarea2" className="p-0 ps-3 pt-2">Your Comment</label>
                </div>

                <div className="text-center">
                  <button className="btn btn-primary" onClick={handleSend} disabled={validation}>Send</button>
                </div>
              </>
            )
          }

        </div>
      </Collapse>
    </>
  );
}

export default CardProfile;