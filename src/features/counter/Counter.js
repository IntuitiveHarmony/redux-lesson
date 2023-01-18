import { useSelector, useDispatch } from "react-redux"; // Step 1.
import { increment, decrement } from "./counterSlice";  // Step 3.

const Counter = () => {
    // Step 1.
    const value = useSelector((state) => state.counter.value) 
    // Step 1.
    const dispatch = useDispatch()

    return (
        <>
            <div>
                <p>{value}</p>
                {/* steps 3. and 4. */}
                <button onClick={() => dispatch(decrement())}>Decrement Value</button>
                <button onClick={() => dispatch(increment())}>Increment Value</button>
            </div>
        </>
    )
}

export default Counter