import {useNavigate} from "react-router-dom";
import {useEffect} from 'react';


const Random = () => {
    const navigate = useNavigate();

    const randomNumberGenerator = () => {
        return Math.round(Math.random() * 80); //between 0 and 79
    }
    useEffect(() => {
        navigate(`/results?points=${randomNumberGenerator()}`);
        console.log("random");
    })
}
export default Random;