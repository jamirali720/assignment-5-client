type PropsType = {
    item: {
        year: string;
        title: string;
        description: string;
    }
}

const TimeLIneItem = ({item} : PropsType) => {
    return (
      <div className="w-1/2 min-h-full h-full p-10 border border-slate-200 dark:bg-black dark:text-white">
        <div className="">
          <h2 className="text-gray-700 dark:text-white text-xl font-bold text-center">
            {item.year}
          </h2>
          <h3 className="text-gray-700 dark:text-white text-xl font-bold text-center my-4">
            {item.title}
          </h3>
          <p className="text-gray-700 dark:text-white text-sm leading-5 text-justify my-5">
            {item.description}
          </p>
        </div>
      </div>
    );
};

export default TimeLIneItem;