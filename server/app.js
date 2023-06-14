import cors from "cors";
import express from "express";
import { pool } from "./utils/db.js";


async function init() {
  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.post('/', async (req, res) => {
    const {
      positionName,
      prefixName,
      fullName,
      nickName,
      selectedFile,
      formattedBirthday,
      approve,
      filterEducation,
    } = req.body;
    

    const positionNameInsertQuery = "INSERT INTO master_position (position_name) VALUES ($1) RETURNING position_id"; 
    const positionNameValues = [positionName];
    const positionResult = await pool.query(positionNameInsertQuery, positionNameValues);
    const positionId = positionResult.rows[0].position_id; 
  
    const prefixNameInsertQuery = "INSERT INTO master_prefix (prefix_name) VALUES ($1) RETURNING prefix_id"; 
    const prefixNameValues = [prefixName];
    const prefixResult = await pool.query(prefixNameInsertQuery, prefixNameValues);
    const prefixId = prefixResult.rows[0].prefix_id; 
  
    const personalInfoInsertQuery = "INSERT INTO personal_info (prefix_id, fullname, nickname, birthday, position_id, chk_approve, create_date) VALUES ($1, $2, $3, $4, $5, $6, current_timestamp) RETURNING personal_id";
    const personalInfoValues = [prefixId, fullName, nickName, formattedBirthday, positionId, approve];
    const personalResult = await pool.query(personalInfoInsertQuery, personalInfoValues);
    const personalId = personalResult.rows[0].personal_id; 

    const fileInfoInsertQuery = "INSERT INTO personal_files (personal_id, filename, create_date) VALUES ($1, $2, current_timestamp)";
    const fileInfoValues = [personalId, selectedFile];
    await pool.query(fileInfoInsertQuery, fileInfoValues);
    
  
    for (let i = 0; i < filterEducation.length; i++) {
      const education = filterEducation[i];
  
      const educationInsertQuery = "INSERT INTO personal_education (personal_id,education_level, institution, qualification, field_of_study, gpa, create_date) VALUES ($1, $2, $3, $4, $5,$6, current_timestamp)";
      const educationValues = [personalId, education.edulevel, education.institution, education.qualificate, education.field, education.gpa];
      await pool.query(educationInsertQuery, educationValues);
    }
  
    res.status(200).send("Inserted successfully");
 
  });
  

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
}
init();
