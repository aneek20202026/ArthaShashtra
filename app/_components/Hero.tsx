import Navbar from "./Navbar";
import Reveal from './Reveal'
const Hero = () => {
    return (
        <>
            <Navbar/>
            <Reveal>
            <section className="pt-20 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
                    <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
                    Smart Financial Planning for 
                        <span className="text-indigo-600"> Your Business</span>
                    </h1>
                    <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
                    Your business deserves financial clarity and control—we make it possible.
                    </p>
                    <a href="#" className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-white rounded-full bg-indigo-600 shadow-xs hover:bg-indigo-700 transition-all duration-500">
                        Get Started
                    </a>
                    <div className="flex justify-center">
                        <img src="https://pagedone.io/asset/uploads/1691054543.png" alt="Dashboard" className="rounded-t-3xl h-auto object-cover" />
                    </div>
                </div>
            </section>
            </Reveal>
        </>
    );
};

export default Hero;
