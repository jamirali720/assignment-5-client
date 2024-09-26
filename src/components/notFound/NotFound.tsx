
const NotFound = () => {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex justify-center justify-items-center">
          <div className="content-center">
            <h1 className="text-4xl font-bold text-center text-slate-700 mb-5">
              404
            </h1>
            <h2 className="text-2xl font-bold text-slate-700">
              Woops! Page Not Found
            </h2>
          </div>
        </div>
      </div>
    );
};

export default NotFound;