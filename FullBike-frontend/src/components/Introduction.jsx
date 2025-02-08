import '../styles/Introduction.css';
import fullbike2 from '../assets/images/fullbike2.jpeg';

function Introduction() {
    return (
        <div className="introduction-container">
            <div className="introduction-image">
                <img src={fullbike2} alt="FullBike Mechanic" />
            </div>
            <div className="introduction-text">
                <h1>Know Your FullBike Mechanic</h1>
                <p>
                    Fullbike is owned and operated by Steven Castaneda,
                    a highly skilled mechanic with over 20 years of experience
                    in bicycle repair, maintenance, and customization.
                    His deep passion for cycling, combined with his technical expertise,
                    has made Fullbike a trusted destination for riders of all levels,
                    from casual commuters to professional cyclists.
                </p>
                <p>
                    Steven&apos;s journey in the cycling industry began decades ago,
                    working hands-on with all types of bikes, from road and mountain bikes
                    to high-performance racing models. Over the years, he has refined his skills,
                    staying up to date with the latest advancements in bike technology,
                    ensuring that every customer receives top-quality service and expert advice.
                </p>
                <p>
                    At Fullbike, we believe that a well-maintained bike is key to a great riding experience.
                    Whether you need a simple tune-up, a complete overhaul, custom modifications,
                    or guidance on the best gear and components, Steven and his team are dedicated
                    to providing professional, reliable, and friendly service. Our goal is to keep your bike
                    in peak condition, so you can ride with confidence and enjoy every journey.
                </p>

                <p>
                    Visit Fullbike today and discover the difference that expert care can make for your bike.
                </p>
            </div>
        </div>
    );
}

export default Introduction;