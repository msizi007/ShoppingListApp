import Navbar from "../components/Navbar";

export default function Privacy() {
  const currentYear = new Date().getFullYear();

  return (
    // The main container is centered, padded, and limited in width for readability
    <>
      <Navbar isLoggedIn={false} />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <header className="mb-4 pb-3 border-bottom text-center">
              <h1 className="display-4 fw-bold text-primary">Privacy Policy</h1>
              <p className="lead text-muted fst-italic mt-3">
                *Last Updated: January 12, {currentYear}*
              </p>
            </header>

            <section className="mb-5">
              <h2 className="text-secondary mb-3">1. Introduction</h2>
              <p className="mb-3">
                Welcome to the Shopping List App. We are committed to protecting
                your personal information and your right to privacy. If you have
                any questions or concerns about this privacy notice, or our
                practices with regard to your personal information.
              </p>
              <p>
                This Privacy Policy governs the privacy policies and practices
                of our application and related services (the "Services"). By
                accessing or using our Services, you agree to be bound by the
                terms and conditions described herein.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="text-secondary mb-3">2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to
                us when you register on the Services, express an interest in
                obtaining information about us or our products and services,
                when you participate in activities on the Services, or otherwise
                contact us.
              </p>

              <h3 className="h4 text-dark mt-4 mb-3">
                2.1. Personal Information Provided by You
              </h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p className="fw-bold mb-0">Contact Data:</p>
                  <p className="mb-0 text-muted">
                    Name, email address, phone number, and similar contact
                    information.
                  </p>
                </li>
                <li className="list-group-item">
                  <p className="fw-bold mb-0">Account Data:</p>
                  <p className="mb-0 text-muted">
                    Username, passwords, and security data for authentication
                    and account access.
                  </p>
                </li>
                <li className="list-group-item">
                  <p className="fw-bold mb-0">Payment Data:</p>
                  <p className="mb-0 text-muted">
                    (If applicable) Data necessary to process your payment if
                    you make purchases, such as your payment instrument number
                    (e.g., credit card number), and the security code associated
                    with your payment instrument.{" "}
                    <em>
                      All payment data is stored by our payment processor (e.g.,
                      Stripe, PayPal), and you should review its privacy
                      policies.
                    </em>
                  </p>
                </li>
              </ul>

              <h3 className="h4 text-dark mt-4 mb-3">
                2.2. Information Automatically Collected
              </h3>
              <p>
                Some information—such as your Internet Protocol (IP) address
                and/or browser and device characteristics—is collected
                automatically when you visit our Services. This information is
                primarily needed to maintain the security and operation of our
                Services, and for our internal analytics and reporting purposes.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Usage Data: Information about how you use our application
                  (e.g., pages viewed, features used).
                </li>
                <li className="list-group-item">
                  Log and Device Data: IP address, operating system, browser
                  type, device name, and device ID.
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="text-secondary mb-3">
                3. How We Use Your Information
              </h2>
              <p>
                We use personal information collected via our Services for a
                variety of business purposes described below. We process your
                personal information for these purposes in reliance on our
                legitimate business interests, in order to enter into or perform
                a contract with you, with your consent, and/or for compliance
                with our legal obligations.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="fw-bold">
                    To Facilitate Account Creation and Logon Process.
                  </span>
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">
                    To Send You Marketing and Promotional Communications
                  </span>{" "}
                  (in accordance with your preferences).
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">
                    To Fulfill and Manage Your Orders
                  </span>{" "}
                  (if applicable).
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">To Post Testimonials</span> (with
                  your consent).
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">To Protect Our Services</span> (for
                  security and fraud prevention).
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">
                    To Enforce Our Terms, Conditions, and Policies.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="text-secondary mb-3">
                4. Will Your Information Be Shared With Anyone?
              </h2>
              <p>
                We only share and disclose your information in the following
                situations:
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="fw-bold">With Your Consent:</span> We may
                  disclose your personal information for any purpose with your
                  consent.
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">For Legal Obligations:</span> We may
                  disclose your information where we are legally required to do
                  so in order to comply with applicable law, governmental
                  requests, a judicial proceeding, court order, or legal
                  process.
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">
                    Third-Party Service Providers:
                  </span>{" "}
                  We may share your data with third-party vendors, service
                  providers, contractors, or agents who perform services for us
                  or on our behalf and require access to such information to do
                  that work.{" "}
                  <span className="text-muted fst-italic">
                    Examples include: payment processing, data analysis, email
                    delivery, hosting services.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="text-secondary mb-3">5. Your Privacy Rights</h2>
              <p>
                In some regions (like the EEA and UK), you have rights that
                allow you greater access to and control over your personal
                information. Your rights may include: the right to access, the
                right to rectification, the right to erasure, the right to
                restrict processing, the right to data portability, and the
                right to object to processing.
              </p>

              <h3 className="h4 text-dark mt-4 mb-3">Account Information</h3>
              <p>
                If you would at any time like to review or change the
                information in your account or terminate your account, you can:
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Log into your account settings and update your user profile.
                </li>
                <li className="list-group-item">
                  Contact us using the contact information provided at the
                  beginning of this policy.
                </li>
              </ul>
            </section>

            <footer className="footer pt-4 mt-5 border-top text-center text-muted">
              <h2 className="h4 text-secondary mb-3">6. Contact Us</h2>
              <p className="mb-1">
                If you have questions or comments about this policy, you may
                email us at:
              </p>
              <p className="mb-3">
                <a
                  href="mailto:[Your Support Email Address]"
                  className="lead fw-bold text-decoration-none text-info"
                >
                  [Your Support Email Address]
                </a>
              </p>
              <address className="mb-0">
                **[Your App/Company Name]**
                <br />
                [Your Company Address (Optional)]
              </address>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
