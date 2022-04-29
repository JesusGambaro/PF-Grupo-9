import React, {useRef} from "react";

const ImageUploader = ({onFileSelectSuccess, setImg}) => {
  const fileInput = useRef(null);
  const handleFileInput = (e) => {
    // handle validations
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    onFileSelectSuccess(file);
  };
  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} accept="image/*" />
      <button
        onClick={(e) => fileInput.current && fileInput.current.click()}
        className="btn btn-primary"
      ></button>
    </div>
  );
};
export default ImageUploader;
