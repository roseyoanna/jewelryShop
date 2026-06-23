import myGreenImage from './assets/myImg/green.jpeg';

function Home({
    onViewChange }) {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${myGreenImage})` }}
            ></div>

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
                <h1 className="text-6xl md:text-8xl font-serif font-light mb-6 tracking-wide">
                    Luxury Jewels
                </h1>
                <p className="text-xl md:text-2xl font-light mb-10 italic">
                    An archive of beauty and time.
                </p>
                <button
                    onClick={() => onViewChange('shop')}
                    className="group relative px-10 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-sm"
                >
                    Explore My Collection 🌺
                </button>
            </div>
        </div>
    );
}



export default Home;
