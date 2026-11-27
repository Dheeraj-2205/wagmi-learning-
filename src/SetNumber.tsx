import {useWriteContract, useWaitForTransactionReceipt ,type BaseError} from "wagmi";
import {CONTRACT_ADDRESS , ABI} from "./contract.ts";
import { sepolia } from "viem/chains";


function SetNumber() {

    const {writeContract, data:hash, isPending , error} = useWriteContract();

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
            args : [number]
        })

    }

    const {isLoading , isSuccess} = useWaitForTransactionReceipt({hash});

    console.log(isLoading ,isSuccess ,  "isLoading");

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="number" required name="value" min={0}/>
                <button type="submit" disabled= {isPending}>{isPending ? "Confirmation" : "Mint"}</button>
            </form>

            {isLoading &&<p> loading ....</p>}
            {isSuccess && <p>success .....</p>}
            {error && ( <div>Errors : {(error as BaseError).shortMessage || error.message}</div>)}
            {hash && <p>hash :- { hash}</p>}


        </div>
    )

}

export default SetNumber; 