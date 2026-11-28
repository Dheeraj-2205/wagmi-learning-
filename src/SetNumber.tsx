import {useWriteContract, useWaitForTransactionReceipt ,type BaseError, useReadContract} from "wagmi";
import {CONTRACT_ADDRESS , ABI} from "./contract.ts";
import { sepolia } from "viem/chains";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


function SetNumber() {

    const {writeContract, data:hash, isPending , error} = useWriteContract();
    const {queryKey} = useReadContract({
        abi: ABI,
        address : CONTRACT_ADDRESS,
        functionName : "retrieve",
        chainId : sepolia.id
    })
    const queryClient = useQueryClient();


    console.log(queryClient);
    console.log(queryKey);


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

    useEffect(() =>{
        if(isSuccess){
            queryClient.invalidateQueries({queryKey})
        }
    },[queryClient , queryKey, isSuccess])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="number" required name="value" min={0}/>
                <button type="submit" disabled= {isPending}>{isPending ? "Confirmation" : "Mint"}</button>
            </form>

            {isLoading &&<p> loading ....</p>}
            {isSuccess && <p>success .....</p>}
            {error && ( <div>Errors : {(error as BaseError).shortMessage || error.message}</div>)}
            {hash && <p>hash :- {hash}</p>}


        </div>
    )

}

export default SetNumber; 