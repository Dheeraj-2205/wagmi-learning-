import {useWriteContract} from "wagmi";
import {CONTRACT_ADDRESS , ABI} from "./contract.ts";
import { sepolia } from "viem/chains";


function SetNumber() {

    const {writeContract} = useWriteContract();


    const handleSubmit= (event: React.SubmitEvent<HTMLFormElement>) =>{
        event.preventDefault();
        

        const formData = new FormData(event.currentTarget);

        const rawValue = formData.get("value") as string;

        const number:bigint =  BigInt(rawValue);
        

        writeContract({
            abi: ABI,
            address : CONTRACT_ADDRESS,
            functionName : "store",
            chainId: sepolia.id,
            args : [BigInt(number)]
        })

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="number" step="any" name="value" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default SetNumber; 