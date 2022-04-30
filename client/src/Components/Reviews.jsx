import "../Css/Reviews.css"

function Reviews() {
  return (
    <div className="container w-100 mb-5">
      <h1 className="ms-md-3 my-5 text-info text-center">Reviews</h1>
      <div className="row justify-content-center shadow-lg py-4 px-5 review">
        <div className="d-flex align-items-center mb-5 gap-4">
          <h1 className="p-0 m-0 fw-bold text-info" id="rating">3.5</h1>
          <div className="d-flex flex-row gap-2">
            <i class="bi bi-star-fill text-warning" style={{"fontSize":"3.5rem"}}></i>
            <i class="bi bi-star-fill text-warning" style={{"fontSize":"3.5rem"}}></i>
            <i class="bi bi-star-fill text-warning" style={{"fontSize":"3.5rem"}}></i>
            <i class="bi bi-star-half text-warning" style={{"fontSize":"3.5rem"}}></i>
            <i class="bi bi-star text-warning" style={{"fontSize":"3.5rem"}}></i>
          </div>
        </div>

        <div className="row shadow-lg border border-4 border-info py-2 px-4 mb-5 bg-light review">
          <div className="d-flex flex-row gap-2 mb-2">
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
          </div>
          <p className="fs-4 fw-bold m-0 mb-1">Muy buenas me gustaron mucho</p>
          <p className="fs-5 ms-2 lh-sm parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quidem aliquid repudiandae libero ducimus odit natus, vel iure possimus enim tenetur accusantium facilis reiciendis pariatur, dolor ab sapiente. Cum, minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque repellat tempora ut, cum nam necessitatibus eum porro dignissimos illum esse nihil iusto ducimus totam corrupti animi similique modi voluptatibus consequatur.</p>
        </div>

        <div className="row shadow-lg border border-4 border-info py-2 px-4 mb-5 bg-light review">
          <div className="d-flex flex-row gap-2 mb-2">
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star text-warning fs-1"></i>
          </div>
          <p className="fs-4 fw-bold m-0 mb-1">Muy buenas me gustaron mucho</p>
          <p className="fs-5 ms-2 lh-sm parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quidem aliquid repudiandae libero ducimus odit natus, vel iure possimus enim tenetur accusantium facilis reiciendis pariatur, dolor ab sapiente. Cum, minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque repellat tempora ut, cum nam necessitatibus eum porro dignissimos illum esse nihil iusto ducimus totam corrupti animi similique modi voluptatibus consequatur.</p>
        </div>

      </div>
    </div>
  );
}

export default Reviews;