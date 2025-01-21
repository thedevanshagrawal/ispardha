import Link from 'next/link';
import React from 'react';

const HomePage = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center text-blue-800">
            <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12">
                <h2 className="text-5xl font-bold mb-6">Welcome to i-Spardha</h2>
                <p className="mb-10 text-2xl max-w-3xl">
                    Dive into the excitement of i-Spardha, the ultimate sports event at The ICFAI University, Raipur. Compete in a range of thrilling games, represent your house—Dominators, Terminators, Avengers, or Challengers—and create memories that will last a lifetime!
                </p>

                <section className="w-full py-8">
                    <h3 className="text-4xl font-semibold mb-6">Quick Links</h3>
                    <div className="flex justify-center space-x-6">
                        <Link href="/match-fixture" className="bg-blue-800 text-white py-3 px-8 rounded-lg text-xl font-semibold shadow-lg hover:bg-blue-600 transition duration-300">
                            Match Fixtures
                        </Link>
                        <Link href="/point-table" className="bg-blue-800 text-white py-3 px-8 rounded-lg text-xl font-semibold shadow-lg hover:bg-blue-600 transition duration-300">
                            Point Table
                        </Link>
                    </div>
                </section>
            </main>

            <section className="w-full py-16 bg-blue-100 text-center">
                <h3 className="text-4xl font-semibold mb-6">About the Houses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                    <div>
                        <h4 className="text-3xl font-bold">Dominators</h4>
                        <p>Champions of strength and resilience, always pushing boundaries.</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold">Terminators</h4>
                        <p>Masters of strategy and precision, terminating the competition with finesse.</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold">Avengers</h4>
                        <p>Fierce and fearless, avenging their way to the top with unmatched determination.</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold">Challengers</h4>
                        <p>Bold and daring, taking on every challenge with relentless spirit.</p>
                    </div>
                </div>
            </section>

            <section className="w-full py-16 bg-white text-center">
                <h3 className="text-4xl font-semibold mb-6">Event Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                    <div className="p-6 bg-blue-50 rounded-lg shadow-lg">
                        <h4 className="text-2xl font-bold mb-3">Exciting Games</h4>
                        <p>Participate in a variety of sports events and showcase your skills.</p>
                    </div>
                    <div className="p-6 bg-blue-50 rounded-lg shadow-lg">
                        <h4 className="text-2xl font-bold mb-3">Team Spirit</h4>
                        <p>Strengthen bonds with your peers as you compete together.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
