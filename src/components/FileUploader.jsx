import { useMemo, useState, useEffect, memo } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function UploadFiles({ onDrop }) {
    const [files, setFiles] = useState([]);

    const {
        // acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone(
        {
            accept: {
                'image/*': ['.jpeg', '.png', '.jpg']
            },
            onDrop: acceptedFiles => {
                for (let index = 0; index < 2; index++) {
                    // const element = array[index];

                    if(files.length == 0){
                        setFiles(acceptedFiles.map(file => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        })));
                    }else{
                        acceptedFiles.push(files[0])
                        setFiles(acceptedFiles.map(file => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        })));
                    }
                    
                }
                

                onDrop(acceptedFiles); 
                
            }
        },
    );


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }} // Revoke data uri after image is loaded
                    alt="preview"
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Arrastra y suelta los archivos aquí, o haz clic para seleccionar archivos</p>
            </div>
            <div style={thumbsContainer}>
                {thumbs}
            </div>
        </div>
    );
}

export default memo(UploadFiles);