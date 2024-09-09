//this is get all department
const GetAllDepartment = (EMPLOYEE_db) => (req, res) => {
    const query = `SELECT * FROM employee_manage.departments`;
    EMPLOYEE_db.query(query, (err, result) => {
        if (err) {
            console.error("error fectching department details", err)
            res.status(500).json({ message: 'error fetching department details' })
            res.end("error fetching department")
            return;
        }
        console.log(result)
        res.status(200).json(result)
    })
}


const InsertDepartment = (EMPLOYEE_db) => (req, res) => {
    const DepartmentId = req.body.DepartmentId;
    const DepartmentName = req.body.DepartmentName;

    if (!DepartmentName) {
        return res.status(400).json({ error: 'DepartmentName is required' });
    }

    const query = `INSERT INTO departments (DepartmentID, DepartmentName) VALUES (?, ?)`;
    const values = [DepartmentId, DepartmentName];
    EMPLOYEE_db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting department values", err);
            return res.status(500).json({ error: 'Failed to insert department values' });
        }
        console.log("Successfully inserted department");
        res.status(200).json({ message: 'Successfully inserted department' });
    });
}


module.exports = {
    GetAllDepartment,
    InsertDepartment
}