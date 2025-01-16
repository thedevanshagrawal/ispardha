function Footer() {
    return (
        <footer className="bg-blue-800 text-white shadow-lg">
            <div className="container flex flex-col md:flex-row justify-between items-center px2 py-4 mx-auto">
                {/* Footer Title */}
                <h1 className="font-bold ml-5">
                    &copy; All rights reserved by i-Spardha {new Date().getFullYear()}
                </h1>
            </div>
        </footer>
    );
}

export default Footer;
