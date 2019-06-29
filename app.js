const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'AdvocateOperation> '
});

        console.log("----------------------------------------\n");
        console.log("|          MENU                        |\n");
        console.log("----------------------------------------\n");
        console.log("|  1. Add an advocate                  |\n");
        console.log("|  2. Add junior advocates             |\n");
        console.log("|  3. Add states for advocate          |\n");
        console.log("|  4. Add cases for advocate           |\n");
        console.log("|  5. Junior Advocate updation         |\n");
        console.log("|  6. Reject a case.                   |\n");
        console.log("|  7. Display all advocates            |\n");
        console.log("|  8. Display all cases under a state  |\n");
        console.log("|  9. Get Advocate Details             |\n");
        console.log("|  0. Menu                             |\n");
        console.log("----------------------------------------\n");





rl.prompt();

let final_advocate =[];


rl.on('line', (line) => {

    var lineStatus =  line.trim();

    // function for check senior Advocate Id status
    async function checkValidjuniorIdpromise(jid) {
            return new Promise(
                (resolve,reject) =>{
                const rowLen = final_advocate.length;
                final_advocate.map(function(e,i) { 
                    
                            if(typeof(e['junior']) == 'undefined'){
                                    resolve({'res':false})
                            }else{
                                 e['junior'].map(function(junioritem){
                                    if(junioritem['juniorId'] == jid){
                                        resolve({'res':true});      
                                    }

                                });
                            }
                             if (rowLen == i + 1) {
                                    resolve({'res':false});      
                                    // last one
                            }
                    });

            });
    }
    // function for check case Id status
    async function checkValidcaseIdpromise(cid,seniorid) {
            return new Promise(
                (resolve,reject) =>{
                
                    final_advocate.map(function(e) { 
                    
                       if(e['SeniorAdvocateId'] == seniorid){

                            if(typeof(e['case']) == 'undefined'){
                                    resolve({'res':false})
                            }else{

                                 e['case'].map(function(caseitem){
                                    if(caseitem['caseid'] == cid){
                                        resolve({'res':true});      
                                    }else{
                                        resolve({'res':false});      
                                    }

                                });
                            }
                       }
                      
                    });

            });
    }
    // function for check junior Advocate Id status
    async function checkValidseniorIdpromise(sid) {
            return new Promise(
                (resolve,reject) =>{
                let pos = final_advocate.map(function(e) { return e['SeniorAdvocateId'];}).indexOf(sid);
                if(pos > -1){
                    resolve({'res':true})
                }else{
                    resolve({'res':false});
                }

            });
    }
    // create junior id 
    async function createJuniorid( objval,value, desc) {
            return new Promise(
                (resolve,reject) =>{
                     final_advocate.map(function(itemObj){
                        if (itemObj['SeniorAdvocateId'] == value) {
                            if(objval =='junior'){

                                let temp_arry =[];
                                if(itemObj['junior']){
                                    temp_arry = itemObj['junior'].slice(); 
                                    temp_arry.push(desc)
                                    itemObj['junior'] =temp_arry;
                                }else{
                                   temp_arry.push(desc);
                                  itemObj['junior'] =temp_arry;
                                }
                            }
                            else if(objval =='state'){
                                itemObj['state'] = desc;
                            }
                            else if(objval == 'practicingstate'){
                                let temp_arry =[];
                                if(itemObj['case']){
                                    temp_arry = itemObj['case'].slice(); 
                                    temp_arry.push(desc)
                                    itemObj['case'] =temp_arry;
                                }else{
                                   temp_arry.push(desc);
                                  itemObj['case'] =temp_arry;
                                }
                            }
                        }
                    });
                    resolve({'res':true});      
                });
    }
    // reject Case by senior Advocate
    async function rejectCasebySenior( objval,value, desc) {
            return new Promise(
                (resolve,reject) =>{
                     final_advocate.map(function(itemObj){
                        if (itemObj['SeniorAdvocateId'] == value) {
                            if(objval == 'rejectcase'){

                                itemObj['case'].map(function(caseitem){

                                    if(caseitem['caseid'] == desc){
                                        caseitem['casestatus'] = 'deactive';
                                        resolve({'res':true});      
                                    }else{
                                        resolve({'res':false});      
                                    }


                                });

                            }
                        }
                    });
                });
    }
    // update in junior data
    async function updateJuniorid( objval,value, desc) {
            return new Promise(
                (resolve,reject) =>{
                    let final_advocatelen =final_advocate.length;
                     final_advocate.map(function(itemObj,i){

                            if(objval == 'updatejuniorstate'){

                                itemObj['junior'].map(function(caseitem){

                                    if(caseitem['juniorId'] == value){

                                        if(!caseitem['practicingState']){
                                            caseitem['practicingState'] = desc;
                                            resolve({'res':true}); 
                                        }else{
                                            resolve({'res':false}); 
                                        }       
                                    }
                                });
                            }
                            if(final_advocatelen == i+1){
                                resolve({'res':false});      
                            }
                    });
                });
    }
    // function for get junior id for cli 
    async function getJuniorAdvocateId(seniorid) {
            return new Promise(
                (resolve,reject) =>{
                     rl.question('Enter Junior Advocate Id::', async (answer) => {
                        let juniorObj ={};
                        juniorObj.juniorId = answer;
                        let resjn = await createJuniorid('junior',seniorid,juniorObj);
                        if(resjn){
                            resolve({'res':true})
                        }else{
                           resolve({'res':false})
                        }
                    })
                });
    }
    // function for practicinng State creation 
    async function createPracticingStateAdvocateId(seniorid,objforcase){
        return new Promise((resolve,reject)=>{
                rl.question('Enter Practicing State ::', async (answer) => {
                    objforcase.practicingState = answer;
                    objforcase.casestatus = 'active';
                    let resjn = await createJuniorid('practicingstate',seniorid,objforcase);
                        if(resjn){
                            resolve({'res':true})
                        }else{
                            resolve({'res':false})
                        }
                });
        });
    }
   // function for create state for senior advocate
    async function createStateAdvocateId(seniorid){
        return new Promise((resolve,reject)=>{
                rl.question('Enter State ::', async (answer) => {
                    let juniorObj ={};
                    juniorObj.stateId = answer;

                    let resjn = await createJuniorid('state',seniorid,juniorObj);
                        if(resjn){
                            resolve({'res':true})
                        }else{
                            resolve({'res':false})
                        }
                });
        });
    }
    // function for update junior data 
    async function updatejuniorAdvocateId(juniorid,option){
        return new Promise((resolve,reject)=>{

                if(option == 'ps'){
                    rl.question('Enter Practicing State ::', async (answer) => {
                        let resjn = await updateJuniorid('updatejuniorstate',juniorid,answer);
                            if(resjn.res){
                                resolve({'res':true})
                            }else{
                                resolve({'res':false})
                            }
                    });

                }else if(option == 'scase'){

                    rl.question('Enter Case Id ::', async (answer) => {

                        let checkStatus = await checkValidcaseIdpromise(answer,juniorid);

                        if(checkStatus.res){
                            let resjn = await rejectCasebySenior('rejectcase',juniorid,answer);
                            if(resjn.res){
                                resolve({'res':true})
                            }else{
                                resolve({'res':false})
                            }
                        }else{
                            console.log("Not Valid Case Id")
                            resolve({'res':false})
                        }
                            
                    });

                }
              
        });
    }
   // function for create case for senior advocate
    async function createCaseAdvocateId(seniorid){
        return new Promise((resolve,reject)=>{
                rl.question('Enter Case ID ::', async (answer) => {
                    let caseObj ={};
                    caseObj.caseid = answer;
                    let resjn = await createPracticingStateAdvocateId(seniorid,caseObj);
                        if(resjn){
                            resolve({'res':true})
                        }else{
                            resolve({'res':false})
                        }
                });
        });
    }
    // code code for opiton 1 add an advicate
    if(lineStatus == '1'){

            rl.question('Add an advocate ID::', (answer) => {

                async function createSeniorAdvocate(answer){
                    try{
                        let checkStatus =await checkValidseniorIdpromise(answer);
                        if(checkStatus.res){
                            console.log("***Already Id Exits***");
                        }else{
                            let advocate_Obj ={};
                            advocate_Obj.SeniorAdvocateId = answer;
                            final_advocate.push(advocate_Obj);
                            console.log("***Added Success***");
                        }
                    }catch(e){
                        console.log(e)
                    }
                };
                (async ()=>{
                    await createSeniorAdvocate(answer);
                     rl.prompt();
                })();
                
            });
    }
    else if(lineStatus == '2'){

            rl.question('Enter Senior advocate ID::', (answer) => {

                     async function createJuiorRecord(){
                                try{
                                    let validRes = await checkValidseniorIdpromise(answer);
                                    if(validRes.res){
                                            let juniorRes =await getJuniorAdvocateId(answer);
                                            if(juniorRes.res){
                                                console.log("***Junior Advocate created Success***");
                                            }
                                    }else{
                                        console.log("***Enter Valid SeniorId***");
                                    }
                                    
                                }catch(e){
                                    console.log(e)
                                }
                        };
                     (async ()=>{
                            await createJuiorRecord();
                            rl.prompt();
                     })();  
              });
    }
    else if(lineStatus == '3'){

            rl.question('Enter Senior advocate ID::', (answer) => {

                     async function createStateSenoirAdvocate(answer){

                        let checkStatus = await checkValidseniorIdpromise(answer);
                        if(checkStatus.res){
                            let response = await createStateAdvocateId(answer);
                            if(response.res){
                                console.log("***State created Success***"); 
                            }
                        }else{
                            console.log("***Please Enter Valid SeniorId***");   
                        }
                    }
                    (async ()=>{
                        await createStateSenoirAdvocate(answer);
                        rl.prompt();

                    })();   
              });
    }
    else if(lineStatus == '4'){

            rl.question('Enter Senior advocate ID::', (answer) => {

                     async function createStateSenoirAdvocate(answer){

                        let checkStatus = await checkValidseniorIdpromise(answer);
                        if(checkStatus.res){
                            let response = await createCaseAdvocateId(answer);
                            if(response.res){
                                console.log("***Case created Success***"); 
                            }
                        }else{
                            console.log("***Please Enter Valid SeniorId***");   
                        }
                    }
                    (async ()=>{
                        await createStateSenoirAdvocate(answer);
                        rl.prompt();

                    })();   
              });
    }
    else if(lineStatus == '5'){

                rl.question('Enter JuniorAdvocate ID::', (answer) => {

                         async function createStateSenoirAdvocate(answer){

                            let checkStatus = await checkValidjuniorIdpromise(answer);
                            if(checkStatus.res){

                                let response = await updatejuniorAdvocateId(answer,'ps');
                                if(response.res){
                                    console.log("***junior state Added Success**"); 
                                }else{
                                    console.log("***already state Exits not allowed to Add**"); 
                                }

                            }else{

                                console.log("***Not valid Id***");   
                            }
                        }
                        (async ()=>{
                            await createStateSenoirAdvocate(answer);
                            rl.prompt();

                        })();   
                  });
    }
    else if(lineStatus == '6'){

                rl.question('Enter Senior Advocate ID::', (answer) => {

                         async function createStateSenoirAdvocate(answer){

                            let checkStatus = await checkValidseniorIdpromise(answer);
                            if(checkStatus.res){

                                let response = await updatejuniorAdvocateId(answer,'scase');
                                if(response.res){
                                    console.log("**Case sucessfully Rejected**"); 
                                }

                            }else{

                                console.log("***Not valid Id***");   
                            }
                        }
                        (async ()=>{
                            await createStateSenoirAdvocate(answer);
                            rl.prompt();

                        })();   
                  });
    }
    else if(lineStatus == '7'){
        console.log(" ----------------------------------------\n");
        console.log("|          ADVOCATE LIST                 |\n");
        console.log(" ----------------------------------------\n");  
        if(final_advocate.length > 0){
            final_advocate.map(function(advocateList,i){
        console.log("         "+i+".    "+advocateList['SeniorAdvocateId']+"\n");
            }); 
        }else{
        console.log("|            NO RECORDS                  |\n"); 
        }          
         
        console.log(" ----------------------------------------\n"); 
    }
    else if(lineStatus == '8'){

                rl.question('Enter state Id::', (answer) => {

                    console.log(" ----------------------------------------\n");
                    console.log("          CASE LIST                     \n");
                    console.log(" ----------------------------------------\n");  
                    console.log("          -->"+answer+"<--              \n");
                    console.log(" ----------------------------------------\n"); 
                    if(final_advocate.length > 0){
                        let temp = 0 ;
                        final_advocate.map(function(advocateList,i){
                            if(advocateList['case'].length > 0){
        
                                advocateList['case'].map(function(caseitem){

                                    if(caseitem['practicingState'] ==answer){
                                        if(temp ==0){
                                          console.log("AdvocateID :"+" "+advocateList['SeniorAdvocateId']);
                                            temp =1;
                                        }
                                         console.log(caseitem['caseid']);
                                    }
                                });

                                console.log("\n");

                            }
                           temp =0;                   
                        }); 
                    }else{
                    console.log("            NO RECORDS                  \n"); 
                    }           
                    console.log(" ----------------------------------------\n");  

                     rl.prompt();
                });
    }

    else if(lineStatus == '9'){



          rl.question('Enter Senior Advocate ID::', (answer) => {

                     async function createJuiorRecord(){
                                try{
                                    let validRes = await checkValidseniorIdpromise(answer);
                                    if(validRes.res){

                                        console.log(" ----------------------------------------\n");
                                        console.log("          ADVOCATE DETAILS               \n");
                                        console.log(" ----------------------------------------\n");  
                                        console.log("          -->"+answer+"<--              \n");
                                        console.log(" ----------------------------------------\n"); 
                                        if(final_advocate.length > 0){
                                            final_advocate.map(function(advocateList){

                                                if(advocateList['SeniorAdvocateId'] == answer){

                                                    console.log("AdvocateId"+":"+advocateList['SeniorAdvocateId']+"\n")
                                                    console.log("State"+":"+advocateList['state']['stateId']+"\n")
                                                    console.log("Junior Advocate List :\n")


                                                        if(advocateList['junior'].length > 0){
                                                            advocateList['junior'].map(function(argument) {
                                                                console.log(argument['juniorId']+"-"+ argument['practicingState']) 
                                                            });
                                                        }
                                                    console.log("Case Details :\n")

                                                        if(advocateList['case'].length > 0){
                                                            advocateList['case'].map(function(argument) {
                                                                console.log(argument['caseid']+"-"+ argument['practicingState']+"-"+ argument['casestatus']) 
                                                            });

                                                        }

                                                }
                                               
                                            }); 
                                        }else{
                                        console.log("            NO RECORDS                  \n"); 
                                        }           
                                        console.log(" ----------------------------------------\n");  

                                        }else{
                                            console.log("***Enter Valid SeniorId***");           
                                         }
                                           }catch(e){
                                                        console.log(e)
                                                    }
                                            };
                                         (async ()=>{
                                                await createJuiorRecord();
                                                rl.prompt();
                                         })();  
              });
        
              
    }

    else if( lineStatus == '0'){
        console.log("----------------------------------------\n");
        console.log("|          MENU                        |\n");
        console.log("----------------------------------------\n");
        console.log("|  1. Add an advocate                  |\n");
        console.log("|  2. Add junior advocates             |\n");
        console.log("|  3. Add states for advocate          |\n");
        console.log("|  4. Add cases for advocate           |\n");
        console.log("|  5. Junior Advocate updation         |\n");
        console.log("|  6 .Reject a case.                   |\n");
        console.log("|  7. Display all advocates            |\n");
        console.log("|  8. Display all cases under a state  |\n");
        console.log("|  9. Get Advocate Details             |\n");
        console.log("|  0. Menu                             |\n");
        console.log("----------------------------------------\n");
         rl.prompt(); 

    }
    else{
        console.log("**Please Enter Valid Option****");
        rl.prompt(); 
    }
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});