
import {useSendTransaction,type BaseError , useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from 'viem'

import {useEffect} from "react";


function SendEth  ({refetchBalance}) {


    

    const {data:hash, error, mutate, status} = useSendTransaction();

    const handleSubmit = (event : React.SubmitEvent<HTMLFormElement>) => {

        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);

        const to  = formData.get("address") as `0x${string}`;
        const value = formData.get("value") as string;


        mutate({to , value : parseEther(value)});
   
    }

    const {isLoading : isConfirming , isSuccess: isConfirmed} = useWaitForTransactionReceipt({
        hash,
    });



    useEffect(() =>{
        async function handleState () {
            if(isConfirmed) {
                await refetchBalance();
            }
        }
        handleState();
    },[isConfirmed , refetchBalance])

    
    return (
        <>
            <form onSubmit = {handleSubmit}>
                <input type="text" name = "address" required/>
                <input type="number" step="any"  name = "value" required/>
                <button type="submit" disabled={isConfirming || status === "pending"  }>{ isConfirming || status === "pending" ?  "transaction proceed" : "Submit"}</button>
            </form>

            <div>
                {hash && <div>Transaction Hash: {hash}</div>} 
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
            </div>


            {
                error && 
                <div>
                    Error : {(error  as BaseError ).shortMessage || error.message}
                </div>
            }
        </>
    )
}

export default SendEth;