const tedious = require('tedious');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
const path  =require('path');
const sequelize = new Sequelize('Company', 'maheshadmin', 'P@ssw0rd_',{
    host: 'msit001.database.windows.net',
    port:1433,
    dialect:'mssql',
    pool: {
        min:0, 
        max:5,
        idle:10000  
    },
    define:{
        timestamps:false
    }
});

sequelize.authenticate().then(authenticate =>{
    console.log('====================================');
    console.log('connected');
    console.log('====================================');
}, (error)=>{
 console.log('====================================');
 console.log('Error Occured');
 console.log('====================================');
});

const deptModel = require(path.join(__dirname, './../../Models/Department'))(sequelize,Sequelize.DataTypes);

class DeparmentDal {
     
    async getAllData(){

        await sequelize.sync({force:false}); // connect to database
        let rows =  await deptModel.findAll(); // return the resolverd data
        console.log(rows);
        if(rows){
            return  {
                statusMessage: 'Data is Read Successfully',
                rowCount:rows.length,
                rows:rows
            };
        }
        return  {
            statusMessage: 'Error Occured',
            errorDetails: error.message
        };
    }

    async getAllDataById(id){
        
        await sequelize.sync({force:false}); // connect to database
        let row =  await deptModel.findOne({where:{DeptNo:id}}); // return the resolverd data
        if(row){
            return  {
                statusMessage: 'Data is Read Successfully',
                rows:row
            } ;
        }
        return   {
            statusMessage: 'Error Occured',
            errorDetails: error.message
        };
    }

    async createRecord(dept){
         
        await sequelize.sync({force:false});
        
        let record =  await deptModel.create(dept)
        if(record){
            return  {
                    statusMessage: 'Record Added Successfully',
                    record:record
                };
        }
       
            return  {
                statusMessage: 'Error Occured',
                errorDetails: error.message
            };
      
    }

    async putDepartment(id, department){
        await sequelize.sync({force:false});
        
        let dept = await deptModel.update(department,{where:{deptno:parseInt(id)}});
        
        if(dept) {
            return  {message: `Record Updated Successfully`, 
                data:JSON.stringify(dept)};
        }
        return {msg:'Some Error Occured in create'};
    }

    async deleteDepartment(id){
        await sequelize.sync({force:false});
        console.log(id);
        let result = 
                await deptModel.destroy(
                {where:{DeptNo:parseInt(id)}});
        
        if(result) {
            return  {message:'Record Deleted Successfully', 
                    data:result};
        }
        return {msg:'Some Error Occured in create'};
    }
}

module.exports = DeparmentDal;