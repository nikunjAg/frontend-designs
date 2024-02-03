import "../App.css";
import { PAGES } from "../utils/cards";
import Card from "../components/Card/Card";

function LandingPage() {
	const cards = PAGES.map((page) => <Card key={page.url} {...page} />);

	return <div style={{ margin: '1rem' }} >
        <h2 style={{ marginBottom: '2rem' }} ><center><u>Components</u></center></h2>
        <div className="cards">{cards}</div>
    </div>;
}

export default LandingPage;
