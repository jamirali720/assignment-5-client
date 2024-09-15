import { useParams } from "react-router-dom";


const UpdateBike = () => {
    const {id} = useParams();
    return (
        <div>
            upated and {id}
        </div>
    );
};

export default UpdateBike;