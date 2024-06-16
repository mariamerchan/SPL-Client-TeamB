import { useObtenerOfrecimientos } from "../hooks/useOfrecimientos";

export const OfrecimientosPage = () => {
  const { ofrecimientos } = useObtenerOfrecimientos();
  return (
    <div className="container my-8">
      <h1 className="text-center">Ofrecer App SPL</h1>
      <h2 className="text-center mb-4">¿Qué tenemos para ofrecer?</h2>
      <h2 className="text-center mb-5">Team B</h2>
      <div className="row row-container mt-9 offers">
        {ofrecimientos.map((ofrecimiento) => (
          <div
            key={ofrecimiento.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div className="card card-custom h-100">
              <div className="card-body">
                <h5 className="card-title headline">
                  <i className="bi bi-person-fill mr-2"></i>
                  {ofrecimiento.nombre}
                </h5>
                <p className="card-text">
                  <i className="bi bi-file-text-fill mr-2"></i>
                  {ofrecimiento.descripcion}
                </p>
                <p className="card-text">
                  <i className="bi bi-linkedin mr-2"></i>
                  <a
                    href={ofrecimiento.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ofrecimiento.socialUrl}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
