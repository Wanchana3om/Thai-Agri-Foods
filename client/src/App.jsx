import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./index.css";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from '@chakra-ui/react'

function App() {

  const toast = useToast()
  const [educationLine, setEducationLine] = useState([
    {
      edulevel: "",
      institution: "",
      qualificate: "",
      field: "",
      gpa: "",
    },
    {
      edulevel: "",
      institution: "",
      qualificate: "",
      field: "",
      gpa: "",
    },
    {
      edulevel: "",
      institution: "",
      qualificate: "",
      field: "",
      gpa: "",
    },
    {
      edulevel: "",
      institution: "",
      qualificate: "",
      field: "",
      gpa: "",
    },
  ]);

  const [positionName, setPositionName] = useState("");
  const [prefixName, setPrefixName] = useState("นาย");
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthDay, setBirthDay] = useState(new Date());
  const formattedBirthday = birthDay.toISOString().split("T")[0];
  const [approve, setApprove] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(positionName);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0].name);
  };

  console.log(selectedFile);

  const getApprove = () => {
    setApprove(!approve);
  };
  const getPrefixName1 = () => {
    setPrefixName("นาย");
  };
  const getPrefixName2 = () => {
    setPrefixName("นาง");
  };
  const getPrefixName3 = () => {
    setPrefixName("นางสาว");
  };
  const addEducationIndex = () => {
    const NewEducationLine = [
      ...educationLine,
      {
        edulevel: "",
        institution: "",
        qualificate: "",
        field: "",
        gpa: "",
      },
    ];
    setEducationLine(NewEducationLine);
  };

  const filterEducation = educationLine
    .filter((obj) => {
      return Object.values(obj).some((value) => value !== "");
    })
    .map((obj) => {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        acc[key] = value !== "" ? value : null;
        return acc;
      }, {});
    });

  console.log(filterEducation);

  const deleteEducationLine = (index) => {
    const NewEducationLine = [...educationLine];
    NewEducationLine.splice(index, 1);
    setEducationLine(NewEducationLine);
    console.log(index);
  };

  const setEduLine = (value, index, key) => {
    const NewEducationLine = [...educationLine];
    NewEducationLine[index][key] = value;
    setEducationLine(NewEducationLine);
  };

  const saveFromData = async (e) => {
    e.preventDefault();

    const checkPositionName = positionName === "" ? null : positionName;
    const checkFullName = fullName === "" ? null : fullName;
    const checkNickName = nickName === "" ? null : nickName;

    await axios.post("http://localhost:4000/", {
      positionName: checkPositionName,
      prefixName,
      fullName: checkFullName,
      nickName: checkNickName,
      formattedBirthday,
      approve,
      selectedFile,
      filterEducation,
    });
    toast({
      title: 'Summited',
      description: "You have been summited.",
      position:"top",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000); 
  };

  return (
    <main className="flex flex-col font-[300] text-sm ">
      <form onSubmit={(e) => saveFromData(e)} className="mx-[100px] mt-24">
        <h1 className=" text-[24px]">ใบสมัครงาน (Page 2)</h1>
        <div>
          <div className="flex mt-6 items-center">
            <p className="ml-6">ตำแหน่งงานที่ต้องการสมัคร</p>
            <label>
              <select
                name="selected"
                className="w-56 border-[1px] py-1 px-2 ml-5 border-black"
                onChange={(e) => setPositionName(e.target.value)}
              >
                <option value="">[POSITION_NAME]</option>
                <option value="Programer">Programer</option>
                <option value="Engineer">Engineer</option>
                <option value="IT Support">IT Support</option>
                <option value="Automate Tester">Automate Tester</option>
                <option value="Manual Tester">Manual Tester</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Sale">Sale</option>
              </select>
            </label>
          </div>
          <div className="flex mt-6 items-center">
            <p className="ml-6">ประวัติส่วนตัว</p>
            <p className="ml-16 mr-2">ชื่อ-นามสกุล(ภาษาไทย)</p>
            <div className="flex gap-2">
              <label className="flex">
                <input
                  type="radio"
                  name="myRadio"
                  value="option1"
                  className="w-6 "
                  defaultChecked={true}
                  onClick={getPrefixName1}
                />
                <p className="ml-1">นาย</p>
              </label>
              <label className="flex">
                <input
                  type="radio"
                  name="myRadio"
                  value="option2"
                  className="w-6"
                  onClick={getPrefixName2}
                />
                <p className="ml-1">นาง</p>
              </label>
              <label className="flex">
                <input
                  type="radio"
                  name="myRadio"
                  value="option3"
                  className="w-6"
                  onClick={getPrefixName3}
                />
                <p className="ml-1">นางสาว</p>
              </label>
            </div>
            <input
              type="text"
              className="ml-4 w-72 py-1 px-2 border-[1px] border-black"
              placeholder="[FULL NAME]"
              onChange={(e) => setFullName(e.target.value)}
            />

            <p className="ml-4">ชื่อเล่น</p>
            <input
              type="text"
              className="ml-4 w-40 py-1 px-2 border-[1px] border-black"
              placeholder="[NICKNAME]"
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
          <div className="flex mt-6 ml-[165px] items-center ">
            <p className="w-24">วัน/เดือน/ปี/เกิด</p>
            <DatePicker
              selected={birthDay}
              dateFormat="dd/MM/yyyy"
              className="border-black ml-4 w-48 text-center py-1 px-2 border-[1px]"
              value={birthDay}
              onChange={(date) => setBirthDay(date)}
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={addEducationIndex}
              className=" border-[1px] border-black rounded-md  bg-gradient-to-t from-[#dadada] to-[#ffff] py-1 px-4 active:bg-gradient-to-t active:from-[#dadada] active:to-[#dadada] "
            >
              เพิ่ม
            </button>
            <p className="ml-2">ประวัติการศึกษา</p>
          </div>

          <div className="flex mt-2 bg-gradient-to-b from-[#f1f0f0] to-[#ffff] ">
            <div className="border-[1px] w-[5%] text-center border-black py-3">
              x
            </div>
            <div className="border-r-[1px] border-y-[1px] w-[25%] text-center border-black py-3">
              ระดับการศึกษา
            </div>
            <div className="border-r-[1px] border-y-[1px] w-[35%] text-center border-black py-3">
              ชื่อสถาบันการศึกษา/ที่ตั้ง
            </div>
            <div className="border-r-[1px] border-y-[1px] w-[10%] text-center border-black py-3">
              วุฒิที่ได้รับ
            </div>
            <div className="border-r-[1px] border-y-[1px] w-[20%] text-center border-black py-3">
              สาขา
            </div>
            <div className="border-r-[1px] border-y-[1px] w-[10%] text-center border-black py-3">
              G.P.A.
            </div>
          </div>

          {educationLine.map((item, index) => (
            <div
              key={index}
              className="flex bg-gradient-to-b from-[#dadada] to-[#ffff]"
            >
              <div className="border-x-[1px] border-b-[1px] w-[5%] text-center border-black py-1">
                <button
                  onClick={() => deleteEducationLine(index)}
                  className=" border-[1px] border-black rounded-[5px]  bg-gradient-to-t from-[#dadada] to-[#ffff]  px-4 active:bg-gradient-to-t active:from-[#dadada] active:to-[#dadada] "
                >
                  ลบ
                </button>
              </div>

              <div className="border-r-[1px] border-b-[1px] w-[25%] text-center border-black p-1  ">
                <input
                  type="text"
                  className="w-full px-2 border-[1px] border-black"
                  placeholder="[EDUCATION_LEVEL]"
                  onChange={(e) =>
                    setEduLine(e.target.value, index, "edulevel")
                  }
                  value={item.edulevel}
                />
              </div>
              <div className="border-r-[1px] border-b-[1px] w-[35%] text-center border-black p-1 ">
                <input
                  type="text"
                  className="w-full text-sm px-2 border-[1px] border-black"
                  placeholder="[INSTITUTION]"
                  onChange={(e) =>
                    setEduLine(e.target.value, index, "institution")
                  }
                  value={item.institution}
                />
              </div>
              <div className="border-r-[1px] border-b-[1px] w-[10%] text-center border-black p-1">
                <input
                  type="text"
                  className="w-full px-2 border-[1px] border-black"
                  placeholder="[QUALIFICATION]"
                  onChange={(e) =>
                    setEduLine(e.target.value, index, "qualificate")
                  }
                  value={item.qualificate}
                />
              </div>
              <div className="border-r-[1px] border-b-[1px] w-[20%] text-center border-black p-1">
                <input
                  type="text"
                  className="w-full px-2 border-[1px] border-black"
                  placeholder="[FIELD_OF_STUDY]"
                  onChange={(e) => setEduLine(e.target.value, index, "field")}
                  value={item.field}
                />
              </div>
              <div className="border-r-[1px] border-b-[1px] w-[10%] text-center border-black p-1">
                <input
                  type="text"
                  className="w-full px-2 border-[1px] border-black"
                  placeholder="[GPA]"
                  onChange={(e) => setEduLine(e.target.value, index, "gpa")}
                  value={item.gpa}
                />
              </div>
            </div>
          ))}

          <div className="mt-6 ">
            <input
              type="file"
              id="file-upload"
              className=" border-[1px] border-black"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              className="custom-checkbox w-[25px] h-[25px] "
              onClick={getApprove}
            />
            <p className="ml-3">
              ข้าพระเจ้าขอรับรองว่าข้อความในใบสมัครนี้เป็นจริงทุกประการ
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className=" border-[1px] border-black rounded-sm  bg-gradient-to-t from-[#dadada] to-[#ffff] py-1 px-12 active:bg-gradient-to-t active:from-[#dadada] active:to-[#dadada] "
            >
              บันทึก
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default App;
