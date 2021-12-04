import React, { useRef, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Download, PlusCircleFill, X } from "react-bootstrap-icons";
import illustrator from "../../../assets/icons/ai.png";
import doc from "../../../assets/icons/doc.png";
import file from "../../../assets/icons/file.png";
import pdf from "../../../assets/icons/pdf.png";
import txt from "../../../assets/icons/txt.png";
import zip from "../../../assets/icons/zip.png";
import style from "./Attachments.module.scss";
import { saveAs } from "file-saver";

function Attachments({ getFiles, data, getDeletedId, readOnly }) {
  const [files, setFiles] = useState([]);
  const fileBtn = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      setFiles(data);
    }
  }, [data]);
  const fileChangeHandle = (e) => {
    let temp = [...files];
    for (let i = 0; i < Object.keys(e.target.files).length; i++) {
      temp.push(e.target.files[i]);
    }

    const dt = new DataTransfer();
    for (let i = 0; i < temp.length; i++) {
      const file = temp[i];
      if (!file.id) {
        dt.items.add(file);
      }
    }
    fileBtn.current.files = dt.files;

    setFiles(temp);
    getFiles(temp);
  };
  const getFileImage = (type) => {
    switch (type) {
      case "txt":
        return txt;
      case "zip":
        return zip;
      case "doc":
        return doc;
      case "docx":
        return doc;
      case "pdf":
        return pdf;
      case "ai":
        return illustrator;
      // case "ps" : return photoshop
      // case "json" : return json
      default:
        return file;
    }
  };
  const removeFile = (index, id) => {
    let temp = files.filter((item, idx) => idx !== index);

    // To Remove The file from Input File
    const dt = new DataTransfer();
    for (let i = 0; i < fileBtn.current.files.length; i++) {
      const file = fileBtn.current.files[i];

      if (!id && index !== i) dt.items.add(file);
    }
    fileBtn.current.files = dt.files;
    setFiles(temp);
    getFiles(temp);
    getDeletedId(id);
  };
  const downloadFile = (path, name) => {
    saveAs(path, name);
  };
  return (
    <div className={style.attachments}>
      <div className={style.gridContainer}>
        {files?.map((item, index) =>
          item?.mime_type?.split("/")[0] === "image" ||
          item?.type?.split("/")[0] === "image" ? (
            <div key={index} className={style.filesContainer}>
              <Image
                src={
                  item?.id !== undefined ? item.path : URL.createObjectURL(item)
                }
                fluid
                alt={item.name}
                onClick={() => downloadFile(item?.path, item?.name)}
              />

              <p
                style={{ cursor: "pointer" }}
                onClick={() => downloadFile(item?.path, item?.name)}
              >
                {item?.path && <Download />}
                {item.name}
              </p>
              {!readOnly && <X onClick={() => removeFile(index, item?.id)} />}
            </div>
          ) : (
            <div key={index} className={style.filesContainer}>
              <Image
                src={getFileImage(
                  item?.extansion ?? item?.name.split(".").pop()
                )}
                fluid
                alt={item.name}
                style={{
                  objectFit: "contain",
                }}
              />

              <p
                style={{ cursor: "pointer" }}
                onClick={() => downloadFile(item?.path, item?.name)}
              >
                {item?.path && <Download />}
                {item.name}
              </p>
              {!readOnly && <X onClick={() => removeFile(index, item?.id)} />}
            </div>
          )
        )}
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => fileChangeHandle(e)}
        name="files"
        multiple
        ref={fileBtn}
      />

      {!readOnly && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => fileBtn.current.click()}
        >
          اضف مرفقات
          <PlusCircleFill />
        </button>
      )}
    </div>
  );
}

export default Attachments;
