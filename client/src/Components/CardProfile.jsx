import { useState } from "react";
import { Collapse, Button } from "react-bootstrap"

function CardProfile() {
  const [expanded, setExpanded] = useState(false)
  const [range, setRange] = useState(0)
  const [stars, setStars] = useState([
    <i className="bi bi-star text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>,
    <i className="bi bi-star text-warning fs-4"></i>
  ]
  )

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
          <div className="d-flex flex-row gap-2 mb-2 justify-content-center" >
            {stars?.map(((start, index) =>
              <div key={index}>
                {start}
              </div>
            ))}
          </div >

          <label htmlFor="customRange3" className="text-center fw-bold fs-5">{range}</label>
          <input type="range" className="form-range py-3" min="0" max="5" step="0.5" id="customRange3"
            defaultValue={0} onChange={(e) => handleRange(e)} />

          <div className="form-floating m-0 p-0 mb-3">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ "height": "100px" }}></textarea>
            <label htmlFor="floatingTextarea2" className="p-0 ps-3 pt-2">Your Comment</label>
          </div>

          <div className="text-center">
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default CardProfile;