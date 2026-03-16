export default function FeatureSection() {
  return (
    <section className="py-5 border-top border-bottom bg-light">
      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-md-4 text-center">
            <div className="mb-3 text-primary fs-1">📝</div>
            <h3 className="h5 fw-bold">Smart Lists</h3>
            <p className="text-muted">
              Organize items by category or aisle to save time in-store.
            </p>
          </div>
          <div className="col-md-4 text-center border-start border-end">
            <div className="mb-3 text-primary fs-1">☁️</div>
            <h3 className="h5 fw-bold">Cloud Sync</h3>
            <p className="text-muted">
              Access your list from your phone, tablet, or desktop anywhere.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div className="mb-3 text-primary fs-1">👥</div>
            <h3 className="h5 fw-bold">Collaborate</h3>
            <p className="text-muted">
              Share lists with family and see updates as they happen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
