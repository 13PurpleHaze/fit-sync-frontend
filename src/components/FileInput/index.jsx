import React, {useState} from 'react';
import classes from './style.module.css';


const FileInput = ({oldFileUrl, setNewFile, error}) => {
    const [file, setFile] = useState(null);
    const dummyName = 'Файл не выбран';
    const dummyURL = 'https://dummyimage.com/60/000/a6a6a6.png&text=dummy';

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setNewFile(selectedFile);
    };
    return (
        <>
            <input type="file" className={classes.input} id="file" onChange={handleFileChange}/>
            <label htmlFor="file" className={classes.label}>Выбрать картинку</label>
            {
                file
                    ? <div className={classes['img-wrapper']}>
                        <div className={classes.img}><img src={file ? URL.createObjectURL(file) : oldFileUrl}/></div>
                        <div className={classes['img-title']}>{file?.name ? file.name : oldFileUrl}</div>
                    </div>
                    : <div  className={classes['img-wrapper']}>
                        <div className={classes.img}><img src={oldFileUrl ? oldFileUrl : dummyURL} alt=""/></div>
                        <div className={classes['img-title']}>{oldFileUrl ? oldFileUrl : dummyName}</div>
                    </div>
            }
            {error && <p className={classes.error}>{error.message}</p>}
        </>
    );
};

export default FileInput;
