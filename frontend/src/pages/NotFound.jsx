import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageWrap } from "../components/Shared";

export default function NotFound() {
  return (
    <PageWrap testid="notfound-page">
      <div className="nf">
        <div className="nf-code mono">404</div>
        <h1>This part isn't in our catalogue</h1>
        <p>The page you're looking for was blanked, pierced, or never stamped in the first place.</p>
        <Link to="/" className="btn btn-primary" data-testid="notfound-home-button"><ArrowLeft size={16} /> Back to Home</Link>
      </div>
    </PageWrap>
  );
}
