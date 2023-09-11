import { ethers } from "ethers";
import ABI  from "./ABI.json";

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/"YOUR_API_KEY");
const contract  = new ethers.Contract("0x8fe15be3aadd30f78752001e6e38b846f2d195c0", ABI, provider);
const tokenContract = new ethers.Contract("0x1bef0d587dde09d4cee9b13d4d38b5bec57a1397", ABI, provider);
const wEthContract = new ethers.Contract ("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", ABI, provider);



const main = async () => {
       
  
        contract.on("Swap", async(...args) => {
            try {
                const pooledWeth = await wEthContract.balanceOf("0x8fe15be3aadd30f78752001e6e38b846f2d195c0");
                const pooledToken  = await tokenContract.balanceOf("0x8fe15be3aadd30f78752001e6e38b846f2d195c0");
                const maker = await provider.getTransaction(args[6].log.transactionHash);
                if(args[2]>0){
                    console.log(
                    "Bought :"+ args[3] + " Token For "+ ethers.formatEther(args[2]) + " ETH "
                    + "\nPooled ETH :"+ ethers.formatEther(pooledWeth) 
                    + "\nPooled Token :"+ pooledToken
                    + "\nLast Price :" + Number((pooledWeth/ pooledToken)) * 1620 / 1e10
                    + "\nMaker :"+ maker.from
                    );
                }else{
                    console.log("Sold :"+ args[1] + " Token For "+ ethers.formatEther(args[4]) + " ETH "
                    + "\nPooled ETH :"+ ethers.formatEther(pooledWeth) 
                    + "\nPooled Token :"+ pooledToken
                    + "\nLast Price :" +  Number ((pooledWeth/ pooledToken)) * 1620 / 1e10
                    + "\nMaker :"+ maker.from
                    );
                }
    

            } catch(e) {
                console.log(e);
            }
   
            
        })



    
}




main();
