export default function () {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h2 className="fw-bold mb-4">Your groceries, organized.</h2>
          <div className="d-flex align-items-start mb-3">
            <div className="badge bg-success rounded-circle me-3 p-2">✓</div>
            <p className="mb-0">Cross off items with a single tap.</p>
          </div>
          <div className="d-flex align-items-start mb-3">
            <div className="badge bg-success rounded-circle me-3 p-2">✓</div>
            <p className="mb-0">
              Add quantities and notes for specific brands.
            </p>
          </div>
          <div className="d-flex align-items-start">
            <div className="badge bg-success rounded-circle me-3 p-2">✓</div>
            <p className="mb-0">Keep a history of your most-bought items.</p>
          </div>
        </div>

        {/* Mockup Card */}
        <div className="col-lg-5 offset-lg-1">
          <div className="card shadow border-0 rounded-4">
            <div className="card-header bg-primary text-white p-3 rounded-top-4">
              <h5 className="mb-0">Weekly Groceries</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <span>🍎 Fresh Apples</span>
                <span className="badge bg-light text-dark border">6 pcs</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3 text-decoration-line-through text-muted opacity-50">
                <span>🍞 Sourdough Bread</span>
                <span className="badge bg-light text-dark border">1 loaf</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <span>🥛 Oat Milk</span>
                <span className="badge bg-light text-dark border">
                  2 cartons
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
