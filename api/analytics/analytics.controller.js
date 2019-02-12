'use strict';

const _ = require('lodash');
const moment = require('moment');
const sql = require('mssql')
var config = require('../../config/environment');

let connection = config.config;

// https://www.npmjs.com/package/mssql 
// FOR FUNCTIONS AND QUERY REERENCING

exports.fetchUsers = async function(req,res){
    try {
        let pool = await sql.connect(connection)
        let result1 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .query('select * from mytable where id = @input_parameter')
            
        console.dir(result1)
    
        // Stored procedure
        
        let result2 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name')
        
        console.dir(result2)
        res.send({
            success: true,
            data: [
                result1, result2
            ]
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}
