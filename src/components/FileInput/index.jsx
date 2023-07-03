import React, {useState} from 'react';
import classes from './style.module.css';


const FileInput = ({value, setNewFile}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('Файл не выбран');
    const dummyURL = 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png';
    return (
        <>
            <input type="file" className={classes.input} id="file" onChange={(e) => {
                setFile(e.target.files[0]);
                setNewFile(URL.createObjectURL(e.target.files[0]));
                setFileName(URL.createObjectURL(e.target.files[0]));
            }}/>
            <label htmlFor="file" className={classes.label}>Выбрать картинку</label>
            {
                file
                    ? <div className={classes['img-wrapper']}>
                        <div className={classes.img}><img src={file ? fileName : value}/></div>
                        <div className={classes['img-title']}>{file?.name ? file.name : value}</div>
                    </div>
                    : <div  className={classes['img-wrapper']}>
                        <div className={classes.img}><img src={value ? value : dummyURL} alt=""/></div>
                        <div className={classes['img-title']}>{value ? value : fileName}</div>
                    </div>
            }
        </>
    );
};

export default FileInput;