
type PropsType = {
    description: string | undefined,
}
 const Description = ({description}: PropsType) => {
    return (
        <div className="w-full">
            <p className="text-gray-700 text-sm leading-5 text-justify">
                {description}
            </p>
        </div>
    );
};

export default Description;