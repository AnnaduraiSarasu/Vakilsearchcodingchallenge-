const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'AdvocateOperation> '
});

        console.log("----------------------------------------\n");
        console.log("|             MENU                     |\n");
        console.log("----------------------------------------\n");
        console.log("|  1. Add an advocate                  |\n");
        console.log("|  2. Add junior advocates             |\n");
        console.log("|  3. Add states for advocate          |\n");
        console.log("|  4. Add cases for advocate           |\n");
        console.log("|  5. Junior Advocate updation         |\n");
        console.log("|  6. Reject a case.                   |\n");
        console.log("|  7. Display all advocates            |\n");
        console.log("|  8. Display all cases under a state  |\n");
        console.log("|  9. Show Advocate Details            |\n");
        console.log("|  0. Menu                             |\n");
        console.log("|  Exit (press CTRL + C)               |\n");
        console.log("----------------------------------------\n");
        rl.prompt();

let final_advocate =[];

// let final_advocate =[{
//     "SeniorAdvocateId": "2323",
//     "junior": [{
//         "juniorId": "4444",
//         "practicingState": "TN",
//         "juniorcase": [{
//             "casePracticingState": "TN",
//             "jcaseid": "TER345",
//             "jcastatus": "active"
//         }]
//     }],
//     "state": {
//         "stateId": "TN"
//     },
//     "case": [{
//         "caseid": "WER234",
//         "practicingState": "TN",
//         "casestatus": "active"
//     }]
// }, {
//     "SeniorAdvocateId": "2424",
//     "junior": [{
//         "juniorId": "2222",
//         "practicingState": "TN",
//         "juniorcase": [{
//             "casePracticingState": "TN",
//             "jcaseid": "LOL543",
//             "jcastatus": "deactive"
//         }]
//     },{
//         "juniorId": "8888",
//         "practicingState": "TN",
//         "juniorcase": [{
//             "casePracticingState": "TN",
//             "jcaseid": "KOR565",
//             "jcastatus": "deactive"
//         }]
//     }],
//     "state": {
//         "stateId": "TH"
//     },
//     "case": [{
//         "caseid": "JAK234",
//         "practicingState": "TN",
//         "casestatus": "active"
//     }]
// }];
let duplicateAvoid =[];
rl.on('line', (line) => {

    var lineStatus =  line.trim();

    // function for check senior Advocate Id status
    async function checkValidjuniorIdpromise(jid) {
            return new Promise(
                (resolve,reject) =>{
                const rowLen = final_advocate.length;
                final_advocate.map(function(e,i) { 
                    
                            if(!e['junior']){
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

    // function for check case Id status for junior
    async function checkValidcaseIdforjunior(cid,juniorid) {
            return new Promise(
                (resolve,reject) =>{
                    let calseLen = final_advocate.length;
                    final_advocate.map(function(e,i) { 
                    
                       if(e['junior']){

                            e['junior'].map(function(caseitem) {

                                if(caseitem['juniorId'] == juniorid){

                                        if(caseitem['juniorcase']) {

                                            caseitem['juniorcase'].map(function(finalitem){

                                                    if(finalitem['jcaseid'] == cid) {
                                                        resolve({'res':true});      
                                                    }
                                                

                                            })
                                        }      
                                }
                            });
                                   


                       }

                       if(calseLen == i+1){
                         resolve({'res':false});      
                       }
                      
                    });

            });
    }

    // function for check case Id status senior
    async function checkValidcaseIdpromise(cid,seniorid) {
            return new Promise(
                (resolve,reject) =>{
                    let calseLen = final_advocate.length;
                    final_advocate.map(function(e,i) { 
                    
                       if(e['SeniorAdvocateId'] == seniorid){

                            if(typeof(e['case']) == 'undefined'){
                                    resolve({'res':false})
                            }else{

                                 e['case'].map(function(caseitem){
                                    if(caseitem['caseid'] == cid){
                                        resolve({'res':true});      
                                    }

                                });
                            }
                       }

                       if(calseLen == i+1){
                         resolve({'res':false});      
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


    // reject the junior Advocate Case 
    async function rejectCasestatusUpdationjunior(value, desc) {
            return new Promise(
                (resolve,reject) =>{

                    let lenofadvocate = final_advocate.length;
                     final_advocate.map(function(itemObj,i){

                            if(itemObj['junior']){

                                    itemObj['junior'].map(function(caseitem) {

                                        if(caseitem['juniorId'] == value){

                                                if(caseitem['juniorcase']) {

                                                    caseitem['juniorcase'].map(function(finalitem){

                                                            if(finalitem['jcaseid'] == desc) {
                                                                finalitem['jcastatus'] = 'deactive';
                                                                resolve({'res':true});      
                                                            }
                                                        

                                                    })
                                                }      
                                        }
                                    });               
                            }
                            if(lenofadvocate == i+1) {
                                resolve({'res':false});       
                            }

                    });
            });
    }

    // reject Case by senior Advocate
    async function rejectCasebySenior( objval,value, desc) {
            return new Promise(
                (resolve,reject) =>{
                    let lenofadvocate = final_advocate.length;
                     final_advocate.map(function(itemObj,i){
                        if (itemObj['SeniorAdvocateId'] == value) {
                            if(objval == 'rejectcase'){

                                itemObj['case'].map(function(caseitem){

                                    if(caseitem['caseid'] == desc){
                                        caseitem['casestatus'] = 'deactive';
                                        resolve({'res':true});      
                                    }
                                });

                            }
                        }

                        if(lenofadvocate == i+1){
                          resolve({'res':false});       
                        }

                    });
                });
    }
    // update in junior data
    async function updateJuniorid( objval,value, desc,jcaseid) {
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
                                        }      
                                    }
                                });
                            }

                            if(objval == 'updatejuniorcase'){

                                itemObj['junior'].map(function(caseitem){

                                    if(caseitem['juniorId'] == value){
                                            let cparray =[];
                                        if(caseitem['juniorcase']){
                                            cparray = caseitem['juniorcase'].slice();
                                            let obj ={};
                                            obj['casePracticingState'] = desc;
                                            obj['jcaseid'] = jcaseid;
                                            obj['jcastatus'] = 'active';
                                            cparray.push(obj);
                                            caseitem['juniorcase'] =cparray;

                                            resolve({'res':true}); 
                                        } else{

                                             let obj ={};
                                            obj['casePracticingState'] = desc;
                                            obj['jcaseid'] = jcaseid;
                                            obj['jcastatus'] = 'active';
                                            cparray.push(obj);
                                            caseitem['juniorcase'] =cparray;
                                            resolve({'res':true}); 

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
                            if(duplicateAvoid.indexOf(answer) > -1){
                                 resolve({'res':false})   
                            }else{
                                duplicateAvoid.push(answer);
                                let resjn = await createJuniorid('junior',seniorid,juniorObj);
                                if(resjn){
                                    resolve({'res':true})
                                }else{
                                   resolve({'res':false})
                                }  
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

                    console.log("  1. update state ")
                    console.log("  2. create case  ")

                     rl.question('Enter your option to update::', async (junioroption) => {

                        if(junioroption == '1'){
                              
                                        rl.question('Enter Practicing State ::', async (answer) => {
                                        let resjn = await updateJuniorid('updatejuniorstate',juniorid,answer);
                                            if(resjn.res){
                                                resolve({'res':true})
                                            }else{
                                                resolve({'res':false})
                                            }

                                        });   
                            

                        } else if(junioroption == '2'){


                                rl.question('Enter case id::', async (juniorcaseid) => {
                                    if(duplicateAvoid.indexOf(juniorcaseid) > -1){
                                        resolve({'res':false})
                                    }else{
                                        duplicateAvoid.push(juniorcaseid);
                                        rl.question('Enter Practicing State ::', async (answer) => {
                                        let resjn = await updateJuniorid('updatejuniorcase',juniorid,answer,juniorcaseid);
                                            if(resjn.res){
                                                resolve({'res':true})
                                            }else{
                                                resolve({'res':false})
                                            }

                                        });   
                                    }
                                }); 



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

    // function for reject junior case 

    async function rejectJuniorCase(juniorid,option){
        return new Promise((resolve,reject)=>{
              
                if(option == 'scase'){

                    rl.question('Enter Case Id ::', async (answer) => {

                        let checkStatus = await checkValidcaseIdforjunior(answer,juniorid);

                        if(checkStatus.res){
                            let resjn = await rejectCasestatusUpdationjunior(juniorid,answer);
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
                        if(duplicateAvoid.indexOf(answer) > -1){
                                resolve({'res':false})
                        }else{
                            duplicateAvoid.push(answer);
                             let resjn = await createPracticingStateAdvocateId(seniorid,caseObj);
                            if(resjn){
                                resolve({'res':true})
                            }else{
                                resolve({'res':false})
                            }
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
                            duplicateAvoid.push(answer);
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
                                            }else{
                                                console.log("***Id already exit***");
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
                            }else{
                                 console.log("***case id already exit***"); 
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
                                    console.log("***Update Success**"); 
                                }else{
                                    console.log("***input wrong or caseid or state already Exits **"); 
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


                console.log('1. Reject senior case');
                console.log('2. Reject junior case');


                rl.question('Enter your option::', (answer) => {

                        if(answer == '1'){

                            rl.question('Enter Senior Advocate ID::', (answer) => {
                                     async function createStateSenoirAdvocate(answer){
                                        let checkStatus = await checkValidseniorIdpromise(answer);
                                        if(checkStatus.res){

                                            let response = await updatejuniorAdvocateId(answer,'scase');
                                            if(response.res){
                                                console.log("**Case sucessfully Rejected**"); 
                                            }else{
                                                console.log("**issue on rejection try once again**"); 
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

                        }else if (answer == '2'){

                                rl.question('Enter junior Advocate ID::', (answer) => {
                                     async function createStateSenoirAdvocate(answer){

                                       let checkStatus = await checkValidjuniorIdpromise(answer);

                                        if(checkStatus.res){

                                            let response = await rejectJuniorCase(answer,'scase');
                                            if(response.res){
                                                console.log("**Case sucessfully Rejected**"); 
                                            }else{
                                                console.log("**try once again**"); 
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


                        }else{
                                        console.log("**please provide valid option**")
                                        rl.prompt();

                        }
                });
    }
    else if(lineStatus == '7'){
        console.log(" ----------------------------------------\n");
        console.log("|          ADVOCATE LIST                 |\n");
        console.log(" ----------------------------------------\n");  
        if(final_advocate.length > 0){
            final_advocate.map(function(advocateList,i){

                
                console.log("SENIOR ADVOCATE:"+" "+advocateList['SeniorAdvocateId']+"\n");
            

                if(advocateList['junior']){

                    advocateList['junior'].map(function(argument,j) {
                          if(j ==0){
                            console.log("JUNIOR:");
                        }
                      console.log("     "+j+"."+argument['juniorId']+"\n");

                    });

                }

            }); 
        }else{
        console.log("|            NO RECORDS                  |\n"); 
        }          
         
        console.log(" ----------------------------------------\n");
        rl.prompt();
    }
    else if(lineStatus == '8'){

                rl.question('Enter state Id::', (answer) => {

                    console.log(" ----------------------------------------\n");
                    console.log("          CASE LIST                     \n");
                    console.log(" ----------------------------------------\n");  
                    console.log("          -->"+answer+"<--              \n");
                    console.log(" ----------------------------------------\n"); 
                    if(final_advocate.length > 0){
                        final_advocate.map(function(advocateList,i){

                            if(advocateList['case']){
        
                                advocateList['case'].map(function(caseitem){

                                    if(caseitem['practicingState'] ==answer){
                                    
                                        console.log(caseitem['caseid']+"-"+caseitem['practicingState']+"-"+caseitem['casestatus']+"\n");
                                    }
                                });

                            }

                             if(advocateList['junior']){
        
                                advocateList['junior'].map(function(caseitem){

                                    if(caseitem['juniorcase']){
                                        caseitem['juniorcase'].map(function(argument) {
                                            if(argument['casePracticingState'] == answer){
                                                console.log(argument['jcaseid']+"-"+argument['casePracticingState']+"-"+argument['jcastatus']+"\n");
                                                }
                                        });
                                    }
                                });

                            }

                        }); 
                    }else{
                    console.log("            NO RECORDS                  \n"); 
                    }           
                    console.log(" ----------------------------------------\n");  

                     rl.prompt();
                });
    }
    else if(lineStatus == '9'){

        console.log("1. Get senior advocate details");
        console.log("2. Get junior advocate details");

         rl.question('Enter Your option::', (answer) => {

            if(answer == '1'){

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
                                                            if(advocateList['state']){
                                                                 console.log("State"+":"+advocateList['state']['stateId']+"\n")
                                                            }
                                                            if(advocateList['junior']){
                                                                   console.log("Junior Advocate List :\n")
                                                                   let design_tem ="";
                                                                    advocateList['junior'].map(function(argument) {
                                                                          design_tem  = design_tem + argument['juniorId'];
                                                                            if(argument['practicingState']){
                                                                             design_tem  = design_tem +"-"+argument['practicingState'];
                                                                            }

                                                                      console.log(design_tem); 
                                                                      design_tem="";    
                                                                    });
                                                                }
                                                                if(advocateList['case']){
                                                                   console.log("Case Details :\n")
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
            else if(answer == '2'){

                rl.question('Enter junior Advocate ID::', (answer) => {

                             async function createJuiorRecord(){
                                        try{
                                                let validRes = await checkValidjuniorIdpromise(answer);
                                                if(validRes.res){

                                                        console.log(" ----------------------------------------\n");
                                                        console.log("          ADVOCATE DETAILS               \n");
                                                        console.log(" ----------------------------------------\n");  
                                                        console.log("          -->"+answer+"<--              \n");
                                                        console.log(" ----------------------------------------\n"); 
                                                        if(final_advocate.length > 0) {
                                                            final_advocate.map(function(advocateList){

                                                                    if(advocateList['junior']){
                                                                            advocateList['junior'].map(function(argument) {
                                                                                if(argument['juniorId'] ==answer){

                                                                                        console.log("JuniorAdvocateId:"+  argument['juniorId']);
                                                                                        if(argument['practicingState']){
                                                                                            console.log("State:"+  argument['practicingState']); 
                                                                                        }
                                                                                            console.log("Case List:");
                                                                                        argument['juniorcase'].map(function(caselist){
                                                                                            console.log(caselist['jcaseid']+"-"+ caselist['casePracticingState']+"-"+ caselist['jcastatus']) 
                                                                                        });
                                                                                    
                                                                                    }
                                                                                
                                                                            });
                                                                        }
                                                            }); 
                                                        }else {
                                                            console.log("            NO RECORDS                  \n"); 
                                                        }           
                                                            console.log(" ----------------------------------------\n");  

                                                    }else {
                                                        console.log("***Enter Valid juniorid***");           
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

            }else{

                console.log('**Please provide Valid option**');
                        rl.prompt(); 

            }
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
        console.log("|  9. Show Advocate Details            |\n");
        console.log("|  0. Menu                             |\n");
        console.log("|  Exit (press CTRL + C)               |\n");
        console.log("----------------------------------------\n");
         rl.prompt(); 
    }
    else if( lineStatus == '10'){
            console.log("res::"+JSON.stringify(final_advocate));
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