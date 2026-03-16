export default function Footer() {
  return (
    <footer className="bg-dark text-secondary py-4 border-top border-secondary mt-auto">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0">
            <span className="fw-bold text-white">Ethentech</span>
          </div>

          <div className="small">
            <span>&copy; {new Date().getFullYear()} Shopify List App</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
