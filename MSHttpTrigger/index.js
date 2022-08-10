const DepartmentDal = require('./DataAccess/dal');
module.exports = async function (context, req) {
    var id = context.bindingData.id;
    console.log(id);
    // create an instance
    let objDal = new DepartmentDal();
    var resp;
    if(req.method === "GET"){
        let id = req.params.id;
        if(!id){
            resp = await objDal.getAllData();
        }else{
            resp = await objDal.getAllDataById(id);
        }
    }
    if(req.method === "POST"){
        let dept = {
            DeptNo:req.body.DeptNo,
            DeptName:req.body.DeptName,
            Location:req.body.Location,
            Capacity:req.body.Capacity
        };
        console.log(JSON.stringify(dept));
        resp = await objDal.createRecord(dept);
    }
    if(req.method === "PUT"){
        let id = req.params.id;
        console.log(id);
        let dept = {
            DeptNo:req.body.DeptNo,
            DeptName:req.body.DeptName,
            Location:req.body.Location,
            Capacity:req.body.Capacity
        };
        console.log(JSON.stringify(dept));
        resp = await objDal.putDepartment(id,dept);
    }

    if(req.method === "DELETE"){
        let id = req.params.id;
        resp = await objDal.deleteDepartment(id);
    }


    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    // };

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            body:resp
        }
    };
}

function postCall(){
    return 'POST';
}


function getCall(){
    return 'GET';
}

function putCall(){
    return 'PUT';
}
function deleteCall(){
    return 'DELETE';
}