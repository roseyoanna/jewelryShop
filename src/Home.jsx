import myGreenImage from './assets/myImg/green.jpeg';

function Home({ onViewChange }) {
    return (

        <div className="h-screen w-full bg-black">

            {/* Imaginea de fundal */}
            <div
                className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: `url(${myGreenImage})` }}
            ></div>

            {/* Containerul pentru text*/}
            <div className="absolute inset-4 z-10 flex flex-col p-6 md:p-20
                        justify-end items-center pb-16 
                            md:justify-center md:items-start md:pb-0">

                <div className="max-w-xl text-center md:text-left flex flex-col md:gap-7">
                    <h1 className="italic text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide text-indigo-950 md:text-indigo-950 drop-shadow-sm">
                        Luxury Jewels
                    </h1>
                    <button
                        onClick={() => onViewChange('shop')}
                        className="italic group relative px-10 py-4 bg-transparent border rounded border-emerald-800 text-emerald-800 hover:bg-amber-400 hover:text-black transition-all duration-500 uppercase tracking-widest text-sm font-medium"
                    >
                        Explore My Collection 🌺
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Home;